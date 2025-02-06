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
  gap: 2rem 1.5rem;
  margin: 2.625rem 0;
`;

// 점수 줄 (각 항목)
export const ScoreRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 3.75rem;
`;

// 점수 라벨 (이름)
export const ScoreLabel = styled.div`
  display: flex;
  width: 8rem; // 128px

  p {
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

// 바 차트 컨테이너
export const ScoreBarContainer = styled.div`
  /* flex: 1;  what's this? */
  width: 25rem;
  height: 1.75rem;
  background: #d9d9d9;
  border-radius: 1.25rem; //20px
  /* position: relative; */
  overflow: hidden;
`;

// 바 차트 (점수값에 따라 길이 조정)
export const ScoreBar = styled.div<{ width: number; color: string }>`
  width: ${(props) => props.width}%;
  /* width: 0%; */
  height: 100%;
  background: ${(props) => props.color};
  border-radius: 1.25rem; //20px
  transition: width 1s ease-in-out;
`;
