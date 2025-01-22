import React from "react";
import Logo from "../assets/img/logo.svg"; // 로고 파일 경로
import styled from "styled-components";

const SplitScreen = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;
  justify-content: flex;
  align-items: center;
`;

const LeftPane = styled.div`
  // flex: 0 0 50.75rem; // 812px;
  width: 42.29vw;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 100;
`;

const RightPane = styled.div`
  // flex: 0 0 69.25rem; // 1108px;
  width: 57.71vw;
  height: 100vh;
  background-color: #ea5a47;
  display: flex;
  justify-content: flex;
  align-items: center;
`;

const WelcomeLogo = styled.img`
  width: 23.95vw; // 460px;
`;

const Login: React.FC = () => {
  return (
    <div>
      <SplitScreen>
        <LeftPane>
          <WelcomeLogo src={Logo}></WelcomeLogo>
          <p>English Pronunciation Improvement Coach</p>
        </LeftPane>
        <RightPane>
          <p>Welcome back!</p>
        </RightPane>
      </SplitScreen>
    </div>
  );
};

export default Login;
