import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBodyGeneral from "../components/ScoreBodyGeneral";
import ImageBody from "../components/ImageBody";
import ReplyBody from "../components/ReplyBody";
import DirectionBody from "../components/DirectionBody";
import styled from "styled-components";
import axios from "axios";

const IS_DEV_MODE = true;
//const IS_DEV_MODE = false;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 14, // direction 단계
  preparing: IS_DEV_MODE ? 1 : 45, // 문제 준비 시간
  responding: IS_DEV_MODE ? 2 : 30, // 답변 시간
};

type TimeIndicatorProps = { bgColor?: string };
// type TipProps = { text: string };

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

const Part2Page: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true"; // URL에서 mockExam 값 확인

  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;

  const [currentNum, setCurrentNum] = useState(3);
  const [remainingTime, setRemainingTime] = useState(14); // 음성 시간 12초
  const [stage, setStage] = useState<
    "direction" | "preparing" | "responding" | "scoring"
  >("direction");

  const [questionCount, setQuestionCount] = useState(1);

  //direction용
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  //문제 불러오기 용
  const { initialQuestions, partId } = location.state || {}; // 전달된 데이터
  const [questions, setQuestions] = useState(initialQuestions?.data[0] || null);
  const [extraQuestions, setExtraQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

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
          if (currentNum !== 4) {
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
          if (currentNum < 4) {
            increaseNum();
            setStage("preparing");
            setRemainingTime(TIME_SETTINGS.preparing);
          } else {
            setStage("scoring");

            // 실전 모의고사 모드에서는 자동으로 Part3 페이지로 이동
            if (isMockExam) {
              setTimeout(() => {
                navigate("/part3?mockExam=true"); // 4번 문제 완료 후 Part3로 이동
              }, 0); //  딜레이없이 바로 이동
            }
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, fromPartSelect, isMockExam, navigate]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/src/assets/audio/part2.mp3");
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
    return questionIndex === 0 ? questions?.imageUrl1 : questions?.imageUrl2;
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
        const response = await axios.get(`/api/focused-learning/part2`);
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

  return (
    <S.mainContainer onClick={handleUserInteraction}>
      <TopBlank />
      {stage === "direction" && (
        <DirectionBody
          title={"Question 3-4: Describe a Picture"}
          direction={
            "Directions: In this part of the test, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response. Then you will have 30 seconds to speak about the picture."
          }
        />
      )}
      {stage !== "direction" && (
        <ImageBody
          imageSrc={getCurrentQuestion()}
          questionNum={currentNum}
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
          <div
            className="midContainer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="scoreContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/*  
              <ReplyBody
                text={replyContent}
                wrongWordScore={wrongWordScore}
                isScoring={stage === "scoring"}
                gptText={response?.gptEvaluation.suggestions}
              />*/}
              <ScoreBodyGeneral
                pronunciationScore={86}
                accuracy={80}
                fluency={85}
                prosody={70}
                contentScore={50}
                voca={81}
                grammar={40}
                topic={79}
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
            </div>
          </div>
        </>
      )}
    </S.mainContainer>
  );
};

export default Part2Page;
