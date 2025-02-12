import styled from "styled-components";
export const mainContainer = styled.div`
  width: 100%;
  padding-top: 6.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const userRank = styled.div`
  width: 100%;
  height: 21.25rem;
  background: #ff5151;
  img {
    padding: 4.25rem 0 0 2.5rem;
  }
`;
export const userRankText = styled.h1`
  color: white;
  text-align: right;
  font-family: "M PLUS 1";
  font-size: 3.75rem;
  font-weight: 700;
  margin: -1.5rem 2.5rem 0 0;
  z-index: 10;
`;

export const midContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const learnStat = styled.div`
  width: 75rem;
  height: 25rem;
  border-radius: 2rem;
  background: white;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25));
  margin: 3.25rem 5.5rem 2.5rem 5.5rem;
  display: flex;
  flex-direction: row;
`;

export const statText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 3rem 7.5rem 0 4rem;
`;

export const statGraph = styled.div`
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const dailyWord = styled.div`
  width: 30rem;
  height: 14.25rem;
  border-radius: 2rem;
  background: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.25);
  margin: 3.25rem 3.5rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
`;
export const changeWord = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.625rem;
    height: 1.625rem;
    fill: black;
    position: absolute;
    transform: translateX(500%);
  }
`;

export const wordPhoneme = styled.div`
  display: flex;
  font-size: 1rem;
`;

export const wordMean = styled.div`
  margin-top: 0.5rem;
  display: flex;
  font-size: 1.25rem;
`;

export const learnButton = styled.button`
  display: flex;
  width: 29.5rem;
  height: 6.5rem;
  border: none;
  border-radius: 6.25rem;
  background: #ff7b7b;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  svg {
    width: 2.5rem;
    height: 2.5rem;
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

export const botContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 6.5rem 0 10rem 0;
`;

export const learnCard = styled.div`
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25));
`;

export const cardImg = styled.div`
  width: 33.75rem;
  height: 32.5rem;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${learnCard}:nth-child(1) & {
    background: #ffde83;
  }

  ${learnCard}:nth-child(2) & {
    background: #cce5ff;
  }

  ${learnCard}:nth-child(3) & {
    background: #ccffcc;
  }

  img {
    width: 22.5rem;
    height: 23.75rem;
  }
`;

export const cardExp = styled.div`
  width: 33.75rem;
  height: 12.5rem;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    font-size: 1.75rem;
    margin-top: 3rem;
  }
  div {
    width: 20rem;
  }
`;
