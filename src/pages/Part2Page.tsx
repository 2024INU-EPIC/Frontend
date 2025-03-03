import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import ImageBody from "../components/ImageBody";
import ReplyBody from "../components/ReplyBody";
import styled from "styled-components";

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
  const location = useLocation();
  const fromPartSelect = location.state?.fromPartSelect;
  const partId = location.state?.partId || "Part2";

  const [isPreparing, setPreparing] = useState(true);
  const [isResponding, setResponding] = useState(false);
  const [isScoring, setScoring] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1); // 개발용 5초 설정정
  const [questionCount, setQuestionCount] = useState(1);

  const imageList = [
    "/src/assets/img/part2_1.png",
    "/src/assets/img/part2_2.png",
    "/src/assets/img/part2_3.png",
    "/src/assets/img/part2_4.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000); // 지연시간. 몇초마다 출력할 것인지. 현재 1초
      return () => clearTimeout(timer);
    } else {
      if (isPreparing) {
        setPreparing(false);
        setResponding(true);
        setRemainingTime(1);
      } else if (isResponding) {
        setResponding(false);
        setScoring(true);
      }
    }
  }, [remainingTime, isPreparing, isResponding]);

  const nextQuestion = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    setPreparing(true);
    setResponding(false);
    setScoring(false);
    setRemainingTime(1);
    setQuestionCount(questionCount + 1);
  };

  const textContent =
    "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.";
  return (
    <S.mainContainer>
      <TopBlank />
      <ImageBody
        imageSrc={imageList[currentImageIndex]}
        questionNum={3}
        totalQuestions={11}
        fromPartSelect={fromPartSelect}
        questionCount={questionCount}
        partId={partId}
      />
      {isPreparing && (
        <>
          <TimeRemainingIndicator>
            {`00 : ${remainingTime.toString().padStart(2, "0")}`}
          </TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}
      {isResponding && (
        <>
          <TimeRemainingIndicator bgColor="#59BED4">
            {`00 : ${remainingTime.toString().padStart(2, "0")}`}
          </TimeRemainingIndicator>
          <TimeInfoText>Response Time</TimeInfoText>
        </>
      )}
      {isScoring && (
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
              <ReplyBody text={textContent} isScoring={isScoring} />
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
            </div>
          </div>
        </>
      )}
    </S.mainContainer>
  );
};

export default Part2Page;
