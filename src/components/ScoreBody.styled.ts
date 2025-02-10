import styled from "styled-components";

export const ScoreContainer = styled.div`
  width: 87.5rem;
  height: 19rem;
  display: flex;
  margin-top: 4.5rem;
  border-radius: 1.25rem;
  background-color: white;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  p {
    text-align: left;
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const TotalScoreArea = styled.div`
  width: 23.75rem;
  height: 19rem;
  display: flex;
  flex-direction: column;
  border-right: solid;
  border-right-color: #b9b9b9;
  border-right-width: 0.11rem;
`;

// 컨테이너 제목과 바디 분리용 바디
export const TotalScoreBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

// 왼쪽 원형 점수 컨테이너
export const ScoreCircle = styled.div`
  width: 12.5rem;
  height: 12.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// // 점수 숫자 표시(미사용. 도넛차트에서 따로 텍스트를 구현해버림)
// export const ScoreNumber = styled.div`
//   font-size: 4rem;
//   font-weight: bold;
// `;

// 점수 범례
export const ScoreLegend = styled.div`
  margin: 0 0.5rem 1.5;
  display: flex;
  flex-direction: column-reverse;
  font-size: 1.25rem;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  span {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.5rem;
  }
`;

// 오른쪽 점수 상세 컨테이너
export const ScoreDetailsArea = styled.div`
  width: 63.75rem;
  height: 19rem;
  display: flex;
  flex-direction: column;
`;

export const GridBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1.75rem 1.5rem;
  margin: 1.75rem 0; // 28px 0
`;

// 점수 줄 (각 항목)
export const ScoreRow = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // 60px 각 셀의 높이
  /* height: 3.75rem;  */
  height: 5.25rem;

  /* border: solid black 1px; */
`;

// 점수 라벨 (이름)
export const ScoreLabel = styled.div`
  position: relative;

  display: flex;
  width: 8rem; // 128px
  margin-bottom: 0.25rem;

  p {
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

export const InfoTip = styled.div<{ syllable: number }>`
  position: absolute;

  bottom: 200%;
  // 2음절짜리 점수면 길이가 더 짧으므로 left를 더 짧게 설정
  left: ${(props) => (props.syllable == 2 ? "75%" : "87.5%")};
  transform: translateX(-50%);
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.25rem; // div는 padding에 따라 너비나 높이값이 정해져있어도 조금 늘어난다. 개발자도구에서 확인 가능

  text-align: left;
  font-size: 1rem;
  font-weight: normal;
  color: black;

  width: 27.5rem; // 440px
  height: 6.25rem; // 100px
  border-radius: 1.25rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  z-index: 1;

  &::after {
    content: ""; /* 가상 요소가 보이게 함 */
    position: absolute;
    bottom: -0.9rem; /* 삼각형이 아래쪽에 위치하도록 설정. 얼마나 떨어질 것인지 */
    left: 50%;
    transform: translateX(-50%);

    width: 0;
    height: 0;
    border-left: 0.625rem solid transparent;
    border-right: 0.625rem solid transparent;
    border-top: 1rem solid white; /* 삼각형 위쪽 border를 배경색과 동일하게 지정 */
    /* filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25)); */

    z-index: 2;
  }

  visibility: hidden;
  opacity: 0;
  transition:  /* 등장 + 사라짐 둘 다 애니메이션 */
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;

  p {
    font-weight: normal;
  }
`;

export const InfoImg = styled.img`
  &:hover + ${InfoTip} {
    visibility: visible;
    opacity: 1;
  }
`;

// 바 차트 컨테이너
export const ScoreBarContainer = styled.div`
  width: 25rem;
  height: 1.75rem;
  background: #d9d9d9;
  border-radius: 1.25rem; //20px
  overflow: hidden;
`;

// 바 차트 (점수값에 따라 길이 조정)
export const ScoreBar = styled.div<{ width: number; color: string }>`
  position: relative;

  width: ${(props) => props.width}%;
  height: 100%;
  background: ${(props) => props.color};
  border-radius: 1.25rem; //20px
  transition: width 1s ease-in-out;
`;

export const ScoreValue = styled.div<{ width: number; color: string }>`
  padding-left: ${({ width }) => width / 4 - 0.5}rem;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out 1s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
