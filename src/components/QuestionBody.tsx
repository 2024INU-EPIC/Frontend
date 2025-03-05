import styled from "styled-components";

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

type QuestionBodyProps = {
  text: React.ReactNode;
  questionNum: number;
  totalQuestions: number;
};

const QuestionBody: React.FC<QuestionBodyProps> = ({
  text,
  questionNum,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="question">
        Question {questionNum} of {totalQuestions}
      </p>
      <div>
        <p className="paragraph">{text}</p>
      </div>
    </Wrapper>
  );
};

export default QuestionBody;
