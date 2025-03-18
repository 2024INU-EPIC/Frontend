import React, { useState, useEffect } from 'react';
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
  ScoreValue,
  InfoTip,
  InfoImg,
} from './ScoreBody.styled';

import infoIcon from '../assets/img/infoIcon.svg';
import DoughnutChart from './DoughnutChart';

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

  // 점수 시각화 상태 추가
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedAccuracy(accuracy);
      setAnimatedCompleteness(completeness);
      setAnimatedFluency(fluency);
      setAnimatedProsody(prosody);
      setShowScores(true);

      // setTimeout(() => setShowScores(true), 100);
    }, 5);
  }, [accuracy, completeness, fluency, prosody]);

  return (
    <ScoreContainer>
      <TotalScoreArea>
        <div style={{ margin: '1.5rem 1.875rem' }}>
          <p>발음 점수</p>
          <TotalScoreBody>
            <ScoreCircle>
              <DoughnutChart score={totalScore} />
            </ScoreCircle>
            <ScoreLegend>
              <div>
                <span style={{ backgroundColor: '#FF5151' }}></span> 0 ~ 49
              </div>
              <div>
                <span style={{ backgroundColor: '#FF9D00' }}></span> 50 ~ 79
              </div>
              <div>
                <span style={{ backgroundColor: '#59BED4' }}></span> 80 ~ 100
              </div>
            </ScoreLegend>
          </TotalScoreBody>
        </div>
      </TotalScoreArea>

      <ScoreDetailsArea>
        <div style={{ margin: '1.5rem 1.875rem' }}>
          <p>발음 점수 분석</p>
          <GridBody>
            {/* ✅ 정확도 점수 */}
            <ScoreRow>
              <ScoreLabel>
                <p>정확도 점수</p>
                <InfoImg src={infoIcon} />
                <InfoTip syllable={3}>
                  발음정확도. 음소가 원어민의 발음과 얼마나 일치하는지
                  나타냅니다. 단어 및 전체 텍스트 정확도 점수는 음소 수준 정확도
                  점수에서 집계됩니다.
                </InfoTip>
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedAccuracy} color="#59BED4" />
              </ScoreBarContainer>{' '}
              {showScores && (
                <ScoreValue width={animatedAccuracy} color="#59BED4">
                  {animatedAccuracy}
                </ScoreValue>
              )}
            </ScoreRow>

            {/* ✅ 유창성 점수 */}
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
                <ScoreBar width={animatedFluency} color="#59BED4" />
              </ScoreBarContainer>
              {showScores && (
                <ScoreValue width={animatedFluency} color="#59BED4">
                  {animatedFluency}
                </ScoreValue>
              )}
            </ScoreRow>

            {/* ✅ 완성도 점수 */}
            <ScoreRow>
              <ScoreLabel>
                <p>완성도 점수</p>
                <InfoImg src={infoIcon} />
                <InfoTip syllable={3}>
                  완성도: 입력 참조 텍스트에 대한 발음 단어의 비율로 계산된
                  음성의 완성도입니다.
                </InfoTip>
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedCompleteness} color="#FF5151" />
              </ScoreBarContainer>
              {showScores && (
                <ScoreValue width={animatedCompleteness} color="#FF5151">
                  {animatedCompleteness}
                </ScoreValue>
              )}
            </ScoreRow>

            {/* ✅ 운율 점수 */}
            <ScoreRow>
              <ScoreLabel>
                <p>운율 점수</p>
                <InfoImg src={infoIcon} />
                <InfoTip syllable={2}>
                  지정된 음성의 운율 체계입니다. 운율 체계는 스트레스, 음조,
                  말하기 속도 및 발음을 포함하여 지정된 음성의 특성을
                  나타냅니다.
                </InfoTip>
              </ScoreLabel>
              <ScoreBarContainer>
                <ScoreBar width={animatedProsody} color="#FF9D00" />
              </ScoreBarContainer>
              {showScores && (
                <ScoreValue width={animatedProsody} color="#FF9D00">
                  {animatedProsody}
                </ScoreValue>
              )}
            </ScoreRow>
          </GridBody>
        </div>
      </ScoreDetailsArea>
    </ScoreContainer>
  );
};

export default ScoreBody;
