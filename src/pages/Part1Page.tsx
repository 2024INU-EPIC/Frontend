// TestPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import PassageBody from "../components/PassageBody";
import DirectionBody from "../components/DirectionBody";
import styled from "styled-components";

const IS_DEV_MODE = true;
// const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 45, // direction 단계
  preparing: IS_DEV_MODE ? 1 : 45, // 문제 준비 시간
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

  const [currentNum, setCurrentNum] = useState(1);
  const [remainingTime, setRemainingTime] = useState(12); // 음성 시간 12초
  const [stage, setStage] = useState<
    "direction" | "preparing" | "responding" | "scoring"
  >("direction");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

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
  }, [remainingTime, stage, currentNum, isMockExam, navigate]);

  // 개발용 함수
  // function handleNextStep() {
  //   if (isPreparing) {
  //     setPreparing(false);
  //     setResponding(true);
  //     setRemainingTime(5);
  //   } else if (isResponding) {
  //     setResponding(false);
  //     setScoring(true);
  //   }
  // }

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

  // const textContent =
  //   "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.";
  const textContent = "hello, it's me. i'm fine, thank you.";

  const response = {
    UserResponse: "Hello, it's you. I'm fine. Thank me.",
    PronunciationAssessment: {
      AccuracyScore: 51.0,
      FluencyScore: 44.0,
      ProsodyScore: 67.6,
      CompletenessScore: 43.0,
      PronScore: 49.7,
    },
    IssueWords: [
      {
        word: "hello",
        AccuracyScore: 1.0,
        ErrorType: "Mispronunciation",
        LowScorePhonemes: [
          {
            phoneme: "h",
            AccuracyScore: 56.0,
          },
          {
            phoneme: "ax",
            AccuracyScore: 6.0,
          },
          {
            phoneme: "l",
            AccuracyScore: 0.0,
          },
          {
            phoneme: "ow",
            AccuracyScore: 0.0,
          },
        ],
      },
      {
        word: "it's",
        AccuracyScore: 57.0,
        ErrorType: "Mispronunciation",
        LowScorePhonemes: [
          {
            phoneme: "ih",
            AccuracyScore: 41.0,
          },
          {
            phoneme: "t",
            AccuracyScore: 43.0,
          },
          {
            phoneme: "s",
            AccuracyScore: 73.0,
          },
        ],
      },
      {
        word: "me",
        AccuracyScore: 0.0,
        ErrorType: "Omission",
        LowScorePhonemes: [],
      },
      {
        word: "you",
        AccuracyScore: 98.0,
        ErrorType: "Insertion",
        LowScorePhonemes: [
          {
            phoneme: "y",
            AccuracyScore: 68.0,
          },
        ],
      },
      {
        word: "you",
        AccuracyScore: 0.0,
        ErrorType: "Omission",
        LowScorePhonemes: [],
      },
      {
        word: "me",
        AccuracyScore: 100.0,
        ErrorType: "Insertion",
        LowScorePhonemes: [],
      },
    ],
  };

  // api 연동으로 받을 단어 성적 JSON 예시
  const wrongWordScore = {
    hello: 56,
    me: 75,
    you: 43,
  };

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
          text={textContent}
          isScoring={stage === "scoring"}
          wrongWordScore={wrongWordScore}
          questionNum={currentNum} // 원래 1
          totalQuestions={2}
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
        <ScoreBody
          totalScore={86}
          accuracy={80}
          completeness={60}
          fluency={85}
          prosody={70}
        />
      )}
    </S.mainContainer>
  );
};

export default Part1Page;
