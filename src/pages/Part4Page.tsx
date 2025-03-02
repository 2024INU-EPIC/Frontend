import React, { useEffect, useState } from "react";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import MutipleReplyBody from "../components/MutipleReplyBox";
import styled from "styled-components";
import SituationBody from "../components/SituationBody";

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
  const [currentNum, setCurrentNum] = useState(8); // 문제 번호 (8 → 9 → 10)
  const [remainingTime, setRemainingTime] = useState(45); // 처음 45초 동안 SituationBody만 표시
  const [stage, setStage] = useState<
    "image" | "preparing" | "responding" | "scoring"
  >("image"); // 현재 단계

  function increaseNum() {
    setCurrentNum((prevNum) => prevNum + 1);
  }

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      switch (stage) {
        case "image":
          setStage("preparing");
          setRemainingTime(3); // 8번 문제 준비 시간
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(currentNum === 10 ? 30 : 15); // 10번 문제만 30초, 나머지는 15초
          break;
        case "responding":
          if (currentNum < 10) {
            increaseNum();
            setStage("preparing");
            setRemainingTime(3); // 다음 문제 준비시간
          } else {
            setStage("scoring"); // 마지막 문제(10번) 이후 채점 화면
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum]);

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

  return (
    <S.mainContainer>
      <TopBlank />
      <SituationBody
        stage={stage}
        partNum={4}
        imageSrc={"/src/assets/img/part4image.png"}
        questionText={questionTextArray[currentNum - 8].value}
        questionNum={currentNum}
        totalQuestions={11}
      />

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

      {stage === "scoring" && (
        <>
          <MutipleReplyBody
            questionNum={8}
            questionText="When was the last time you met your childhood friend? And what did you talk about?"
            contentText="Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process,  Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes."
            isScoring={false}
          />
          <ScoreBody
            totalScore={86}
            accuracy={80}
            completeness={60}
            fluency={85}
            prosody={70}
          />
          <MutipleReplyBody
            questionNum={9}
            questionText="When was the last time you met your childhood friend? And what did you talk about?"
            contentText="Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process,  Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes."
            isScoring={false}
          />
          <ScoreBody
            totalScore={86}
            accuracy={80}
            completeness={60}
            fluency={85}
            prosody={70}
          />
          <MutipleReplyBody
            questionNum={10}
            questionText="When was the last time you met your childhood friend? And what did you talk about?"
            contentText="Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process,  Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes."
            isScoring={false}
          />
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

export default Part4Page;
