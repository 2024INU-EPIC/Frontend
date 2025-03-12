// PassageBody.tsx
import styled from "styled-components";

// 특정 단어를 하이라이트하는 함수
export function highlightText(text: string, isScoring: boolean) {
  if (!isScoring) return text; // 점수 출력 상태가 아니면 원본 텍스트 그대로 출력

  const words = text.split(" "); // 단어별로 분리
  return words.map((word, index) => {
    if (word.includes("International")) {
      return (
        <RedHighlight key={index}>
          {word}
          <Tip>
            {word} : <ScoreText score={56}>56</ScoreText>
          </Tip>
        </RedHighlight>
      );
    } else if (word.includes("identification")) {
      return (
        <OrangeHighlight key={index}>
          {word}
          <Tip>
            {word} : <ScoreText score={75}>75</ScoreText>
          </Tip>
        </OrangeHighlight>
      );
    } else if (word.includes("luggage")) {
      return (
        <RedHighlight key={index}>
          {word}
          <Tip>
            {word} : <ScoreText score={43}>43</ScoreText>
          </Tip>
        </RedHighlight>
      );
    }
    // 원래 단어 그대로 반환
    // return ` ${word} `;
    return <span key={index}>{` ${word} `}</span>; // 원래 단어 그대로 변환
  });
}

export const Tip = styled.span`
  position: absolute;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 0.75rem 1.5rem;

  // span이라 width, height가 자동으로 조절됨
  white-space: nowrap; // 줄바꿈 X
  display: inline-block;
  font-size: 1.25rem;
  color: black;

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

  /* display: none; */
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out; /* 등장 + 사라짐 애니메이션 */
`;

// 점수에 따라 Tip에 들어가는 글자색을 동적으로 변경하는 span 컴포넌트
export const ScoreText = styled.span<{ score: number }>`
  color: ${(props) =>
    props.score < 60 ? "#ff5151" : "#ff9d00"}; /* 0~59: 빨강, 60~79: 주황 */
  font-weight: bold;
`;

// 빨간색 하이라이트 (틀린 단어)
export const RedHighlight = styled.span`
  position: relative;

  background-color: #ff5151;
  color: white;
  text-decoration: underline;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;

  &:hover > ${Tip} {
    visibility: visible;
    opacity: 1;
  }
`;

// 주황색 하이라이트 (부분 점수)
export const OrangeHighlight = styled.span`
  position: relative;

  background-color: #ff9d00;
  color: white;
  text-decoration: underline;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;

  &:hover > ${Tip} {
    visibility: visible;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 87.5rem;
  height: 25rem;
  /* margin-top: 9.625rem; */
  background-color: #ffffff;
  border-radius: 1rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  display: flex;
  flex-direction: column;
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
    position: relative;
    font-size: 2rem;
    font-weight: 400;
    line-height: 3rem; // 48px
    text-align: left;
    /* display: inline-block; */
  }
`;

type PassageBodyProps = {
  text: string;
  isScoring: boolean;
  questionNum: number;
  totalQuestions: number;
  fromPartSelect?: boolean;
  questionCount: number;
  partId?: string;
};

const PassageBody: React.FC<PassageBodyProps> = ({
  text,
  isScoring,
  questionNum,
  totalQuestions,
  fromPartSelect = false,
  questionCount,
  partId = "Part",
}) => {
  return (
    <Wrapper>
      <p className="question">
        {fromPartSelect
          ? `Question ${questionCount} of ${partId}`
          : `Question ${questionNum} of ${totalQuestions}`}
      </p>
      <div>
        <p className="paragraph">{highlightText(text, isScoring)}</p>
      </div>
    </Wrapper>
  );
};

export default PassageBody;
