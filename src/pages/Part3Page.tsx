import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ScoreBodyGeneral from "../components/ScoreBodyGeneral";
import MultipleReplyBody from "../components/MultipleReplyBox";
import SituationBody from "../components/SituationBody";
import DirectionBody from "../components/DirectionBody";

import loadingGif from "../assets/img/loading.gif";
import * as S from "./Main.styled";
import styled from "styled-components";

import axios from "axios";
import { encodeWAV } from "./encodeWAV";

import StopTalkingModal from "../components/StopTalkingModal";
import { useMockTestStore } from "../stores/MockTestStore";
import { useMockTestCancel } from "../hooks/useMockTestCancel";

// 개발 모드인지 여부를 플래그 변수로 설정
// true : 개발 모드 (빠른 UI 확인용)
// false : 배포 모드 (실제 시험 진행 방식)

const IS_DEV_MODE = true;
//const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 2 : 16, // direction 단계
  situation: IS_DEV_MODE ? 1 : 3, //situation 단계
  preparing: IS_DEV_MODE ? 1 : 3, // 문제 준비 시간
  responding: (
    questionNum: number, // 파라미터에 따라 문제별 응답시간을 다르게 설정하는 화살표 함수
  ) => (IS_DEV_MODE ? 10 : questionNum === 7 ? 30 : 15),
};

type TimeIndicatorProps = { bgColor?: string };

export const TimeRemainingIndicator = styled.div<TimeIndicatorProps>`
  margin-top: 1.6rem;
  margin-bottom: 1.5rem;
  width: 12.25rem;
  height: 12.25rem;
  border-radius: 50%;
  border-color: black;
  font-size: 2rem;
  color: white;
  filter: drop-shadow(0px 4px 8px rgba(168, 167, 167, 0.25));
  background-color: ${(props) => props.bgColor || "#ff7b7b"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimeInfoText = styled.p`
  margin: 0;
  font-size: 1.5rem;
`;

export const TopBlank = styled.div`
  height: 9rem;
