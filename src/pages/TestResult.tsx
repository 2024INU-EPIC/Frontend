import React, { useState, useRef } from "react";
import { TopBlank } from "./Part1Page";

const TestResultPage: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const leftChannelDataRef = useRef<Float32Array[]>([]);
  const recordingLengthRef = useRef<number>(0);
  const sampleRateRef = useRef<number>(44100);
  const isRecordingRef = useRef<boolean>(false);
  const [recorded, setRecorded] = useState<boolean>(false); // 녹음 상태

  /**
   * 녹음 시작
   */
  async function startRecording() {
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      audioContextRef.current = new AudioContext();
      sampleRateRef.current = audioContextRef.current.sampleRate;

      inputRef.current = audioContextRef.current.createMediaStreamSource(
        mediaStreamRef.current,
      );

      scriptNodeRef.current = audioContextRef.current.createScriptProcessor(
        4096,
        1,
        1,
      );
      scriptNodeRef.current.onaudioprocess = (audioEvent) => {
        if (!isRecordingRef.current) return;
        const channelData = audioEvent.inputBuffer.getChannelData(0);
        leftChannelDataRef.current.push(new Float32Array(channelData));
        recordingLengthRef.current += channelData.length;
      };

      inputRef.current.connect(scriptNodeRef.current);
      scriptNodeRef.current.connect(audioContextRef.current.destination);

      leftChannelDataRef.current = [];
      recordingLengthRef.current = 0;
      isRecordingRef.current = true;
      setRecorded(false);

      console.log("Recording started...");
    } catch (err) {
      console.error("Error accessing audio stream: ", err);
    }
  }

  /**
   * 녹음 중지
   */
  function stopRecording() {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    scriptNodeRef.current?.disconnect();
    inputRef.current?.disconnect();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current?.close();

    setRecorded(true); // 녹음 완료 상태 업데이트
    console.log("Recording stopped.");
  }

  /**
   * 평가 요청
   */
  async function submitAssessment() {
    if (!recorded || recordingLengthRef.current === 0) {
      alert("No audio recorded yet!");
      return;
    }

    const buffer = mergeBuffers(
      leftChannelDataRef.current,
      recordingLengthRef.current,
    );
    const wavBlob = encodeWAV(buffer, sampleRateRef.current);

    const formData = new FormData();
    const part = (document.getElementById("partSelect") as HTMLSelectElement)
      .value;
    const referenceText = (
      document.getElementById("referenceText") as HTMLInputElement
    ).value;

    if (part === "part1") {
      formData.append("referenceText", referenceText || "");
    }
    formData.append("file", wavBlob, "recorded.wav");

    const url = `http://localhost:8080/api/v1/${part}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      document.getElementById("result")!.textContent = data;
      console.log("Server response:", data);
    } catch (error) {
      document.getElementById("result")!.textContent = "Error: " + error;
      console.error("Error posting data:", error);
    }
  }

  function mergeBuffers(channelBuffer: Float32Array[], recLength: number) {
    const result = new Float32Array(recLength);
    let offset = 0;
    for (let i = 0; i < channelBuffer.length; i++) {
      result.set(channelBuffer[i], offset);
      offset += channelBuffer[i].length;
    }
    return result;
  }

  function encodeWAV(samples: Float32Array, sampleRate: number) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, (sampleRate * 1 * 16) / 8, true);
    view.setUint16(32, (1 * 16) / 8, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      let s = Math.max(-1, Math.min(1, samples[i]));
      s = s < 0 ? s * 0x8000 : s * 0x7fff;
      view.setInt16(offset, s, true);
      offset += 2;
    }

    return new Blob([view], { type: "audio/wav" });
  }

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  return (
    <div>
      <TopBlank />
      <h1>Test Page</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>

      <div>
        <label>Reference Text (Part1 only):</label>
        <input type="text" id="referenceText" />
      </div>

      <div>
        <label>Select Part:</label>
        <select id="partSelect">
          <option value="part1">Part1</option>
          <option value="part5">Part5</option>
        </select>
      </div>

      <button onClick={submitAssessment}>Submit to Server</button>
      <div id="result"></div>
    </div>
  );
};

export default TestResultPage;
