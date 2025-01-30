import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalCloseButton,
  ModalTitleArea,
  PartArea,
  QuestionBox,
  QuestionTitle,
  QuestionText,
} from "./ExamModal.styled";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDate: string | null;
}

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
            <p>Part1</p>
            <QuestionBox>
              <QuestionTitle>Question 1 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
            <QuestionBox>
              <QuestionTitle>Question 2 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
          </PartArea>
          <PartArea>
            <p>Part2</p>
            <QuestionBox>
              <QuestionTitle>Question 3 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
            <QuestionBox>
              <QuestionTitle>Question 4 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
          </PartArea>
          <PartArea>
            <p>Part3</p>
            <QuestionBox>
              <QuestionTitle>Question 5 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
            <QuestionBox>
              <QuestionTitle>Question 6 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
            <QuestionBox>
              <QuestionTitle>Question 7 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
          </PartArea>
          <PartArea>
            <p>Part4</p>
            <QuestionBox>
              <QuestionTitle>Question 8 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
            <QuestionBox>
              <QuestionTitle>Question 9 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
            <QuestionBox>
              <QuestionTitle>Question 10 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
          </PartArea>
          <PartArea>
            <p>Part5</p>
            <QuestionBox>
              <QuestionTitle>Question 11 of 11</QuestionTitle>
              <QuestionText>
                Welcome to the Boston International Airport. Your check-in
                process will take ten to fifteen minutes. In order to speed up
                the process, please have your identification and boardingpass
                ready as you approach the counter. Also, please make sure your
                luggage is labeled with your name, address and telephone number.
              </QuestionText>
            </QuestionBox>
          </PartArea>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExamModal;
