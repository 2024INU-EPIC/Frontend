// TestPage.tsx
import React, { useEffect, useState } from "react";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import ContentBody, { highlightText } from "../components/ContentBody";

import styled from "styled-components";

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

const TestPage: React.FC = () => {
  const [isPreparing, setPreparing] = useState(true);
  const [isResponding, setResponding] = useState(false);
  const [isScoring, setScoring] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1); // 개발용 5초 설정

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

  // 개발용 함수
  function handleNextStep() {
    if (isPreparing) {
      setPreparing(false);
      setResponding(true);
      setRemainingTime(5);
    } else if (isResponding) {
      setResponding(false);
      setScoring(true);
    }
  }

  const textContent =
    "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.";

  return (
    <S.mainContainer>
      <ContentBody text={textContent} isScoring={isScoring} />
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

export default TestPage;
