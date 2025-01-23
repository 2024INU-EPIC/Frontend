import styled from "styled-components";

// SplitScreen: 전체 레이아웃
export const SplitScreen = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;
  justify-content: flex;
  align-items: center;
`;

// LeftPane: 왼쪽 영역
export const LeftPane = styled.div`
  width: 42.29vw; // 812px;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
  font-weight: 100;

  p {
    margin: 2rem 0;
    font-weight: normal;
  }
`;

// WelcomeLogo: 로고 스타일
export const WelcomeLogo = styled.img`
  width: 23.95vw; // 460px;
`;

// RightPane: 오른쪽 영역
export const RightPane = styled.div`
  width: 57.71vw; // 1108px;
  height: 100vh;
  background-color: #ea5a47;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    // margin: 1rem 0;
  }
`;

// InnerPane: 오른쪽 내부 영역
export const InnerPane = styled.div`
  width: 30.5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    font-weight: bold;
    font-size: 3.5rem;
  }
`;

// InputArea: 입력 필드 스타일
export const InputArea = styled.div`
  width: 30.5rem;
  height: 5.5rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  margin: 1.375rem 0;
  border-radius: 3rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  input {
    border: none;
    width: 23.5rem;
    margin: 0 0.5rem 0 2.5rem;
    background-color: transparent;
    font-size: 1.5rem;
  }

  input:focus {
    outline: none;
  }
`;

// SignButton: 로그인 버튼 스타일
export const SignButton = styled.button`
  width: 16.125rem;
  height: 5rem;
  border: none;
  border-radius: 3rem;
  background-color: #fb6e5c;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
  margin: 2.75rem 0 1.5rem 0;

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
`;

// SecondaryArea: 보조 행동 영역 스타일
export const SecondaryArea = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  color: white;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 1.5rem;
  }

  p {
    font-size: 1rem;
    margin: 0.25rem 0.5rem;
    color: black;
  }

  a {
    font-size: 1.25rem;
    margin: 0.1rem;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
