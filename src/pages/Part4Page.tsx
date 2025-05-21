import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import ScoreBodyGeneral from "../components/ScoreBodyGeneral";
import MultipleReplyBody from "../components/MultipleReplyBox";
import SituationBody from "../components/SituationBody";
import DirectionBody from "../components/DirectionBody";
import StopTalkingModal from "../components/StopTalkingModal";

import styled from "styled-components";
import * as S from "./Main.styled";
import loadingGif from "../assets/img/loading.gif";

import { encodeWAV } from "./encodeWAV";
import { useMockTestStore } from "../stores/MockTestStore";

// 개발 모드인지 여부를 플래그 변수로 설정
// true : 개발 모드 (빠른 UI 확인용)
// false : 배포 모드 (실제 시험 진행 방식)

const IS_DEV_MODE = true;
//const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 21, // direction 단계
  image: IS_DEV_MODE ? 3 : 45, //situation 단계
  preparing: IS_DEV_MODE ? 1 : 3, // 문제 준비 시간
  responding: (
    questionNum: number, // 파라미터에 따라 문제별 응답시간을 다르게 설정하는 화살표 함수
  ) => (IS_DEV_MODE ? 10 : questionNum === 10 ? 30 : 15),
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
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
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

const Part4Page: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true";
  const { partQuestions, sessionId } = useMockTestStore();
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;

  const [currentNum, setCurrentNum] = useState(8); // 문제 번호 (8 → 9 → 10)
  const [remainingTime, setRemainingTime] = useState(21);
  const [stage, setStage] = useState<
    | "loading"
    | "direction"
    | "situation"
    | "preparing"
    | "responding"
    | "scoring"
  >("loading"); // 현재 단계
  const [questionCount, setQuestionCount] = useState(1);

  //direction용
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  //recoding용
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  //문제 불러오기 용
  const { initialQuestions, partId } = location.state || {}; // 전달된 데이터
  const [situationImage, setSituationImage] = useState(
    initialQuestions?.situationImage || null,
  );
  const [questionTextArray, setQuestionTextArray] = useState([
    initialQuestions?.question8 || "",
    initialQuestions?.question9 || "",
    initialQuestions?.question10 || "",
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
  const questionPart4IdRef = useRef<number>(initialQuestions?.questionPart4Id);
  const currentNumRef = useRef<number>(currentNum); // ← currentNum(8)과 동기화

  function increaseNum() {
    setCurrentNum((prev) => {
      const next = prev + 1;
      currentNumRef.current = next;
      return next;
    });
  }

  useEffect(() => {
    if (isMockExam) {
      const { situationImage, questions } = partQuestions.part4;
      setSituationImage(situationImage);
      setQuestionTextArray([questions[0], questions[1], questions[2]]);
    } else {
      setSituationImage(initialQuestions?.situationText || "");
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
    partQuestions.part4,
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
          questionPart4IdRef.current,
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
    setIsSubmitting(true); // StopTalkingModal 표시
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
          `/api/mocktest/${sessionId}/save/4/${questionNo}`,
          formData,
        );

        console.log("모의고사 업로드 응답:", res.data);
        setIsUploadComplete(true);
        setIsSubmitting(false); // 모달 끄기
      } else {
        const response = await axios.post(
          `/api/upload-audio/part4?questionId=${questionId}&questionNo=${questionNo}`,
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
        if (currentNumRef.current < 10) {
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

  // stage가 responding일 때 녹음 시작 & 종료
  useEffect(() => {
    if (stage === "responding") {
      startRecording();
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
          if (currentNum !== 10) {
            setRemainingTime(TIME_SETTINGS.image);
          }
          break;
        case "situation":
          setStage("preparing");
          setRemainingTime(TIME_SETTINGS.preparing); // 8번 문제 준비 시간
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(TIME_SETTINGS.responding(currentNum)); // 10번 문제만 30초, 나머지는 15초
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

    if (currentNum < 10) {
      increaseNum();
      setStage("preparing");
      setRemainingTime(TIME_SETTINGS.preparing);
    } else if (currentNum === 10) {
      navigate("/part5?mockExam=true");
    }
    setIsUploadComplete(false);
  }, [isUploadComplete, isMockExam, currentNum, navigate]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/src/assets/audio/part4.mp3");
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
              setTimeout(() => {
                setStage("preparing");
                setRemainingTime(TIME_SETTINGS.preparing);
              }, 1000);
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
    const {
      questionPart4Id,
      situationImage,
      question8,
      quesiton9,
      question10,
    } = (await axios.get(`/api/focused-learning/part4`)).data;

    // 문제 id 갱신
    questionPart4IdRef.current = questionPart4Id;

    // 문항 이미지 갱신
    setSituationImage(situationImage);
    setQuestionTextArray([question8, quesiton9, question10]);

    // state 초기화
    setQuestionCount((prev) => prev + 1);
    setMultipleReplies([]);

    // 번호도 ref와 함께 초기화
    setCurrentNum(8);
    currentNumRef.current = 8;

    // 다음 단계 진입
    setStage("situation");
    setRemainingTime(TIME_SETTINGS.image);

    // try {
    // } catch (error) {
    //   console.error("Error fetching next set of questions:", error);
    // }
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
          title={
            "Question 8-10: Respond to Questions Using Information Provided"
          }
          direction={
            "Directions: In this part of the test, you will answer three questions based on the information provided. You will have 45 seconds to read the information before the questions begin. You will have 3 seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 8 and 9 and 30 seconds to respond to Question 10."
          }
        />
      )}
      {stage !== "direction" && (
        <SituationBody
          stage={stage}
          partNum={4}
          imageSrc={situationImage}
          questionText={questionTextArray[currentNum - 8]}
          questionNum={currentNum}
          totalQuestions={11}
          fromPartSelect={fromPartSelect}
          questionCount={questionCount}
          partId={partId}
        />
      )}
      {stage === "situation" && (
        <>
          <TimeRemainingIndicator>{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === "preparing" && (
        <>
          <TimeRemainingIndicator>{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === "responding" && (
        <>
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
                questionNum={8 + index}
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

export default Part4Page;
