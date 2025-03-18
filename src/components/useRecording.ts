import { useRef } from "react";

const useRecording = (setResponse: (data: any) => void) => {
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isRecordingRef = useRef<boolean>(false);

  const startRecording = async () => {
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      isRecordingRef.current = true;
      console.log("Recording started...");
    } catch (err) {
      console.error("Error accessing audio stream: ", err);
    }
  };

  const stopRecording = () => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    console.log("Recording stopped.");
  };

  const submitAssessment = async () => {
    if (!isRecordingRef.current) {
      alert("No audio recorded yet!");
      return;
    }

    const formData = new FormData();
    formData.append("file", new Blob(), "recorded.wav");

    try {
      const response = await fetch("http://localhost:8080/api/v1/part1", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResponse(data);
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return { startRecording, stopRecording, submitAssessment };
};

export default useRecording;