`;

const Part3Page: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true"; // URL에서 mockExam 값 확인
  const { partQuestions, sessionId } = useMockTestStore();
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  useMockTestCancel(isMockExam, sessionId);

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;

  const [currentNum, setCurrentNum] = useState(5); // 문제 번호 (5 → 6 → 7)
  const [remainingTime, setRemainingTime] = useState(1); // 처음 45초 동안 SituationBody만 표시
  const [stage, setStage] = useState<
    | "loading"
    | "direction"
    | "situation"
    | "preparing"
    | "responding"
    | "scoring"
  >("loading");
  const [questionCount, setQuestionCount] = useState(1);

  //direction용
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const beepAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  //recoding용
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  //문제 불러오기 용
  const { initialQuestions, partId } = location.state || {}; // 전달된 데이터
  const [situationText, setSituationText] = useState(
    initialQuestions?.situationText || null,
  );
  const [questionTextArray, setQuestionTextArray] = useState([
    initialQuestions?.question5 || "",
    initialQuestions?.question6 || "",
    initialQuestions?.question7 || "",
  ]);

  //scoring 용
  const [multipleReplies, setMultipleReplies] = useState<
    Array<{
      contentText: string;
      wrongWordScore: Record<string, { score: number; errorType: string }>;
      accuracy: number;
      fluency: number;
      prosody: number;
      pronunciationScore: number;
      voca: number;
      grammar: number;
      topic: number;
      contentScore: number;
      feedback: string;
    }>
  >([]);
  const [isSubmmitting, setIsSubmitting] = useState(true);

  //useRef로 동기적 관리
  const questionPart3IdRef = useRef<number>(initialQuestions?.questionPart3Id);
  const currentNumRef = useRef(5);

  // 새로고침 후 sessionId 초기화된 경우 메인으로 리디렉션
  useEffect(() => {
    if (isMockExam && !sessionId) {
      setTimeout(() => {
        alert("세션이 유효하지 않아 메인으로 이동합니다.");
        window.location.href = "/";
      }, 100); // 100ms 지연
    }
  }, [isMockExam, sessionId]);

  function increaseNum() {
    // setCurrentNum((prevNum) => prevNum + 1);
    setCurrentNum((prev) => {
      const next = prev + 1;
      currentNumRef.current = next;
      return next;
    });
  }

  useEffect(() => {
    if (isMockExam) {
      const { situationText, questions } = partQuestions.part3;
      setSituationText(situationText);
      setQuestionTextArray([questions[0], questions[1], questions[2]]);
    } else {
      setSituationText(initialQuestions?.situationText || "");
      setQuestionTextArray([
        initialQuestions?.question5 || "",
        initialQuestions?.question6 || "",
        initialQuestions?.question7 || "",
      ]);
    }
  }, [
    initialQuestions?.question5,
    initialQuestions?.question6,
    initialQuestions?.question7,
    initialQuestions?.situationText,
    isMockExam,
    partQuestions.part3,
  ]);

  // 녹음 시작
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        const arrayBuffer = await blob.arrayBuffer();
        const audioCtx = new AudioContext();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        const wavBlob = encodeWAV(audioBuffer);
        await uploadAudio(
          wavBlob,
          questionPart3IdRef.current,
          currentNumRef.current,
        );
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("마이크 접근 오류:", error);
    }
  }, []);

  // 녹음 중지
  const stopRecording = useCallback(() => {
    console.log("Stopping recording...");
    mediaRecorderRef.current?.stop();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    setIsSubmitting(true);
    if (!beepAudioRef.current) {
      beepAudioRef.current = new Audio("/src/assets/audio/beep.mp3");
    }
    beepAudioRef.current
      .play()
      .catch((e) => console.error("Beep play error:", e));
  }, []);

  const uploadAudio = async (
    blob: Blob,
    questionId: number,
    questionNo: number,
  ) => {
    const formData = new FormData();
    formData.append("file", blob, "recording.wav");

    try {
      if (isMockExam) {
        console.log("모의고사 업로드 실행");
        const res = await axios.post(
          `/api/mocktest/${sessionId}/save/3/${questionNo}`,
          formData,
        );

        console.log("모의고사 업로드 응답:", res.data);
        setIsUploadComplete(true);
        setIsSubmitting(false); // 모달 끄기
      } else {
        const response = await axios.post(
          `/api/upload-audio/part3?questionId=${questionId}&questionNo=${questionNo}`,
          formData,
        );

        console.log("오디오 업로드 성공:", response.data);

        const processedResponse = {
          contentText: response.data.azureEvaluation.UserResponse,
          wrongWordScore: response.data.azureEvaluation.IssueWords.reduce(
            (
              acc: Record<string, { score: number; errorType: string }>,
              item: { word: string; AccuracyScore: number; ErrorType: string },
            ) => {
              if (
                item.ErrorType === "Mispronunciation" ||
                item.ErrorType === "Omission" ||
                item.ErrorType === "None"
              ) {
                acc[item.word.toLowerCase()] = {
                  score: item.AccuracyScore,
                  errorType: item.ErrorType,
                };
              }
              return acc;
            },
            {} as Record<string, { score: number; errorType: string }>,
          ),
          accuracy: Math.round(
            response.data.azureEvaluation.PronunciationAssessment.AccuracyScore,
          ),
          fluency: Math.round(
            response.data.azureEvaluation.PronunciationAssessment.FluencyScore,
          ),
          prosody: Math.round(
            response.data.azureEvaluation.PronunciationAssessment.ProsodyScore,
          ),
          pronunciationScore: Math.round(
            [
              response.data.azureEvaluation.PronunciationAssessment
                .AccuracyScore,
              response.data.azureEvaluation.PronunciationAssessment
                .FluencyScore,
              response.data.azureEvaluation.PronunciationAssessment
                .ProsodyScore,
            ].reduce(
              (sum, score, _, arr) =>
                sum + (score === Math.min(...arr) ? score * 0.4 : score * 0.2),
              0,
            ),
          ),
          voca: Math.round(response.data.gptEvaluation.vocabulary),
          grammar: Math.round(response.data.gptEvaluation.grammar),
          topic: Math.round(response.data.gptEvaluation.topic),
          contentScore: Math.round(
            (response.data.gptEvaluation.vocabulary +
              response.data.gptEvaluation.grammar +
              response.data.gptEvaluation.topic) /
              3,
          ),
          feedback: [
            response.data.gptEvaluation.suggestions.grammar,
            response.data.gptEvaluation.suggestions.vocabulary,
            response.data.gptEvaluation.suggestions.topic,
            response.data.gptEvaluation.suggestions["총평"],
          ].join("\n\n"),
        };

        setMultipleReplies((prevReplies) => [
          ...prevReplies,
          processedResponse, // 새 응답 데이터를 이전 응답 배열에 추가
        ]);

        setIsSubmitting(false); // StopTalkingModal 닫기

        // 다음 단계로 진행
        if (currentNumRef.current < 7) {
          increaseNum();
          setStage("preparing");
          setRemainingTime(TIME_SETTINGS.preparing);
        } else {
          console.log("모든 문항 완료, 결과 화면으로 이동");
          setStage("scoring"); // 모든 문항 완료 후 결과 화면으로 이동
        }
      }
    } catch (error) {
      console.error("오디오 업로드 실패:", error);
      setIsSubmitting(false);
    }
  };

  // stage가 responding일 때 녹음 시작 beep음 재생 & 종료
  useEffect(() => {
    if (stage === "responding") {
      if (!beepAudioRef.current) {
        beepAudioRef.current = new Audio("/src/assets/audio/beep.mp3");
      }

      const playBeepThenRecord = async () => {
        try {
          await beepAudioRef.current!.play();
          setTimeout(() => {
            startRecording();
          }, 1000); // beep 길이만큼 지연
        } catch (e) {
          console.error("Beep play error:", e);
          startRecording(); // fallback
        }
      };

      playBeepThenRecord();
    }
  }, [stage, startRecording]);

  useEffect(() => {
    // 2초 동안 로딩 화면 표시 후 "direction"으로 변경
    const loadingTimer = setTimeout(() => {
      setStage("direction");
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      switch (stage) {
        case "direction":
          if (currentNum !== 7) {
            setRemainingTime(TIME_SETTINGS.situation);
          }
          break;
        case "situation":
          setStage("preparing");
          setRemainingTime(TIME_SETTINGS.preparing);
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(TIME_SETTINGS.responding(currentNum)); // 문항별 응답 시간 설정
          setIsSubmitting(false);
          break;
        case "responding":
          stopRecording(); // 녹음 중지 및 업로드 시작
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, isMockExam, navigate, stopRecording]);

  useEffect(() => {
    if (!isMockExam || !isUploadComplete) return;

    if (currentNum < 7) {
      increaseNum();
      setStage("preparing");
      setRemainingTime(TIME_SETTINGS.preparing);
    } else if (currentNum === 7) {
      navigate("/part4?mockExam=true");
    }
    setIsUploadComplete(false);
  }, [isUploadComplete, isMockExam, currentNum, navigate]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/src/assets/audio/part3.mp3");
    }

    const audio = audioRef.current;

    if (stage === "direction" && !hasPlayedRef.current) {
      audio
        .play()
        .then(() => {
          hasPlayedRef.current = true; // 오디오 재생 완료 시 재생 플래그 설정
          setRemainingTime(TIME_SETTINGS.direction);

          audio.onended = () => {
            if (stage === "direction") {
              setStage("situation");
              setRemainingTime(TIME_SETTINGS.situation);
            }
          };
        })
        .catch((e) => console.error("Audio play error:", e));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [stage]);

  const handleUserInteraction = () => {
    if (!hasPlayedRef.current) {
      console.log("Audio is not allowed to play after direction stage.");
    }
  };
  const nextQuestion = async () => {
    const { questionPart3Id, situationText, question5, question6, question7 } =
      (await axios.get(`/api/focused-learning/part3`)).data;

    // ① 문제 ID 갱신
    questionPart3IdRef.current = questionPart3Id;

    // ② 문항 텍스트 갱신
    setSituationText(situationText);
    setQuestionTextArray([question5, question6, question7]);

    // ③ state reset
    setQuestionCount((c) => c + 1);
    setMultipleReplies([]);

    // ④ 번호도 반드시 ref와 함께 초기화
    setCurrentNum(5);
    currentNumRef.current = 5;

    // ⑤ 다음 단계 진입
    setStage("situation");
    setRemainingTime(TIME_SETTINGS.situation);
  };

  if (stage === "loading")
    return (
      <div style={{ margin: "400px" }}>
        <img src={loadingGif} />
      </div>
    );

  return (
    <S.mainContainer onClick={handleUserInteraction}>
      <TopBlank />
      {stage === "direction" && (
        <DirectionBody
          title={"Question 5-7: Respond to Questions"}
          direction={
            "Directions: In this part of the test, you will answer three questions. You will have 3 seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 5 and 6 and 30 seconds to respond to Question 7."
          }
        />
      )}
      {stage !== "direction" && (
        <SituationBody
          stage={stage}
          partNum={3}
          situationText={situationText}
          questionText={questionTextArray[currentNum - 5]}
          questionNum={currentNum}
          totalQuestions={11}
          fromPartSelect={fromPartSelect}
          questionCount={questionCount}
          partId={partId}
        />
      )}

      {stage === "preparing" && (
        <>
          <TopBlank />
          <TimeRemainingIndicator>{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === "responding" && (
        <>
          <TopBlank />
          <TimeRemainingIndicator bgColor="#59BED4">{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Response Time</TimeInfoText>
          {isSubmmitting === true && <StopTalkingModal />}
        </>
      )}

      {stage === "scoring" && !isMockExam && (
        <>
          {isSubmmitting === true && <StopTalkingModal />}
          {questionTextArray.map((q, index) => (
            <React.Fragment key={index}>
              <MultipleReplyBody
                questionNum={5 + index}
                questionText={q}
                contentText={multipleReplies[index]?.contentText || ""}
                isScoring={stage === "scoring"}
                wrongWordScore={multipleReplies[index]?.wrongWordScore || {}}
                feedback={multipleReplies[index]?.feedback || ""}
              />
              <ScoreBodyGeneral
                pronunciationScore={
                  multipleReplies[index]?.pronunciationScore || 0
                }
                accuracy={multipleReplies[index]?.accuracy || 0}
                fluency={multipleReplies[index]?.fluency || 0}
                prosody={multipleReplies[index]?.prosody || 0}
                contentScore={multipleReplies[index]?.contentScore || 0}
                voca={multipleReplies[index]?.voca || 0}
                grammar={multipleReplies[index]?.grammar || 0}
                topic={multipleReplies[index]?.topic || 0}
              />
            </React.Fragment>
          ))}
          {fromPartSelect && (
            <button
              onClick={nextQuestion}
              style={{
                display: "flex",
                width: "29.5rem",
                height: "6.5rem",
                margin: "2.25rem 0 2rem 0",
                border: "none",
                borderRadius: "6.25rem",
                background: "#ff7b7b",
                alignItems: "center",
                justifyContent: "center",
                filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))",
              }}
            >
              <span
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginLeft: "3.5rem",
                  marginRight: "1.75rem",
                }}
              >
                다음 문제 풀기
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21.5L21 12L12 2.5V8.5H3V15.5H12V21.5Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </S.mainContainer>
  );
};

export default Part3Page;
