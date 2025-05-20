// SituationBody.tsx
// 한 가지 상황이나 도표에 대해 3개의 문항이 있는 Part 3, 4에 범용적으로 사용하기 위한 컴포넌트
import styled from "styled-components";

type WrapperProps = { partNum?: number; stage?: string };

const Wrapper = styled.div<WrapperProps>`
  width: 87.5rem; // 1400px
  display: inline-block;
  margin-top: -4rem;
  padding-bottom: 3rem;
  background-color: #ffffff;
  border-radius: 1rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));

  display: flex;
  flex-direction: column;
  align-items: center;

  p.questionInfo {
    margin: 2.25rem 0 1.75rem 0;
    font-size: 2rem;
    font-weight: bold;
  }

  div {
    width: 79rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p.paragraph {
    position: relative;
    font-size: 2rem;
    font-weight: 400;
    line-height: 3rem; // 48px
    text-align: left;
    /* display: inline-block; */
  }
  p.content {
    margin: 0;
    font-size: 2rem;
    line-height: 3rem;
  }

  p.question {
    font-size: 2rem;
    margin-top: 3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

const Part4Question = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 40rem;
    height: 22rem;
  }

  p.content {
    margin: 0;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  p.question {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    align-self: flex-start;
  }
`;

type SituationBodyProps = {
  stage: string;
  partNum: number;
  situationText?: string; // part 3면 공통 상황 dialog를 props로 받아야 함
  questionText: string;
  imageSrc?: string; // part 4면 이미지를 props로 받아야함
  questionNum: number;
  totalQuestions: number;
  fromPartSelect?: boolean;
  questionCount: number;
  partId?: string;
};

const SituationBody: React.FC<SituationBodyProps> = ({
  stage,
  partNum,
  situationText,
  questionText,
  imageSrc,
  questionNum,
  totalQuestions,
  fromPartSelect = false,
  questionCount,
  partId = "Part",
}) => {
  return (
    <Wrapper stage={stage} partNum={partNum}>
      <p className="questionInfo">
        {fromPartSelect
          ? `Question ${questionCount} of ${partId}`
          : `Question ${questionNum >= 5 && questionNum <= 7 ? "5-7" : "8-10"} of ${" "}
        ${totalQuestions}`}
      </p>

      {/* 3번 문항일 경우 상황제시 dialog를 출력하고, 4번 문항일 경우 도표 이미지 출력 */}
      {partNum === 3 ? (
        <div>
          {stage === "situation" || stage === "scoring" ? (
            <p className="content">{situationText}</p>
          ) : (
            <div>
              <p className="content">{situationText}</p>
              <p className="question">Question {questionNum}.</p>
              <p className="content">{questionText}</p>
            </div>
          )}
        </div>
      ) : (
        <Part4Question>
          {stage === "situation" || stage === "scoring" ? (
            <>
              <img src={imageSrc} alt="Question Image" />
              <p className="content">{situationText}</p>
            </>
          ) : (
            <>
              <img src={imageSrc} alt="Question Image" />
              <p className="content">{situationText}</p>
              <p className="question">Question {questionNum}.</p>
              <p className="content">{questionText}</p>
            </>
          )}
        </Part4Question>
      )}
    </Wrapper>
  );
};

export default SituationBody;
