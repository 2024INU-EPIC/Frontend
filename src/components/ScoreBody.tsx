import { React, useState, useEffect } from "react";
import {
  ScoreContainer,
  TotalScoreArea,
  ScoreCircle,
  ScoreLegend,
  ScoreDetailsArea,
  ScoreRow,
  ScoreLabel,
  ScoreBarContainer,
  ScoreBar,
  TotalScoreBody,
  GridBody,
} from "./ScoreBody.styled";

import infoIcon from "../assets/img/infoIcon.svg";
import DoughnutChart from "./DoughnutChart";

interface ScoreProps {
  totalScore: number;
  accuracy: number;
  completeness: number;
  fluency: number;
  prosody: number;
}

const ScoreBody: React.FC<ScoreProps> = ({
  totalScore,
  accuracy,
  completeness,
  fluency,
  prosody,
}) => {
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  const [animatedCompleteness, setAnimatedCompleteness] = useState(0);
  const [animatedFluency, setAnimatedFluency] = useState(0);
  const [animatedProsody, setAnimatedProsody] = useState(0);

  useEffect(() => {
    // 300ms 딜레이 후 점진적으로 값 증가
    setTimeout(() => {
      setAnimatedAccuracy(accuracy);
      setAnimatedCompleteness(completeness);
      setAnimatedFluency(fluency);
      setAnimatedProsody(prosody);
    }, 5);
  }, [accuracy, completeness, fluency, prosody]);

  return (
    <ScoreContainer>
      <TotalScoreArea>
        <div style={{ margin: "1.5rem 1.875rem" }}>
          <p>발음 점수</p>
          {/* <p style={{}}>발음 점수</p> */}
          <TotalScoreBody>
            <ScoreCircle>
              {/* <ScoreNumber>{totalScore}</ScoreNumber> */}
              <DoughnutChart score={totalScore} />
            </ScoreCircle>
            <ScoreLegend>
              <div>
                <span style={{ backgroundColor: "#D0021B" }}></span> 0 ~ 59
              </div>
              <div>
                <span style={{ backgroundColor: "#F5A623" }}></span> 60 ~ 79
              </div>
              <div>
                <span style={{ backgroundColor: "#67B7D1" }}></span> 80 ~ 100
              </div>
            </ScoreLegend>
          </TotalScoreBody>
        </div>
      </TotalScoreArea>
      <ScoreDetailsArea>
        <div style={{ margin: "1.5rem 1.875rem" }}>
          <p>발음 점수 분석</p>
          <GridBody>
            <ScoreRow>
              <ScoreLabel>
                <p>정확도 점수</p>
                <img src={infoIcon} />
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedAccuracy} color="#67B7D1" />
              </ScoreBarContainer>
            </ScoreRow>
            <ScoreRow>
              <ScoreLabel>
                {" "}
                <p>유창성 점수</p>
                <img src={infoIcon} />
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedAccuracy} color="#67B7D1" />
              </ScoreBarContainer>
            </ScoreRow>
            <ScoreRow>
              <ScoreLabel>
                {" "}
                <p>완성도 점수</p>
                <img src={infoIcon} />
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedCompleteness} color="#D0021B" />
              </ScoreBarContainer>
            </ScoreRow>
            <ScoreRow>
              <ScoreLabel>
                <p>운율 점수</p>
                <img src={infoIcon} />
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedProsody} color="#F5A623" />
              </ScoreBarContainer>
            </ScoreRow>
          </GridBody>
        </div>
      </ScoreDetailsArea>
    </ScoreContainer>
  );
};

export default ScoreBody;
