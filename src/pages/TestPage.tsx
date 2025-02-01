import React, { useEffect, useState } from "react";

import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";

import {
  ContentBody,
  TimeRemainingIndicator,
  TimeInfoText,
} from "./Test.styled";

const TestPage: React.FC = () => {
  const [isPreparing, setPreparing] = useState(true); // 준비 중인지
  const [isResponding, setResponding] = useState(false);
  const [isScoring, setScoring] = useState(false); // 점수 출력 중인지
  const [remainingTime, setRemainingTime] = useState(5); // 남은 시간

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (isPreparing) {
        setPreparing(false);
        setResponding(true);
        setRemainingTime(5); //개발용이라 일단 5초
        setRemainingTime(5);
      } else if (isResponding) {
        setResponding(false);
        setScoring(true);
      }
    }
  }, [remainingTime, isPreparing, isResponding]);

  // 45초가 지났다면
  function handleNextStep() {
    if (isPreparing) {
      setPreparing(false);
      setResponding(true);
      setRemainingTime(45);
    } else if (isResponding) {
      setResponding(false);
      setScoring(true);
    }
  }

  return (
    <S.mainContainer>
      <ContentBody>
        <p className="question">Question 1 of 2</p>
        <div onClick={handleNextStep}>
          <p className="paragraph">
            Welcome to the Boston International Airport. Your check-in process
            will take ten to fifteen minutes. In order to speed up the process,
            please have your identification and boardingpass ready as you
            approach the counter. Also, please make sure your luggage is labeled
            with your name, address and telephone number.
          </p>
        </div>
      </ContentBody>
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
        ></ScoreBody>
      )}
    </S.mainContainer>
  );
};

export default TestPage;
