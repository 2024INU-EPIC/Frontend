import styled from "styled-components";

type TimeIndicatorProps = { bgColor?: string };

export const ContentBody = styled.div`
  width: 87.5rem;
  height: 25rem;
  margin-top: 9.625rem;
  background-color: #ffffff;
  border-radius: 1rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  p.question {
    margin: 2.25rem 0 1.75rem 0;
    font-size: 2rem;
    font-weight: bold;
  }

  div {
    width: 79rem;
    display: flex;
  }

  p.paragraph {
    font-size: 2rem;
    font-weight: lighter;
  }
`;

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

  // props에 따라 배경색 변경. true이면
  background-color: ${(props) => props.bgColor || "#ff7b7b"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimeInfoText = styled.p`
  font-size: 1.5rem;
`;
