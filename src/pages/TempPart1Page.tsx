// TempPart1Page.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import PassageBody from "../components/PassageBody";
import DirectionBody from "../components/DirectionBody";
import styled from "styled-components";
import useTempRecording from "../components/useTempRecording"; // 🎤 녹음 훅 추가

const IS_DEV_MODE = true;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 45,
  preparing: IS_DEV_MODE ? 10 : 45,
  responding: IS_DEV_MODE ? 10 : 45,
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

  const [currentNum, setCurrentNum] = useState(1);
  const [remainingTime, setRemainingTime] = useState(12);
  const [stage, setStage] = useState<
    "direction" | "preparing" | "responding" | "scoring"
  >("direction");
  const [response, setResponse] = useState<any>(null); // API 응답 저장
  const referenceText = [
    "hello, it's me. i'm fine. thank you.",
    "Welcome to Boston Airport. In order to proceed your process,",
  ]; // 입력된 문장

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  // 🎤 녹음 및 API 요청 관련 상태 및 함수
  const { startRecording, stopRecording } = useTempRecording(
    setResponse,
    referenceText[1],
    part,
  );

  //   function increaseNum() {
  //     setCurrentNum((prevNum) => prevNum + 1);
  //   }

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
          setStage("scoring"); // 테스트용으로 1번만 나오게 구현
          //   if (currentNum < 2) {
          //     increaseNum();
          //     setStage('preparing');
          //     setRemainingTime(TIME_SETTINGS.preparing);
          //   } else {
          //     setStage('scoring');
          //     if (isMockExam) {
          //       setTimeout(() => navigate('/part2?mockExam=true'), 0);
          //     }
          //   }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, isMockExam, navigate]);

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
      {/*임시 녹음버튼*/}
      {/* <button onClick={startRecording}>Start Recording</button> 
      <button onClick={stopRecording}>Stop Recording</button> */}

      {stage === "direction" && (
        <DirectionBody
          title="Question 1-2: Read a Text Aloud"
          direction="Directions: In this part of the test, you will read aloud the text on the screen."
        />
      )}

      {stage !== "direction" && (
        <PassageBody
          text={referenceText[1]}
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
        <ScoreBody
          totalScore={totalScore}
          accuracy={accuracy}
          completeness={completeness}
          fluency={fluency}
          prosody={prosody}
        />
      )}
    </S.mainContainer>
  );
};

export default TempPart1Page;
