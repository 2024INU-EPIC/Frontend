// Part1Page.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from './Main.styled';
import ScoreBody from '../components/ScoreBody';
import PassageBody from '../components/PassageBody';
import DirectionBody from '../components/DirectionBody';
import styled from 'styled-components';
import useTempRecording from '../components/useTempRecording'; // 🎤 녹음 훅 추가

const IS_DEV_MODE = true;

const TIME_SETTINGS = {
  direction: IS_DEV_MODE ? 5 : 45,
  preparing: IS_DEV_MODE ? 1 : 45,
  responding: IS_DEV_MODE ? 2 : 45,
};

type TimeIndicatorProps = { bgColor?: string };

export const TimeRemainingIndicator = styled.div<TimeIndicatorProps>`
  margin-top: 5.75rem;
  margin-bottom: 1.5rem;
  width: 12.25rem;
  height: 12.25rem;
  border-radius: 50%;
  border-color: black;
  font-size: 2rem;
  color: white;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
  background-color: ${(props) => props.bgColor || '#ff7b7b'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimeInfoText = styled.p`
  font-size: 1.5rem;
`;

export const TopBlank = styled.div`
  height: 9rem;
`;

type Part1PageProps = {
  part: number;
};

const Part1Page: React.FC<Part1PageProps> = ({ part }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMockExam = searchParams.get('mockExam') === 'true';

  const [currentNum, setCurrentNum] = useState(1);
  const [remainingTime, setRemainingTime] = useState(12);
  const [stage, setStage] = useState<
    'direction' | 'preparing' | 'responding' | 'scoring'
  >('direction');
  const [response, setResponse] = useState<any>(null); // API 응답 저장
  const referenceText = [
    "hello, it's me. i'm fine. thank you.",
    'Welcome to Boston Airport. In order to proceed your process,',
  ]; // 입력된 문장

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  // 🎤 녹음 및 API 요청 관련 상태 및 함수
  const { startRecording, stopRecording } = useTempRecording(
    setResponse,
    referenceText[0],
    part,
  );

  function increaseNum() {
    setCurrentNum((prevNum) => prevNum + 1);
  }

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      switch (stage) {
        case 'direction':
          if (currentNum !== 2) {
            setStage('preparing');
            setRemainingTime(TIME_SETTINGS.preparing);
          }
          break;
        case 'preparing':
          setStage('responding');
          setRemainingTime(TIME_SETTINGS.responding);
          break;
        case 'responding':
          if (currentNum < 2) {
            increaseNum();
            setStage('preparing');
            setRemainingTime(TIME_SETTINGS.preparing);
          } else {
            setStage('scoring');
            if (isMockExam) {
              setTimeout(() => navigate('/part2?mockExam=true'), 0);
            }
          }
          break;
        default:
          break;
      }
    }
  }, [remainingTime, stage, currentNum, isMockExam, navigate]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/src/assets/audio/part1.mp3');
    }

    const audio = audioRef.current;

    if (stage === 'direction' && !hasPlayedRef.current) {
      audio
        .play()
        .then(() => {
          hasPlayedRef.current = true;
        })
        .catch((e) => console.error('Audio play error:', e));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [stage]);

  // 🎯 API 응답을 기반으로 wrongWordScore 생성
  const wrongWordScore =
    response?.IssueWords?.reduce(
      (acc: Record<string, number>, item: any) => {
        acc[item.word] = item.AccuracyScore;
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  return (
    <S.mainContainer>
      <TopBlank />

      {/* 🎤 녹음 관련 버튼 */}
      <button onClick={startRecording}>Start Recording</button>
      <button
        onClick={() => {
          stopRecording();
        }}
      >
        Stop Recording
      </button>
      {/* <button onClick={submitAssessment}>Submit Assessment</button> */}

      {/* 🎯 시험 화면 */}
      {stage === 'direction' && (
        <DirectionBody
          title="Question 1-2: Read a Text Aloud"
          direction="Directions: In this part of the test, you will read aloud the text on the screen."
        />
      )}

      {stage !== 'direction' && (
        <PassageBody
          text="hello, it's me. i'm fine, thank you."
          isScoring={stage === 'scoring'}
          wrongWordScore={wrongWordScore}
          questionNum={currentNum}
          totalQuestions={2}
        />
      )}

      {stage === 'preparing' && (
        <>
          <TimeRemainingIndicator>{`00 : ${remainingTime
            .toString()
            .padStart(2, '0')}`}</TimeRemainingIndicator>
          <TimeInfoText>Preparation Time</TimeInfoText>
        </>
      )}

      {stage === 'responding' && (
        <>
          <TimeRemainingIndicator bgColor="#59BED4">{`00 : ${remainingTime
            .toString()
            .padStart(2, '0')}`}</TimeRemainingIndicator>
          <TimeInfoText>Response Time</TimeInfoText>
        </>
      )}

      {stage === 'scoring' && !isMockExam && (
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

export default Part1Page;
