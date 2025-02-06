import React, { useEffect, useState } from "react";
import * as S from "./Main.styled";
import ScoreBody from "../components/ScoreBody";
import {
  ContentBody,
  TimeRemainingIndicator,
  TimeInfoText,
  RedHighlight,
  OrangeHighlight,
} from "./Test.styled";

const TestPage: React.FC = () => {
  const [isPreparing, setPreparing] = useState(true);
  const [isResponding, setResponding] = useState(false);
  const [isScoring, setScoring] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10); // 개발용 5초 설정

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
        setRemainingTime(10);
      } else if (isResponding) {
        setResponding(false);
        setScoring(true);
      }
    }
  }, [remainingTime, isPreparing, isResponding]);

  function handleNextStep() {
    if (isPreparing) {
      setPreparing(false);
      setResponding(true);
      setRemainingTime(10);
    } else if (isResponding) {
      setResponding(false);
      setScoring(true);
    }
  }

  // ✅ 특정 단어를 하이라이트하는 함수
  function highlightText(text: string) {
    if (!isScoring) return text; // 점수 출력 상태가 아니면 원본 텍스트 그대로 출력

    const words = text.split(" "); // 단어별로 분리
    return words.map((word, index) => {
      if (word.includes("International")) {
        return <RedHighlight key={index}>{word}</RedHighlight>;
      } else if (word.includes("identification")) {
        return <OrangeHighlight key={index}>{word}</OrangeHighlight>;
      } else if (word.includes("luggage")) {
        return <RedHighlight key={index}>{word}</RedHighlight>;
      }
      return ` ${word} `; // 원래 단어 그대로 반환
    });
  }

  return (
    <S.mainContainer>
      <ContentBody>
        <p className="question">Question 1 of 2</p>
        <div onClick={handleNextStep}>
          <p className="paragraph">
            {highlightText(
              "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.",
            )}
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
        />
      )}
    </S.mainContainer>
  );
};

export default TestPage;
