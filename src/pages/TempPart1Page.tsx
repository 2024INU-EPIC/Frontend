// TempPart1Page.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
// import PassageBody from "../components/PassageBody";
import TempPassageBody from "../components/TempPassageBody";
import DirectionBody from "../components/DirectionBody";
import styled from "styled-components";
import useTempRecording from "../components/useTempRecording"; // 🎤 녹음 훅 추가

const IS_DEV_MODE = true;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 3 : 13,
  preparing: IS_DEV_MODE ? 3 : 10,
  responding: IS_DEV_MODE ? 20 : 45,
};

type TimeIndicatorProps = { bgColor?: string };

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
  background-color: ${(props) => props.bgColor || "#59BED4"};
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

type Part1PageProps = {
  part: number;
};

const TempPart1Page: React.FC<Part1PageProps> = ({ part }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true";

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;

  const [currentNum, setCurrentNum] = useState(1);
  const [remainingTime, setRemainingTime] = useState(12);
  const [stage, setStage] = useState<
    "direction" | "preparing" | "responding" | "scoring"
  >("direction");
  const [response, setResponse] = useState<any>(null); // API 응답 저장
  const referenceText = [
    "Now it’s time for your local weather forecast. Tomorrow will be very sunny, warm, and breezy. However, after the weekend is over, the weather will become cloudy and much colder. While it’s still warm, make sure to enjoy the beautiful weather and plan all your outdoor activities.",
    "Now it’s time for your local weather forecast. Tomorrow will be very sunny, warm, and breezy. However, after the weekend is over, the weather will become cloudy and much colder. While it’s still warm, make sure to enjoy the beautiful weather and plan all your outdoor activities.",
  ]; // 입력된 문장

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  // 🎤 녹음 및 API 요청 관련 상태 및 함수
  const { startRecording, stopRecording } = useTempRecording(
    setResponse,
    referenceText[1],
    part,
  );

  function increaseNum() {
    setCurrentNum((prevNum) => prevNum + 1);
  }

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
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

  // 🎤 자동 녹음 & 중지 (stage 변경 감지)
  useEffect(() => {
    if (stage === "responding") {
      console.log("🚀 자동 녹음 시작");
      startRecording();
    } else if (stage === "scoring") {
      console.log("자동 녹음 중지 및 서버 전송");
      stopRecording();
    }
  }, [stage]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/src/assets/audio/part1.mp3");
    }

    const audio = audioRef.current;

    if (stage === "direction" && !hasPlayedRef.current) {
      audio
        .play()
        .then(() => {
          hasPlayedRef.current = true;
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

  // 🎯 API 응답을 기반으로 wrongWordScore 생성
  const wrongWordScore =
    response?.IssueWords?.reduce(
      (
        acc: Record<string, { score: number; errorType: string }>,
        item: any,
      ) => {
        if (
          item.ErrorType === "Mispronunciation" ||
          item.ErrorType === "Omission"
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

  // 기존에 Errortype은 보내지않던 로직
  // const wrongWordScore =
  //   response?.IssueWords?.reduce(
  //     (acc: Record<string, number>, item: any) => {
  //       acc[item.word] = item.AccuracyScore;
  //       return acc;
  //     },
  //     {} as Record<string, number>,
  //   ) || {};

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
    <S.mainContainer>
      <TopBlank />

      {stage === "direction" && (
        <DirectionBody
          title="Question 1-2: Read a Text Aloud"
          direction="Directions: In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud."
        />
      )}

      {stage !== "direction" && (
        <TempPassageBody
          text={referenceText[currentNum - 1]}
          isScoring={stage === "scoring"}
          wrongWordScore={wrongWordScore}
          questionNum={currentNum}
          totalQuestions={2}
        />
      )}

      {stage === "preparing" && (
        <>
          <TimeRemainingIndicator>{`00 : ${remainingTime
            .toString()
            .padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === "responding" && (
        <>
          <TimeRemainingIndicator bgColor={"#ff7b7b"}>{`00 : ${remainingTime
            .toString()
            .padStart(2, "0")}`}</TimeRemainingIndicator>
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
              onClick={() => {
                setStage("preparing");
              }}
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

export default TempPart1Page;
