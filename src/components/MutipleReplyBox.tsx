import styled from "styled-components";
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
  min-height: 36rem;
  margin: 3rem 0 -1.5rem 0;
  background-color: #ffffff;
  border-radius: 1rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  display: flex;
  flex-direction: column;
  align-items: center;

  div.questionInfo {
    margin-top: 3rem;
    margin-bottom: 1.875rem;
    display: flex;
    flex-direction: column;

    p {
      margin: 0.75rem 0;
      font-size: 2rem;
      font-weight: bold;
    }

    div {
      font-size: 2rem;
      font-weight: normal;
    }
  }

  p.subtitle {
    margin: 2.25rem 0 1.5rem 0;
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
    margin: 0;
  }

  div.gpt {
    position: relative;
    margin: 2rem 0 2rem 0;
    width: 78.25rem;
    height: 12rem;
    border-radius: 1.25rem;
    background: #d9d9d9;
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin: 1rem;
  }

  p.feedback {
    position: relative;
    margin: 1.5rem 1rem 1rem 0rem;
    color: black;
    font-family: Roboto;
    font-size: 1.5rem;
    font-weight: 400;
    overflow-y: scroll;
  }
`;

type ReplyBodyProps = {
  questionNum: number;
  questionText: string;
  contentText: string;
  isScoring: boolean;
};

const MultipleReplyBody: React.FC<ReplyBodyProps> = ({
  questionNum,
  questionText,
  contentText,
  isScoring,
}) => {
  return (
    <Wrapper>
      <div className="questionInfo">
        <p>Question {questionNum}.</p>
        <div>{questionText}</div>
      </div>
      <p className="subtitle">Your Response</p>
      <div>
        <p className="paragraph">{highlightText(contentText, isScoring)}</p>
      </div>
      <div className="gpt">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none">
          <path
            d="M13.0881 17.0305L6.63477 13.2305V6.5638C6.63477 3.61714 9.0681 1.23047 12.0694 1.23047C13.9321 1.23047 15.5761 2.15047 16.5561 3.5518"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.2275 22.8034C10.7287 23.5524 11.4073 24.1659 12.2028 24.5893C12.9984 25.0126 13.8863 25.2328 14.7875 25.23C17.7875 25.23 20.2222 22.8434 20.2222 19.8967V13.23L13.6409 9.35938"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0303 15.2309V7.45754L15.9129 4.1242C18.5129 2.65087 21.8369 3.5242 23.3383 6.07487C23.7981 6.85246 24.049 7.7357 24.0667 8.63888C24.0845 9.54205 23.8685 10.4345 23.4396 11.2295"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.41492 15.231C2.98586 16.0259 2.7696 16.9183 2.78712 17.8215C2.80464 18.7246 3.05535 19.6079 3.51492 20.3856C5.01626 22.9363 8.34159 23.8096 10.9416 22.3376L16.8243 19.0043L16.9523 11.543"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.2227 20.737C21.1316 20.7019 22.0172 20.44 22.7989 19.9751C23.5807 19.5103 24.2338 18.8574 24.6987 18.0757C26.1987 15.525 25.3081 12.2624 22.7094 10.7904L16.8254 7.45703L10.0801 11.1304"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.63446 5.72461C5.7254 5.75955 4.83953 6.02136 4.05752 6.48619C3.27551 6.95101 2.62222 7.60409 2.15712 8.38594C0.655791 10.9366 1.54646 14.1993 4.14646 15.6713L10.0305 19.0046L16.7611 15.3379"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div>
          <p className="feedback">
            Welcome to the Boston International Airport. Your check-in process
            will take ten to fifteen minutes. In order to speed up the process,
            please have your identification and boardingpass ready as you
            approach the counter. Also, please make sure your luggage is labeled
            with your name, address and telephone number. Welcome to the Boston
            International Airport. Your check-in process will take ten to
            fifteen minutes. In order to speed up the process, please have your
            identification and boardingpass ready as you approach the counter.
            Also, please make sure your luggage is labeled with your name,
            address and telephone number.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default MultipleReplyBody;
