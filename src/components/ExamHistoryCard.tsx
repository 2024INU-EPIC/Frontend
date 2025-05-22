// components/ExamHistoryCard.tsx
import React from "react";
import { formatDate } from "../utils/dateUtils";
import StudyStatChart from "./StudyStatChart";

import { styled } from "styled-components";
import { GradationBarBox } from "./GradationBarBox";

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
      <GradationBarBox testGrade={exam.testGrade} />
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

export const ExamGraph = styled.div`
  // border: 1px solid #d9d9d9;
  // width: 28rem;
  // height: 16.25rem;
  /* height: 500px; */

  border-radius: 4px;

  flex: 1;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  margin-top: 2rem;
`;
