import React, { useState, useEffect } from "react";
import {
  ScoreContainer,
  TotalScoreArea,
  ScoreCircle,
  ScoreDetailsArea,
  ScoreRow,
  ScoreLabel,
  ScoreBarContainer,
  ScoreBar,
  TotalScoreBody,
  ScoreValue,
  InfoTip,
  InfoImg,
} from "./ScoreBodyGeneral.styled";

import infoIcon from "../assets/img/infoIcon.svg";
import DoughnutChart from "./DoughnutChart";

interface ScoreProps {
  pronunciationScore: number;
  accuracy: number;
  fluency: number;
  prosody: number;
  contentScore: number;
  voca: number;
  grammar: number;
  topic: number;
}

const ScoreBodyGeneral: React.FC<ScoreProps> = ({
  pronunciationScore,
  accuracy,
  fluency,
  prosody,
  contentScore,
  voca,
  grammar,
  topic,
}) => {
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  const [animatedFluency, setAnimatedFluency] = useState(0);
  const [animatedProsody, setAnimatedProsody] = useState(0);
  const [animatedVoca, setAnimatedVoca] = useState(0);
  const [animatedGrammar, setAnimatedGrammar] = useState(0);
  const [animatedTopic, setAnimatedTopic] = useState(0);

  // 점수 시각화 상태 추가
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedAccuracy(accuracy);
      setAnimatedFluency(fluency);
      setAnimatedProsody(prosody);
      setAnimatedVoca(voca);
      setAnimatedGrammar(grammar);
      setAnimatedTopic(topic);
      setShowScores(true);

      // setTimeout(() => setShowScores(true), 100);
    }, 5);
  }, [accuracy, fluency, prosody, voca, grammar, topic]);

  const getScoreColor = (score: number) => {
    return score >= 80 ? "#59BED4" : score >= 60 ? "#FF9D00" : "#FF5151";
  };

  return (
    <ScoreContainer>
      <TotalScoreArea>
        <div style={{ margin: "1.5rem 1.875rem" }}>
          <p>발음 점수</p>
          <TotalScoreBody>
            <ScoreCircle>
              <DoughnutChart score={pronunciationScore} />
            </ScoreCircle>
          </TotalScoreBody>
        </div>
      </TotalScoreArea>

      <ScoreDetailsArea>
        <div style={{ margin: "1.5rem 1.875rem" }}>
          <ScoreRow>
            <ScoreLabel>
              <p>정확도 점수</p>
              <InfoImg src={infoIcon} />
              <InfoTip syllable={3}>
                발음정확도. 음소가 원어민의 발음과 얼마나 일치하는지 나타냅니다.
                단어 및 전체 텍스트 정확도 점수는 음소 수준 정확도 점수에서
                집계됩니다.
              </InfoTip>
            </ScoreLabel>
            <ScoreBarContainer>
              <ScoreBar
                width={animatedAccuracy}
                color={getScoreColor(animatedAccuracy)}
              />
            </ScoreBarContainer>{" "}
            {showScores && (
              <ScoreValue
                width={animatedAccuracy}
                color={getScoreColor(animatedAccuracy)}
              >
                {animatedAccuracy}
              </ScoreValue>
            )}
          </ScoreRow>

          <ScoreRow>
            <ScoreLabel>
              <p>유창성 점수</p>
              <InfoImg src={infoIcon} />
              <InfoTip syllable={3}>
                주어진 음성의 유창성. 유창성은 원어민이 단어 사이에 묵음
                나누기를 사용하는 것과 그 말이 얼마나 일치하는지 나타냅니다.
              </InfoTip>
            </ScoreLabel>
            <ScoreBarContainer>
              <ScoreBar
                width={animatedFluency}
                color={getScoreColor(animatedFluency)}
              />
            </ScoreBarContainer>
            {showScores && (
              <ScoreValue
                width={animatedFluency}
                color={getScoreColor(animatedFluency)}
              >
                {animatedFluency}
              </ScoreValue>
            )}
          </ScoreRow>

          <ScoreRow>
            <ScoreLabel>
              <p>운율 점수</p>
              <InfoImg src={infoIcon} />
              <InfoTip syllable={2}>
                지정된 음성의 운율 체계입니다. 운율 체계는 스트레스, 음조,
                말하기 속도 및 발음을 포함하여 지정된 음성의 특성을 나타냅니다.
              </InfoTip>
            </ScoreLabel>
            <ScoreBarContainer>
              <ScoreBar
                width={animatedProsody}
                color={getScoreColor(animatedProsody)}
              />
            </ScoreBarContainer>
            {showScores && (
              <ScoreValue
                width={animatedProsody}
                color={getScoreColor(animatedProsody)}
              >
                {animatedProsody}
              </ScoreValue>
            )}
          </ScoreRow>
        </div>
      </ScoreDetailsArea>

      <TotalScoreArea>
        <div style={{ margin: "1.5rem 1.875rem" }}>
          <p>컨텐츠 점수</p>
          <TotalScoreBody>
            <ScoreCircle>
              <DoughnutChart score={contentScore} />
            </ScoreCircle>
          </TotalScoreBody>
        </div>
      </TotalScoreArea>

      <ScoreDetailsArea>
        <div style={{ margin: "1.5rem 1.875rem" }}>
          <ScoreRow>
            <ScoreLabel>
              <p>어휘 점수</p>
              <InfoImg src={infoIcon} />
              <InfoTip syllable={2}>
                발음정확도. 음소가 원어민의 발음과 얼마나 일치하는지 나타냅니다.
                단어 및 전체 텍스트 정확도 점수는 음소 수준 정확도 점수에서
                집계됩니다.
              </InfoTip>
            </ScoreLabel>
            <ScoreBarContainer>
              <ScoreBar
                width={animatedVoca}
                color={getScoreColor(animatedVoca)}
              />
            </ScoreBarContainer>{" "}
            {showScores && (
              <ScoreValue
                width={animatedVoca}
                color={getScoreColor(animatedVoca)}
              >
                {animatedVoca}
              </ScoreValue>
            )}
          </ScoreRow>

          <ScoreRow>
            <ScoreLabel>
              <p>문법 점수</p>
              <InfoImg src={infoIcon} />
              <InfoTip syllable={2}>
                주어진 음성의 유창성. 유창성은 원어민이 단어 사이에 묵음
                나누기를 사용하는 것과 그 말이 얼마나 일치하는지 나타냅니다.
              </InfoTip>
            </ScoreLabel>
            <ScoreBarContainer>
              <ScoreBar
                width={animatedGrammar}
                color={getScoreColor(animatedGrammar)}
              />
            </ScoreBarContainer>
            {showScores && (
              <ScoreValue
                width={animatedGrammar}
                color={getScoreColor(animatedGrammar)}
              >
                {animatedGrammar}
              </ScoreValue>
            )}
          </ScoreRow>

          <ScoreRow>
            <ScoreLabel>
              <p>주제 점수</p>
              <InfoImg src={infoIcon} />
              <InfoTip syllable={2}>
                지정된 음성의 운율 체계입니다. 운율 체계는 스트레스, 음조,
                말하기 속도 및 발음을 포함하여 지정된 음성의 특성을 나타냅니다.
              </InfoTip>
            </ScoreLabel>
            <ScoreBarContainer>
              <ScoreBar
                width={animatedTopic}
                color={getScoreColor(animatedTopic)}
              />
            </ScoreBarContainer>
            {showScores && (
              <ScoreValue
                width={animatedTopic}
                color={getScoreColor(animatedTopic)}
              >
                {animatedTopic}
              </ScoreValue>
            )}
          </ScoreRow>
        </div>
      </ScoreDetailsArea>
    </ScoreContainer>
  );
};

export default ScoreBodyGeneral;
