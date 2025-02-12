// OnboardingPage.tsx

import styled from "styled-components";
import React from "react";
import Logo from "../assets/img/logo.svg";
import clickIcon from "../assets/img/clickIcon.svg";
import OnboardingBackgroundImage from "../assets/img/GradationBackground.png";
import gptIcon from "../assets/img/gptIcon.svg";
import azureIcon from "../assets/img/azureIcon.svg";
import numOneIcon from "../assets/img/numoneIcon.svg";
import numTwoIcon from "../assets/img/numtwoIcon.svg";
import githubIcon from "../assets/img/githubIcon.svg";

import PassageBody from "../components/PassageBody";
import ScoreBody from "../components/ScoreBody";

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 6.25rem;
  /* background-color: white; */

  background-image: url(${OnboardingBackgroundImage});
  /* 이미지를 컨테이너에 맞게 조절 */
  background-size: contain;
  /* 이미지가 중앙에 오도록 조정 */
  background-position: center;
  /* 반복 방지 */
  /* background-repeat: no-repeat; */
`;

export const FirstScene = styled.div`
  width: 100%;
  height: 61.25rem; // 980px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 34.25rem; // 548px
    height: 14.5rem; // 232px
  }

  p {
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 4.25rem;
  }
`;

export const StartButton = styled.button`
  display: flex;
  width: 29.5rem;
  height: 6.5rem;
  border: none;
  border-radius: 6.25rem;

  /* 버튼 배경에 그라데이션 추가 */
  background: linear-gradient(
    90deg,
    #ff7b7b,
    #ffa166
  ); // 나중에 애니메이션 추가하기

  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  img {
    width: 3rem;
    height: 3rem;
    fill: white;
  }
  span {
    color: white;
    text-align: center;
    font-family: "Noto Sans HK";
    font-size: 1.75rem;
    font-weight: 700;
    margin-left: 1.75rem;
  }
`;

export const SecondScene = styled.div`
  width: 100%;
  height: 78.25rem; // 1252px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;

  p {
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 4.25rem;
  }
`;

export const ThirdScene = styled.div`
  width: 100%;
  height: 21.25rem; // 340px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ea5a47;
  p {
    color: white;
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 4.25rem;
  }
`;

export const FourthScene = styled.div`
  width: 100%;
  height: 28.5rem; // 456px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 3rem;

  p {
    margin: 1rem;
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 4.25rem;
  }
`;

export const IconsBody = styled.div`
  width: 100%;
  height: 28.5rem; // 456px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 11.5rem;
    height: 11.5rem;
  }
`;

export const FifthScene = styled.div`
  width: 100%;
  height: 157rem; // 2512px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export const FeatureContainer = styled.div`
  width: 100%;
  margin-top: 9rem;

  img {
    margin-top: -0.3rem;
    margin-right: 1.75rem;
  }

  p {
    display: flex;
    align-items: flex-start;
    margin-left: 9rem;

    font-size: 3.5rem;
    font-weight: bold;
  }
`;

export const BrowserWindow = styled.div`
  width: 93.75rem;
  height: 50rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
`;

export const TitleBar = styled.div`
  width: 100%;
  /* width: 93.75rem; // 1500px; */
  height: 4.5rem; // 72px;

  background-color: #ebebeb;

  border-top-left-radius: 1.75rem; // 28px
  border-top-right-radius: 1.75rem; // 28px

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-left: 1.5rem;
  box-sizing: border-box; // padding을 포함한 크기 계산
`;

export const ButtonIcon = styled.div<{ color: string }>`
  width: 1.5rem;
  height: 1.5rem;

  margin: 0 0.5rem 0 0.5rem;

  border-color: black;

  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const BrowserContent = styled.div`
  width: 93.75rem; // 1500px;
  height: 45.5rem; // 728px;

  border-bottom-left-radius: 1.75rem;
  border-bottom-right-radius: 1.75rem;

  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4.625rem;
  box-sizing: border-box;

  p {
    /* margin-top: 1rem; */
    font-size: 1.25rem;
  }
`;

// 빨간색 하이라이트 (틀린 단어)
export const RedHighlight = styled.span`
  position: relative;

  background-color: #ff5151;
  color: white;
  text-decoration: underline;
  padding: 0.2rem 0.2rem;
  border-radius: 4px;
`;

const Footer = styled.div`
  margin-top: 6.25rem;
  width: 100%;
  height: 6.25rem;

  background-color: #d9d9d9;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    margin-left: 2rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 2rem;
  }
`;

const textContent =
  "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.";

const OnboardingPage: React.FC = () => {
  return (
    <Wrapper>
      <FirstScene>
        <img src={Logo} />
        <p>
          공인 영어 회화 시험,
          <br />
          AI로 준비하세요
        </p>
        {/* {그림자가 현재 없음} */}
        <StartButton>
          <img src={clickIcon} />
          <span>로그인하여 시작하기</span>
        </StartButton>
      </FirstScene>
      <SecondScene>
        <p>
          토익 스피킹 준비,
          <br /> 이런 고민은 없으셨나요?
        </p>
        <div></div>
      </SecondScene>
      <ThirdScene>
        <p>
          EPIC은, AI 기술을 활용해 <br />
          해답을 제시합니다.
        </p>
      </ThirdScene>
      <FourthScene>
        <IconsBody>
          <img src={gptIcon} />
          <p style={{ color: "black" }}>Chat GPT</p>
        </IconsBody>
        <IconsBody>
          <img src={azureIcon} />
          <p style={{ color: "#31ACE8" }}>Microsoft Azure</p>
        </IconsBody>
      </FourthScene>
      <FifthScene>
        <FeatureContainer>
          <p>
            <img src={numOneIcon} />
            발음의 핵심은 정확한 음소 발화!
            <br />
            틀린 부분을 음소 단위로 알려줍니다.
          </p>
        </FeatureContainer>
        <BrowserWindow>
          <TitleBar>
            <ButtonIcon color="#FF4444" />
            <ButtonIcon color="#FDB241" />
            <ButtonIcon color="#65D81F" />
          </TitleBar>
          <BrowserContent>
            <PassageBody
              text={textContent}
              isScoring={true}
              questionNum={1}
              totalQuestions={2}
            />
            <p>
              *<RedHighlight>하이라이트된 단어</RedHighlight>에 마우스를
              올려보세요!
            </p>
          </BrowserContent>
        </BrowserWindow>
        <FeatureContainer>
          <p>
            <img src={numTwoIcon} />
            실제 평가에 쓰이는 지표로
            <br />
            점수를 측정합니다.
          </p>
        </FeatureContainer>
        <BrowserWindow>
          <TitleBar>
            <ButtonIcon color="#FF4444" />
            <ButtonIcon color="#FDB241" />
            <ButtonIcon color="#65D81F" />
          </TitleBar>
          <BrowserContent>
            <ScoreBody
              totalScore={86}
              accuracy={80}
              completeness={60}
              fluency={85}
              prosody={70}
            />
          </BrowserContent>
        </BrowserWindow>
      </FifthScene>
      <Footer>
        <img src={githubIcon} />
        <p>개인정보 처리방침</p>
      </Footer>
    </Wrapper>
  );
};

export default OnboardingPage;
