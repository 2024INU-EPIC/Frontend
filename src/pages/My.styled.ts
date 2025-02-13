import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100vh;
  padding-top: 6.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const UserName = styled.div`
  position: sticky;
  width: 100%;
  height: 17.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  background: #ff5151;
  svg {
    width: 11rem;
    height: 11rem;
    margin-left: 4.4rem;
    flex-shrink: 0;
  }
`;

export const UserNameText = styled.h1`
  color: white;
  text-align: center;
  font-family: "M PLUS 1";
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  margin: 6rem 0 0 2.8rem;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const SideBar = styled.div`
  position: sticky;
  width: 15.75rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid black;
  a {
    color: black;
    text-align: center;
    font-family: "Noto Sans KR", serif;
    font-size: 1.25rem;
    text-decoration: none;
    font-weight: normal;
    margin: 2.45rem;

    &:hover {
      font-weight: bold;
    }
    &.active {
      font-weight: bold;
    }
  }
`;

export const MainArea = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const LearnStat = styled.div`
  width: 75rem;
  height: 25rem;
  border-radius: 2rem;
  background: white;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25));
  margin: 3.25rem 5.5rem 2.5rem 5.5rem;
  display: flex;
  flex-direction: row;
`;

export const StatText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 3rem 7.5rem 0 4rem;
`;

export const StatGraph = styled.div`
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExamRecord = styled.div`
  width: 81rem;
  height: 21rem;
  border-radius: 1.25rem;
  background: white;
  filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.25));
  margin: 3.25rem 5.5rem 2.5rem 5.5rem;
  display: flex;
  flex-direction: row;
  margin: 3.6rem 0 -1rem 0;
`;

export const ScoreaArea = styled.div`
  width: 15.75rem;
  height: 21rem;
  border-radius: 1.25rem 0rem 0rem 1.25rem;
  border-right: 1px solid #8a8a8a;
`;

export const ExamDate = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0 3rem 0;
`;

export const ExamScoreText = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ExamScore = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 4rem;
  font-weight: bold;
`;

export const ExamGraph = styled.div`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileArea = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: -1rem 0 0 3rem;
`;

export const PassText = styled.div`
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.25rem;
  font-weight: 400;
  margin: 3rem 0 0 0;
`;

export const InputArea = styled.div`
  width: 33.5rem;
  height: 3.5rem;
  background-color: white;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  input {
    border: none;
    width: 23.5rem;
    margin: 0 0 0 1.5rem;
    background-color: transparent;
    font-size: 1rem;
  }
`;

export const PassButton = styled.button`
  width: 12rem;
  height: 3.25rem;
  border-radius: 0.625rem;
  margin-top: 4rem;
  background: #ff5151;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.25rem;
  font-weight: 400;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  width: 40.5rem;
  height: 26rem;
  background-color: white;
  border-radius: 1.25rem;
  box-shadow: 0px 20px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const PopupTitle = styled.h3`
  margin: 2.75rem 0 0 0;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  font-family: "Noto Sans KR", serif;
  font-size: 2rem;
`;

export const PopupText = styled.div`
  margin: 4.5rem 0 3.7rem 0;
  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 2rem;
  font-weight: 400;
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const PopupButton = styled.button<{ primary?: boolean }>`
  width: 8rem;
  height: 4.5rem;
  border: none;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ primary }) => (primary ? "#ff4d4f" : "#a4a4a4")};

  text-align: center;
  font-family: "Noto Sans KR", serif;
  font-size: 1.5rem;
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;
