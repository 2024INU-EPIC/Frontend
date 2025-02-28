// PassageBody.tsx
import styled from "styled-components";

const Wrapper = styled.div`
  width: 87.5rem;
  height: 35.5rem;
  margin-top: -2rem;
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
  img {
    max-width: 100%;
    max-height: 27.5rem;
  }
`;

type PassageBodyProps = {
  imageSrc?: string;
  questionNum: number;
  totalQuestions: number;
};

const PassageBody: React.FC<PassageBodyProps> = ({
  imageSrc,
  questionNum,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="question">
        Question {questionNum} of {totalQuestions}
      </p>
      <div className="content">
        <img src={imageSrc} alt="Question Image" />
      </div>
    </Wrapper>
  );
};

export default PassageBody;
