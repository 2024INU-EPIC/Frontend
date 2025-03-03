import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

// interface Part3PageProps {
//   isMockExam?: boolean; // 실전 모의고사 여부
// }

// const Part3Page: React.FC<Part3PageProps> = ({ isMockExam = false }) => {
const Part3Page: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get("mockExam") === "true"; // URL에서 mockExam 값 확인

  const [currentNum, setCurrentNum] = useState(5); // 문제 번호 (5 → 6 → 7)
  const [remainingTime, setRemainingTime] = useState(1); // 처음 45초 동안 SituationBody만 표시
  const [stage, setStage] = useState<
    "situation" | "preparing" | "responding" | "scoring"
  >("situation");

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
        case "situation":
          setStage("preparing");
          setRemainingTime(1);
          break;
        case "preparing":
          setStage("responding");
          setRemainingTime(currentNum === 7 ? 1 : 1);
          break;
        case "responding":
          if (currentNum < 7) {
            increaseNum();
            setStage("preparing");
            setRemainingTime(1);
          } else {
            setStage("scoring");

            // 실전 모의고사 모드에서는 자동으로 Part4 페이지로 이동
            if (isMockExam) {
              setTimeout(() => {
                navigate("/part4?mockExam=true"); // 7번 문제 완료 후 Part4로 이동
              }, 0); //  딜레이없이 바로 이동
            }
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, isMockExam, navigate]);

  const situationText =
    "Imagine that an American newspaper company is doing research in your country, and you have agreed to participate in a telephone interview about your friendship.";

  const questionTextArray = [
    {
      id: 1,
      value:
        "When was the last time you met your childhood friend? And what did you talk about?",
    },
    { id: 2, value: "Where did you meet the childhood friend?" },
    {
      id: 3,
      value:
        "What is the most important factor that you could keep the friendship for many years?",
    },
  ];

  return (
    <S.mainContainer>
      <TopBlank />
      <SituationBody
        stage={stage}
        partNum={3}
        situationText={situationText}
        questionText={questionTextArray[currentNum - 5].value}
        questionNum={currentNum}
        totalQuestions={11}
      />

      {stage === "situation" && (
        <>
          <TopBlank />
          <TimeRemainingIndicator>{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === "preparing" && (
        <>
          <TopBlank />
          <TimeRemainingIndicator>{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === "responding" && (
        <>
          <TopBlank />
          <TimeRemainingIndicator bgColor="#59BED4">{`00 : ${remainingTime.toString().padStart(2, "0")}`}</TimeRemainingIndicator>
          <TimeInfoText>Response Time</TimeInfoText>
        </>
      )}

      {stage === "scoring" && !isMockExam && (
        <>
          {questionTextArray.map((q, index) => (
            <React.Fragment key={index}>
              <MutipleReplyBody
                questionNum={5 + index}
                questionText={q.value}
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
            </React.Fragment>
          ))}
        </>
      )}
    </S.mainContainer>
  );
};

export default Part3Page;
