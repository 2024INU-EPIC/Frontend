// components/ExamHistoryCard.tsx
import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { levelMap } from "../utils/levelMap";
import StudyStatChart from "./StudyStatChart";

import { styled } from "styled-components";

interface ExamHistoryCardProps {
  exam: any;
  openModal: (id: string) => void;
  setGradeId: (id: number) => void;
}

const ExamHistoryCard: React.FC<ExamHistoryCardProps> = ({
  exam,
  openModal,
  setGradeId,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [scoreValueVisible, setScoreValueVisible] = useState(false);

  useEffect(() => {
    const targetScore = Number(exam.testGrade.split(" ")[0]);

    const animate = setTimeout(() => {
      setAnimatedScore(targetScore);
    }, 100); // margin-left 시작

    const showValue = setTimeout(() => {
      setScoreValueVisible(true);
    }, 1100); // margin-left transition 이후 숫자 등장

    return () => {
      clearTimeout(animate);
      clearTimeout(showValue);
      //   setScoreValueVisible(false); // 다음 카드 클릭 시 초기화
    };
  }, [exam.testGrade]);
  return (
    <ExamRecord
      onClick={() => {
        openModal(exam.date);
        setGradeId(exam.gradeId);
      }}
    >
      <ScoreArea>
        <ExamDate>{formatDate(exam.date)}</ExamDate>
        <ExamScoreText>성적</ExamScoreText>
        <ExamScore>{exam.score}</ExamScore>
      </ScoreArea>
      <ScoreDetailsArea>
        <ExamBarText>
          <span>상세점수</span>
        </ExamBarText>
        <ExamBarArea>
          <IndicatorBox score={animatedScore}>
            <ScoreValue visible={scoreValueVisible}>{animatedScore}</ScoreValue>
            <ScoreValueIndicator />
          </IndicatorBox>
          <ExamBar />
          <ExamBarDomain>
            <span>0</span>
            <span>200</span>
          </ExamBarDomain>
        </ExamBarArea>
        <ExamResultText>
          {levelMap[exam.testGrade.split(" ")[1]] || "Unknown Level"}
        </ExamResultText>
      </ScoreDetailsArea>
      <ExamGraph>
        {exam.scores && exam.scores.length > 0 ? (
          <StudyStatChart scores={exam.scores} />
        ) : (
          "아직 학습 데이터가 없어요. 학습을 시작해보세요."
        )}
      </ExamGraph>
    </ExamRecord>
  );
};

export default ExamHistoryCard;

export const ExamRecord = styled.div`
  width: 81rem;
  height: 21rem;
  border-radius: 1.25rem;
  background: white;
  filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.25));
  margin: 3.25rem 5.5rem 2.5rem 5.5rem;
  display: flex;
  align-items: center;

  margin: 3.6rem 0 -1rem 0;
`;

export const ScoreArea = styled.div`
  width: 15.75rem;
  height: 21rem;
  border-radius: 1.25rem 0rem 0rem 1.25rem;
  border-right: 1px solid #8a8a8a;
`;

export const ExamDate = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 2rem 0 3rem 0;
`;

export const ExamScoreText = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.25rem;
  font-weight: bold;
`;

export const ExamScore = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 48px;
  font-weight: bold;
`;

export const ScoreDetailsArea = styled.div`
  margin: 0 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 28rem;
  height: 16.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ExamBarText = styled.div`
  /* border: 1px solid #d9d9d9; */
  width: 100%;
  height: 3.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 1rem;
  }
`;

export const ExamBarArea = styled.div`
  /* border: 1px solid #d9d9d9;s */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export const IndicatorBox = styled.div<{ score: number }>`
  align-self: flex-start;
  margin-left: ${({ score }) => 16 + (384 * score) / 200}px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  transition: margin-left 1s ease-in-out;
`;

export const ScoreValue = styled.div<{ visible: boolean }>`
  font-size: 1.25rem;
  font-weight: bold;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
export const ScoreValueIndicator = styled.div`
  width: 0;
  height: 0;
  border-left: 0.625rem solid transparent;
  border-right: 0.625rem solid transparent;
  border-top: 1rem solid #ff5151;
`;

export const ExamBar = styled.div`
  width: 384px;
  height: 1.5rem;
  /* flex-shrink: 0; */
  background: linear-gradient(90deg, #ffa8a8 0%, #ea5a47 100%);
  margin: 0.5rem 0;
`;

export const ExamBarDomain = styled.div`
  width: 384px;
  height: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

export const ExamResultText = styled.div`
  border: 1.5px solid black;
  border-radius: 6px;

  width: 15.625rem;
  height: 2.5rem;

  margin-bottom: 2rem;

  background-color: #f0f0f0;
  font-size: 20px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExamGraph = styled.div`
  // border: 1px solid #d9d9d9;
  // width: 28rem;
  // height: 16.25rem;
  height: 100%;

  border-radius: 4px;

  flex: 1;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;
