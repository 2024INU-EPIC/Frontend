import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 112.5rem;
  max-height: 80%;
  display: flex;
  flex-direction: column;
`;

export const ModalTitleArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 1rem 0 0 1.5rem;
  font-size: 2rem;
  font-weight: 700;
`;

export const ModalCloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  margin: 1rem 1rem 0 0;
  border: none;
  background-color: white;
  &:hover {
    opacity: 0.9;
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 60%;
`;

export const PartArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    width: 100%;
    align-self: flex-start;
    text-align: left;
    font-size: 2rem;
    font-weight: 700;
    padding: 0 0 0.5rem 1.5rem;
    border-bottom: solid #b9b9b9 0.125rem;
  }
`;

export const QuestionBox = styled.div`
  width: 87.5rem;
  height: 22rem;
  border-radius: 1rem;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 4px 16px 6px rgba(0, 0, 0, 0.25);
  margin: 1rem 0 10rem 0;
`;

export const QuestionTitle = styled.div`
  margin: 2rem;
  font-family: Roboto;
  font-size: 1.75rem;
  font-weight: 700;
`;

export const QuestionText = styled.div`
  padding: 0 3rem 0 3rem;
  font-family: Roboto;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  text-align: start;
`;
