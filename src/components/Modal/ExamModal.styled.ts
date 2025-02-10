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

  max-height: 90%; // 기존 80%
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
  overflow-x: hidden;
  max-height: 60%;
`;

export const PartArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p.partInfo {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    align-self: flex-start;

    text-align: left;
    font-size: 2rem;
    font-weight: 700;
    padding: 0 0 0 1.5rem;
    /* padding: 0 0 0.5rem 1.5rem; */
    border-bottom: solid #b9b9b9 0.125rem;
    /* background-color: gray; */
    background-color: white; // 배경색이 없으면 투명해서 안되는 것처럼 보임

    position: sticky;
    top: 0; // 최상단에 도달하면 멈춤
    z-index: 10;
    margin: 0;
  }
`;

// 여기부터 새로 만듦
export const ResultArea = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 12rem;
`;
