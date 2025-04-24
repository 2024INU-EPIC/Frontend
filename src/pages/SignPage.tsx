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
import axios from "axios";

const SignIn: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !passwordConfirm || !name) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        id: null,
        username: name,
        password1: password,
        password2: passwordConfirm,
        email: email,
        user_level: null,
        last_tested_at: null,
      });

      alert("회원가입 성공: " + response.data.message); // created
      setIsSignUp(false); // 로그인 화면으로 전환
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      alert(
        "회원가입 실패: " + (error.response?.data?.message || error.message),
      );
    }
  };

  const handleSignIn = async () => {};

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
              <input
                placeholder="example@company.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <img src={emailIcon} />
            </InputArea>
            {isSignUp ? (
              <InputArea>
                <input
                  placeholder="사용자 닉네임 (영문)"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <img src={userIcon} />
              </InputArea>
            ) : null}
            <form>
              <InputArea>
                <input
                  placeholder="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
                <img src={passwordIcon} />
              </InputArea>
            </form>
            {isSignUp ? (
              <form>
                <InputArea>
                  <input
                    placeholder="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                  <img src={passwordIcon} />
                </InputArea>
              </form>
            ) : null}
            <SignButton onClick={isSignUp ? handleSignUp : handleSignIn}>
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
