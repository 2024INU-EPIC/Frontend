import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalCloseButton,
  ModalTitleArea,
  PartArea,
  ResultArea,
} from "./ExamModal.styled";
import PassageBody from "../PassageBody";
import ScoreBody from "../ScoreBody";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDate: string | null;
}

const textContent =
  "Welcome to the Boston International Airport. Your check-in process will take ten to fifteen minutes. In order to speed up the process, please have your identification and boardingpass ready as you approach the counter. Also, please make sure your luggage is labeled with your name, address and telephone number.";

const ExamModal: React.FC<ExamModalProps> = ({ isOpen, onClose, examDate }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitleArea>
          <ModalTitle>{examDate} 1회차 모의고사 &nbsp; &nbsp; IM1 </ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M10.6663 31.6663L8.33301 29.333L17.6663 19.9997L8.33301 10.6663L10.6663 8.33301L19.9997 17.6663L29.333 8.33301L31.6663 10.6663L22.333 19.9997L31.6663 29.333L29.333 31.6663L19.9997 22.333L10.6663 31.6663Z"
                fill="black"
              />
            </svg>
          </ModalCloseButton>
        </ModalTitleArea>
        <ModalContent>
          <PartArea>
            <div></div>
            <p className="partInfo">Part1</p>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={1}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={2}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
          </PartArea>
          <PartArea>
            <p className="partInfo">Part2</p>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={3}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={4}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
          </PartArea>
          <PartArea>
            <p className="partInfo">Part3</p>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={5}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={6}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={7}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
          </PartArea>
          <PartArea>
            <p className="partInfo">Part4</p>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={8}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={9}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={10}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
          </PartArea>
          <PartArea>
            <p className="partInfo">Part5</p>
            <ResultArea>
              <PassageBody
                text={textContent}
                isScoring={true}
                questionNum={11}
                totalQuestions={11}
              />
              <ScoreBody
                totalScore={86}
                accuracy={80}
                completeness={60}
                fluency={85}
                prosody={70}
              />
            </ResultArea>
          </PartArea>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExamModal;
