// TestPage.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import PassageBody from "../components/PassageBody";
import DirectionBody from "../components/DirectionBody";
import styled from "styled-components";

import axios from "axios";

//const IS_DEV_MODE = true;
const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 13, // direction 단계
  preparing: IS_DEV_MODE ? 3 : 45, // 문제 준비 시간
  responding: IS_DEV_MODE ? 2 : 45, // 답변 시간. Part 1은 문제별로 답변 시간이 같음
};

type TimeIndicatorProps = { bgColor?: string };
// type TipProps = { text: string };

export const TimeRemainingIndicator = styled.div<TimeIndicatorProps>`
  margin-top: 5.75rem;
  margin-bottom: 1.5rem;
  width: 12.25rem;
  height: 12.25rem;

  border-radius: 50%;
  border-color: black;

  font-size: 2rem;
  color: white;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  // props에 따라 배경색 변경. true이면
  background-color: ${(props) => props.bgColor || "#ff7b7b"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimeInfoText = styled.p`
  font-size: 1.5rem;
`;

export const TopBlank = styled.div`
  height: 9rem;
`;

const Part1Page: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true"; // URL에서 mockExam 값 확인

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;

  const [currentNum, setCurrentNum] = useState(1);
  const [remainingTime, setRemainingTime] = useState(1);
  const [stage, setStage] = useState<
    "direction" | "preparing" | "responding" | "scoring"
  >("direction");

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
  const [questions, setQuestions] = useState(initialQuestions?.data[0] || null);
  const [extraQuestions, setExtraQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  //scoring 용
  const [response, setResponse] = useState<any>(null); // API 응답 저장

  function increaseNum() {
    setCurrentNum((prevNum) => prevNum + 1);
  }

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000); // 지연시간. 몇초마다 출력할 것인지. 현재 1초
      return () => clearTimeout(timer);
    } else {
      switch (stage) {
        case "direction":
          if (currentNum !== 2) {
            setStage("preparing");
            setRemainingTime(TIME_SETTINGS.preparing);
          }
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(TIME_SETTINGS.responding);
          break;
        case "responding":
          if (fromPartSelect) {
            setStage("scoring");
            break;
          }
          if (currentNum < 2) {
            increaseNum();
            setStage("preparing");
            setRemainingTime(TIME_SETTINGS.preparing);
          } else {
            setStage("scoring");

            // 실전 모의고사 모드에서는 자동으로 Part2 페이지로 이동
            if (isMockExam) {
              setTimeout(() => {
                navigate("/part2?mockExam=true"); // 2번 문제 완료 후 Part2로 이동
              }, 0); //  딜레이없이 바로 이동
            }
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, fromPartSelect, isMockExam, navigate]);

  // "direction"일 때만 오디오 자동 재생
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/src/assets/audio/part1.mp3");
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

  // 이후 클릭 이벤트로는 오디오가 재생되지 않도록 함
  const handleUserInteraction = () => {
    if (!hasPlayedRef.current) {
      console.log("Audio is not allowed to play after direction stage.");
    }
  };

  const getCurrentQuestion = () => {
    return questionIndex === 0 ? questions?.question1 : questions?.question2;
  };

  const nextQuestion = async () => {
    if (questionIndex === 0) {
      // 기존 문제 세트에서 다음 문제로 이동
      setQuestionIndex(1);
      setStage("preparing");
      setRemainingTime(TIME_SETTINGS.preparing);
      setQuestionCount((prev) => prev + 1);
      setCurrentNum((prev) => prev + 1);
    } else if (extraQuestions) {
      // 기존 문제 세트가 끝나면 extraQuestions 사용
      setQuestions(extraQuestions);
      setExtraQuestions(null);
      setQuestionIndex(0);
      setStage("preparing");
      setRemainingTime(TIME_SETTINGS.preparing);
      setQuestionCount((prev) => prev + 1);
      setCurrentNum((prev) => prev + 1);
    } else {
      try {
        // 새로운 문제 요청
        const response = await axios.get(`/api/focused-learning/part1`);
        setExtraQuestions(response.data.data[0]);
        setQuestions(response.data.data[0]);
        setQuestionIndex(0);
        setStage("preparing");
        setRemainingTime(TIME_SETTINGS.preparing);
        setQuestionCount((prev) => prev + 1);
        setCurrentNum((prev) => prev + 1);
      } catch (error) {
        console.error("Error fetching next set of questions:", error);
      }
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
      setResponse(response.data);
    } catch (error) {
      console.error("오디오 업로드 실패:", error);
    }
  };

  // stage가 responding일 때 녹음 시작 & 종료
  useEffect(() => {
    if (stage === "responding") {
      startRecording();
    } else if (stage !== "preparing") {
      stopRecording();
    }
  }, [stage, startRecording, stopRecording]);

  const wrongWordScore =
    response?.IssueWords?.reduce(
      (
        acc: Record<string, { score: number; errorType: string }>,
        item: any,
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
    ) || {};

  // 점수
  const accuracy = Math.round(
    response?.PronunciationAssessment["AccuracyScore"],
  );
  const completeness = Math.round(
    response?.PronunciationAssessment["CompletenessScore"],
  );
  const fluency = Math.round(response?.PronunciationAssessment["FluencyScore"]);
  const prosody = Math.round(response?.PronunciationAssessment["ProsodyScore"]);

  const scores = [accuracy, completeness, fluency, prosody];
  const minScore = Math.min(...scores);

  const totalScore = Math.round(
    scores.reduce(
      (sum, score) => sum + (score === minScore ? score * 0.4 : score * 0.2),
      0,
    ),
  );

  return (
    <S.mainContainer onClick={handleUserInteraction}>
      <TopBlank />
      {stage === "direction" && (
        <DirectionBody
          title={"Question 1-2: Read a Text Aloud"}
          direction={
            "Directions: In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud."
          }
        />
      )}
      {stage !== "direction" && (
        <PassageBody
          text={getCurrentQuestion()}
          isScoring={stage === "scoring"}
          wrongWordScore={wrongWordScore}
          questionNum={currentNum} // 원래 1
          totalQuestions={2}
          fromPartSelect={fromPartSelect}
          questionCount={questionCount}
          partId={partId}
        />
      )}
      {stage === "preparing" && (
        <>
          <TimeRemainingIndicator>
            {`00 : ${remainingTime.toString().padStart(2, "0")}`}
          </TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}
      {stage === "responding" && (
        <>
          <TimeRemainingIndicator bgColor="#59BED4">
            {`00 : ${remainingTime.toString().padStart(2, "0")}`}
          </TimeRemainingIndicator>
          <TimeInfoText>Response Time</TimeInfoText>
        </>
      )}
      {stage === "scoring" && !isMockExam && (
        <>
          <ScoreBody
            totalScore={totalScore}
            accuracy={accuracy}
            completeness={completeness}
            fluency={fluency}
            prosody={prosody}
          />
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

export default Part1Page;
