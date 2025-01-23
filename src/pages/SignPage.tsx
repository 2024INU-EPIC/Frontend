import React, { useState } from "react";

import Logo from "../assets/img/logo.svg"; // 로고 파일 경로
import emailIcon from "../assets/img/email.svg";
import passwordIcon from "../assets/img/password.svg";
import userIcon from "../assets/img/user.svg";

import {
  SplitScreen,
  LeftPane,
  WelcomeLogo,
  RightPane,
  InnerPane,
  InputArea,
  SignButton,
  SecondaryArea,
} from "./Sign.styled"; // 스타일 가져오기

const SignIn: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <SplitScreen>
        <LeftPane>
          <WelcomeLogo src={Logo}></WelcomeLogo>
          <p>English Pronunciation Improvement Coach</p>
        </LeftPane>
        <RightPane>
          <InnerPane>
            <p>{isSignUp ? "Welcome!" : "Welcome back!"}</p>
            <InputArea>
              <input placeholder="example@company.com" type="text"></input>
              <img src={emailIcon} />
            </InputArea>
            {isSignUp ? (
              <InputArea>
                <input placeholder="사용자 닉네임 (영문)" type="text"></input>
                <img src={userIcon} />
              </InputArea>
            ) : null}
            <InputArea>
              <input placeholder="비밀번호" type="password"></input>
              <img src={passwordIcon} />
            </InputArea>
            {isSignUp ? (
              <InputArea>
                <input placeholder="비밀번호 확인" type="password"></input>
                <img src={passwordIcon} />
              </InputArea>
            ) : null}
            <SignButton>
              <p>{isSignUp ? "Sign Up" : "Sign in"}</p>
            </SignButton>
            {isSignUp ? (
              <SecondaryArea>
                <div>
                  <p>👇 이미 계정이 있으신가요? 👇</p>
                  <a onClick={toggleSignUp}>로그인 하기</a>
                </div>
              </SecondaryArea>
            ) : (
              <SecondaryArea>
                <div>
                  <p>👇 비밀번호를 잊으셨나요? 👇</p>
                  <a>비밀번호 찾기</a>
                </div>
                <div>
                  <p>👇 아직 계정이 없으신가요? 👇</p>
                  <a onClick={toggleSignUp}>회원가입</a>
                </div>
              </SecondaryArea>
            )}
          </InnerPane>
        </RightPane>
      </SplitScreen>
    </div>
  );
};

export default SignIn;
