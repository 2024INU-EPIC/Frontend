// components/ScoreDetailsBox.tsx
import React, { useEffect, useState } from "react";
import { levelMap } from "../utils/levelMap";
import { styled } from "styled-components";

interface GradationBarBoxProps {
  testGrade: string; // e.g. "140 IH"
}

export const GradationBarBox: React.FC<GradationBarBoxProps> = ({
  testGrade,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [scoreValueVisible, setScoreValueVisible] = useState(false);

  useEffect(() => {
    const targetScore = Number(testGrade.split(" ")[0]);

    const animate = setTimeout(() => {
      setAnimatedScore(targetScore);
    }, 100);

    const showValue = setTimeout(() => {
      setScoreValueVisible(true);
    }, 1100);

    return () => {
      clearTimeout(animate);
      clearTimeout(showValue);
      //   setScoreValueVisible(false); // 다른 컴포넌트 선택시 초기화
    };
  }, [testGrade]);

  const levelAbbr = testGrade.split(" ")[1];

  return (
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
      <ExamResultText>{levelMap[levelAbbr] || "Unknown Level"}</ExamResultText>
    </ScoreDetailsArea>
  );
};

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
