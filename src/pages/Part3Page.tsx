import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ScoreBodyGeneral from "../components/ScoreBodyGeneral";
import MutipleReplyBody from "../components/MutipleReplyBox";
import SituationBody from "../components/SituationBody";
import DirectionBody from "../components/DirectionBody";
import axios from "axios";
import styled from "styled-components";
import * as S from "./Main.styled";
import loadingGif from "../assets/img/loading.gif";

// 개발 모드인지 여부를 플래그 변수로 설정
// true : 개발 모드 (빠른 UI 확인용)
// false : 배포 모드 (실제 시험 진행 방식)

const IS_DEV_MODE = true;
//const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 16, // direction 단계
  situation: IS_DEV_MODE ? 5 : 45, //situation 단계
  preparing: IS_DEV_MODE ? 3 : 3, // 문제 준비 시간
  responding: (
    questionNum: number, // 파라미터에 따라 문제별 응답시간을 다르게 설정하는 화살표 함수
  ) => (IS_DEV_MODE ? 3 : questionNum === 7 ? 30 : 15),
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
  const hasPlayedRef = useRef(false);

  //recoding용
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  //문제 불러오기 용
  const { initialQuestions, partId } = location.state || {}; // 전달된 데이터
  const [situationText, setSituationText] = useState(
    initialQuestions?.data[0]?.situation || null,
  );
  const [questionTextArray, setQuestionTextArray] = useState([
    initialQuestions?.data[0]?.question1 || "",
    initialQuestions?.data[0]?.question2 || "",
    initialQuestions?.data[0]?.question3 || "",
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

  function increaseNum() {
    setCurrentNum((prevNum) => prevNum + 1);
  }

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
          setRemainingTime(TIME_SETTINGS.preparing); // 준비 시간 설정
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(TIME_SETTINGS.responding(currentNum)); // 문항별 응답 시간 설정
          break;
        case "responding":
          if (currentNum < 7) {
            increaseNum();
            setStage("preparing");
            setRemainingTime(TIME_SETTINGS.preparing);
          } else {
            setStage("scoring");

            // 실전 모의고사 모드에서는 자동으로 Part4 페이지로 이동
            if (isMockExam) {
              setTimeout(() => {
                navigate("/part4?mockExam=true"); // 7번 문제 완료 후 Part4로 이동
              }, 0); //  딜레이없이 바로 이동
            }
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, isMockExam, navigate]);

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
              setTimeout(() => {
                setStage("situation");
                setRemainingTime(TIME_SETTINGS.situation);
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
    try {
      // 새로운 문제 요청
      const response = await axios.get(`/api/focused-learning/part3`);
      const questionSet = response.data.data[0];
      setSituationText(questionSet.situation);
      setQuestionTextArray([
        questionSet.question1,
        questionSet.question2,
        questionSet.question3,
      ]);
      setStage("situation");
      setRemainingTime(TIME_SETTINGS.preparing);
      setQuestionCount((prev) => prev + 1);
      setCurrentNum(5);
      setMultipleReplies([]);
    } catch (error) {
      console.error("Error fetching next set of questions:", error);
    }
  };

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

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        uploadAudio(audioBlob);
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
  }, []);

  // 오디오 업로드
  const uploadAudio = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");
    try {
      const response = await axios.post("/api/upload-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("응답 데이터:", response.data);
      const processedResponse = {
        contentText: response.data.azureEvaluation.UserResponse,
        wrongWordScore: response.data.azureEvaluation.IssueWords.reduce(
          (acc: Record<string, { score: number; errorType: string }>,
            item: any,) => {
              if (
                item.ErrorType === "Mispronunciation" ||
                item.ErrorType === "Omission" ||
                item.ErrorType === "None"
              ){
            acc[item.word.toLowerCase()] = {
              score: item.AccuracyScore,
              errorType: item.ErrorType,
            };}
            return acc;
          },
          {}as Record<string, { score: number; errorType: string }>,
        ),
        accuracy: Math.round(response.data.azureEvaluation.PronunciationAssessment.AccuracyScore),
        fluency: Math.round(response.data.azureEvaluation.PronunciationAssessment.FluencyScore),
        prosody: Math.round(response.data.azureEvaluation.PronunciationAssessment.ProsodyScore),
        pronunciationScore: Math.round(
          [response.data.azureEvaluation.PronunciationAssessment.AccuracyScore,
           response.data.azureEvaluation.PronunciationAssessment.FluencyScore,
           response.data.azureEvaluation.PronunciationAssessment.ProsodyScore]
            .reduce((sum, score, _, arr) => sum + (score === Math.min(...arr) ? score * 0.4 : score * 0.2), 0)
        ),
        voca: Math.round(response.data.gptEvaluation.vocabulary),
        grammar: Math.round(response.data.gptEvaluation.grammar),
        topic: Math.round(response.data.gptEvaluation.topic),
        contentScore: Math.round((response.data.gptEvaluation.vocabulary +
                                  response.data.gptEvaluation.grammar +
                                  response.data.gptEvaluation.topic) / 3),
        feedback: response.data.gptEvaluation.suggestions,
      };

      setMultipleReplies((prev) => {
        return [...prev, processedResponse];
      });
      

    } catch (error) {
      console.error("오디오 업로드 실패:", error);
    }
  };

  // stage가 responding일 때 녹음 시작 & 종료
  useEffect(() => {
    if (stage === "responding") {
      startRecording();
    } else {
      stopRecording();
    }
  }, [stage, startRecording, stopRecording]);

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

      {stage === "situation" && (
        <>
          <TopBlank />
          <TimeRemainingIndicator>{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
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
        </>
      )}

      {stage === "scoring" && !isMockExam && (
        <>
          {questionTextArray.map((q, index) => (
            <React.Fragment key={index}>
                <MutipleReplyBody
                  questionNum={5 + index}
                  questionText={q}
                  contentText={multipleReplies[index]?.contentText || ""}
                  isScoring={stage === "scoring"}
                  wrongWordScore={multipleReplies[index]?.wrongWordScore || {}}
                  feedback={multipleReplies[index]?.feedback || ""}
                />
              <ScoreBodyGeneral
                pronunciationScore={multipleReplies[index]?.pronunciationScore || 0}
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
