import React, { useEffect, useState } from "react";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import ReplyBody from "../components/ReplyBody";
import styled from "styled-components";
import QuestionBody from "../components/QuestionBody";

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
  const [isPreparing, setPreparing] = useState(true);
  const [isResponding, setResponding] = useState(false);
  const [isScoring, setScoring] = useState(false);
  const [remainingTime, setRemainingTime] = useState(45);

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
        setRemainingTime(60);
      } else if (isResponding) {
        setResponding(false);
        setScoring(true);
      }
    }
  }, [remainingTime, isPreparing, isResponding]);

  const textContent =
    " The only way to reduce the amount of traffic in cities today is by reducing the need for people to travel from home for work, education or shopping. Do you agree or disagree with this point of view? Use specific reasons and examples to support your choice.";
  const replyContent =
    "The only way to reduce the amount of traffic in cities today is by reducing the need for people to travel from home for work, education or shopping. Do you agree or disagree with this point of view? Use specific reasons and examples to support your choice.The only way to reduce the amount of traffic in cities today is by reducing the need for people to travel from home for work, education or shopping. Do you agree or disagree with this point of view? Use specific reasons and examples to support your choice.The only way to reduce the amount of traffic in cities today is by reducing the need for people to travel from home for work, education or shopping. Do you agree or disagree with this point of view? Use specific reasons and examples to support your choice.";

  // ? 이후 줄바꿈용 코드
  const formattedText = textContent.split("?").map((part, index, arr) => (
    <React.Fragment key={index}>
      {part}
      {index < arr.length - 1 && "?"}
      {index === 0 && <br />}
    </React.Fragment>
  ));

  return (
    <S.mainContainer>
      <TopBlank />
      <QuestionBody text={formattedText} questionNum={11} totalQuestions={11} />
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
          <ReplyBody text={replyContent} isScoring={isScoring} />
          <ScoreBody
            totalScore={86}
            accuracy={80}
            completeness={60}
            fluency={85}
            prosody={70}
          />
        </>
      )}
    </S.mainContainer>
  );
};

export default Part5Page;
