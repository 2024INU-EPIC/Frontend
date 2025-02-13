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

export const CardArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const GuideMessage = styled.h2`
  margin: 7.5rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  color: #ff5151;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  span {
    font-size: 2rem;
  }
`;

export const PartCard = styled.div`
  width: 22rem;
  height: 31.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1.25rem;
  border: 5px solid #000;
  background: white;
  filter: drop-shadow(0px 30px 10px rgba(0, 0, 0, 0.25));

  color: black;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;

  &:hover {
    transition:
      transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    transform: translateY(-2rem);
  }

  &.selected {
    background: #ff5151;
    color: white;
    path {
      fill: white;
    }
  }

  p:first-child {
    margin: 2.5rem 0 2rem 0;
    font-size: 2.5rem;
  }

  .two {
    margin: 1.4rem 0 1.3rem 0;
  }
  p {
    margin: 2.5rem 0 0 0;
  }
  svg {
    margin: 0.5rem 0 0 0;
  }
`;

export const TimeArea = styled.div`
  margin: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PartTime = styled.table`
  text-align: left;
  td {
    padding: 0;
    font-size: 1.5rem;
  }
`;

export const LearnButton = styled.button`
  margin-top: 5.3rem;
  width: 29.5rem;
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6.25rem;
  background: #bcbcbc;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: white;
  }

  span {
    color: white;
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    margin-left: 2.5rem;
  }

  &.active {
    background: #ff5151;
    cursor: pointer;
  }
`;
