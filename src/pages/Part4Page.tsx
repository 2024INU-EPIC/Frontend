import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import MutipleReplyBody from "../components/MutipleReplyBox";
import styled from "styled-components";
import SituationBody from "../components/SituationBody";
import loadingGif from "../assets/img/loading.gif";
import DirectionBody from "../components/DirectionBody";

// 개발 모드인지 여부를 플래그 변수로 설정
// true : 개발 모드 (빠른 UI 확인용)
// false : 배포 모드 (실제 시험 진행 방식)

const IS_DEV_MODE = true;
// const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  image: IS_DEV_MODE ? 3 : 45, //situation 단계
  preparing: IS_DEV_MODE ? 1 : 3, // 문제 준비 시간
  responding: (
    questionNum: number, // 파라미터에 따라 문제별 응답시간을 다르게 설정하는 화살표 함수
  ) => (IS_DEV_MODE ? 1 : questionNum === 10 ? 30 : 15),
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

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;
  const partId = location.state?.partId || "Part3";

  const [currentNum, setCurrentNum] = useState(8); // 문제 번호 (8 → 9 → 10)
  const [remainingTime, setRemainingTime] = useState(20); // 처음 45초 동안 SituationBody만 표시
  const [stage, setStage] = useState<
    "loading" | "direction" | "image" | "preparing" | "responding" | "scoring"
  >("loading"); // 현재 단계

  const [questionCount, setQuestionCount] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

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
          if (currentNum !== 10) {
            setStage("image");
            setRemainingTime(1);
          }
          break;
        case "image":
          setStage("preparing");
          setRemainingTime(TIME_SETTINGS.preparing); // 8번 문제 준비 시간
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(TIME_SETTINGS.responding(currentNum)); // 10번 문제만 30초, 나머지는 15초
          break;
        case "responding":
          if (currentNum < 10) {
            increaseNum();
            setStage("preparing");
            setRemainingTime(TIME_SETTINGS.preparing); // 다음 문제 준비시간
          } else {
            setStage("scoring"); // 마지막 문제(10번) 이후 채점 화면

            // 실전 모의고사 모드에서는 자동으로 Part4 페이지로 이동
            if (isMockExam) {
              setTimeout(() => {
                navigate("/part5?mockExam=true"); // 7번 문제 완료 후 Part4로 이동
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
      audioRef.current = new Audio("/src/assets/audio/part4.mp3");
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

  const handleUserInteraction = () => {
    if (!hasPlayedRef.current) {
      console.log("Audio is not allowed to play after direction stage.");
    }
  };

  const nextQuestion = () => {
    setStage("preparing");
    setRemainingTime(1);
    setQuestionCount(questionCount + 1);
    setCurrentNum(8); //파트별 집중학습 다음 문제 초기화용
  };

  const questionTextArray = [
    {
      id: 1,
      value:
        "When does the summer semester begin? What is the deadline for registration?",
    },
    {
      id: 2,
      value: "The prices are $80 for each course. Can you confirm that for me?",
    },
    {
      id: 3,
      value:
        "I am specifically interested in learning about fusion cuisine. Can you give me all the details for the fusion courses?",
    },
  ];

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
          imageSrc={"/src/assets/img/part4image.png"}
          questionText={questionTextArray[currentNum - 8].value}
          questionNum={currentNum}
          totalQuestions={11}
          fromPartSelect={fromPartSelect}
          questionCount={questionCount}
          partId={partId}
        />
      )}
      {stage === "image" && (
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
        </>
      )}

      {stage === "scoring" && !isMockExam && (
        <>
          {questionTextArray.map((q, index) => (
            <React.Fragment key={index}>
              <MutipleReplyBody
                questionNum={8 + index}
                questionText={q.value}
                contentText="Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number."
                isScoring={stage === "scoring"}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
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

export default Part4Page;
