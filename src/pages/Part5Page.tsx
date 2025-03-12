import React, { useEffect, useRef, useState } from "react";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
// import ReplyBody from "../components/ReplyBody";
import TempReplyBody from "../components/TempReplyBody";
import styled from "styled-components";
import QuestionBody from "../components/QuestionBody";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DirectionBody from "../components/DirectionBody";

// const IS_DEV_MODE = true;
const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 2 : 13, // direction 단계
  preparing: IS_DEV_MODE ? 1 : 45, // 문제 준비 시간
  responding: IS_DEV_MODE ? 2 : 60, // 답변 시간.
};

type TimeIndicatorProps = { bgColor?: string };
// type TipProps = { text: string };

export const TimeRemainingIndicator = styled.div<TimeIndicatorProps>`
  margin-top: 6rem;
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
  margin: 0;
  font-size: 1.5rem;
`;

export const TopBlank = styled.div`
  height: 9rem;
`;

const Part5Page: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true"; // URL에서 mockExam 값 확인

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;
  const partId = location.state?.partId || "Part5";

  const currentNum = 11;
  const [remainingTime, setRemainingTime] = useState(13); // 음성 시간 13초
  const [stage, setStage] = useState<
    "direction" | "preparing" | "responding" | "scoring"
  >("direction");
  const [questionCount, setQuestionCount] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000); // 지연시간. 몇초마다 출력할 것인지. 현재 1초
      return () => clearTimeout(timer);
    } else {
      switch (stage) {
        case "direction":
          setStage("preparing");
          setRemainingTime(TIME_SETTINGS.preparing);
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(TIME_SETTINGS.responding);
          break;
        case "responding":
          setStage("scoring");
          // 실전 모의고사 모드에서는 자동으로 결과 페이지로 이동
          if (isMockExam) {
            setTimeout(() => {
              navigate("/"); // 11번 문제 완료 후 결과 페이지로 이동, 당장은 페이지가 없으므로 루트로
            }, 0); //  딜레이없이 바로 이동
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, isMockExam, navigate]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/src/assets/audio/part5.mp3");
    }

    const audio = audioRef.current;

    if (stage === "direction" && !hasPlayedRef.current) {
      audio
        .play()
        .then(() => {
          hasPlayedRef.current = true; // 오디오 재생 완료 시 재생 플래그 설정

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

  const nextQuestion = () => {
    setStage("preparing");
    setRemainingTime(TIME_SETTINGS.preparing);
    setQuestionCount(questionCount + 1);
  };

  const textContent =
    " The only way to reduce the amount of traffic in cities today is by reducing the need for people to travel from home for work, education or shopping. Do you agree or disagree with this point of view? Use specific reasons and examples to support your choice.";
  const replyContent =
    "I partially disagree. Reducing the need to travel helps, but it’s not the only way to reduce traffic. First, improving public transportation can encourage people to use buses and trains instead of cars. Second, remote work and online learning help, but many jobs require physical presence, and shopping in person is still needed. Lastly, better city planning, like expanding bike lanes and pedestrian areas, can reduce congestion. So, while reducing travel helps, a combination of solutions is needed for real change.";

  // api 연동으로 받을 단어 성적 JSON 예시
  const wrongWordScore = {
    disagree: 56,
    transportation: 75,
    presence: 43,
  };

  // ? 이후 줄바꿈용 코드
  const formattedText = textContent.split("?").map((part, index, arr) => (
    <React.Fragment key={index}>
      {part}
      {index < arr.length - 1 && "?"}
      {index === 0 && <br />}
    </React.Fragment>
  ));

  return (
    <S.mainContainer onClick={handleUserInteraction}>
      <TopBlank />
      {stage === "direction" && (
        <DirectionBody
          title={"Question 11: Express an Opinion"}
          direction={
            "Directions: In this part of the test, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak."
          }
        />
      )}
      {stage !== "direction" && (
        <QuestionBody
          text={formattedText}
          questionNum={11}
          totalQuestions={11}
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
          <TempReplyBody
            text={replyContent}
            wrongWordScore={wrongWordScore}
            isScoring={stage === "scoring"}
          />
          <ScoreBody
            totalScore={86}
            accuracy={80}
            completeness={60}
            fluency={85}
            prosody={70}
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

export default Part5Page;
