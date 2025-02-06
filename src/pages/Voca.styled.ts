import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100vh;
  padding-top: 6.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const MainContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AreaTitle = styled.h2`
  color: black;
  font-family: "inter";
  font-size: 2rem;
  font-weight: 600;
`;

export const HighlightText = styled.span`
  color: #ff5151;
`;

export const PhonemeArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PhonemeTabArea = styled.div`
  width: 31.75rem;
  height: 42.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 2.25rem;
  background: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.25);
`;

export const PhonemeTab = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 27.5rem;
  height: 4.75rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background-color: ${({ isActive }) => (isActive ? "#EA5A47" : "white")};
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.3);
`;

export const PhoneticAlpha = styled.div<{ isActive?: boolean }>`
  margin: 0 0 0.5rem 1.75rem;
  color: ${({ isActive }) => (isActive ? "white" : "#FF5151")};
  font-family: Inter;
  font-size: 2.5rem;
  font-weight: 600;
`;

export const IPA = styled.span<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? "white" : "#FF5151")};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const ExampleWord = styled.div<{ isActive?: boolean }>`
  align-self: flex-end;
  margin: 0 1.3rem 1rem 0;
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  text-align: right;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 300;
`;
export const WordArea = styled.div`
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WordCard = styled.div`
  width: 63.75rem;
  height: 27.5rem;
  display: flex;
  justify-content: space-between;
  border-radius: 2rem;
  background: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.25);
`;

export const GuideMessage = styled.div`
  width: 63.75rem;
  height: 3.75rem;
  position: absolute;
  transform: translateY(635%);
  border-radius: 0rem 0rem 2rem 2rem;
  background: #ea5a47;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const CardStart = styled.div`
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardMid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CardEnd = styled.div`
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const WordText = styled.div`
  color: #000;
  text-align: center;
  font-family: "M PLUS 1";
  font-size: 4rem;
  font-weight: 700;
`;
export const SentenceText = styled.div`
  color: #000;
  text-align: center;
  font-family: "M PLUS 1";
  font-size: 3rem;
  font-weight: 700;
`;

export const WordIPA = styled.div`
  color: #000;
  text-align: center;
  font-family: "inter";
  font-size: 2rem;
  font-weight: 700;
`;

export const SentenceIPA = styled.div`
  color: #000;
  text-align: center;
  font-family: "inter";
  font-size: 2rem;
  font-weight: 400;
`;

export const MoveButton = styled.button`
  border: 0;
  background-color: transparent;
`;

export const ListenButton = styled.button`
  position: absolute;
  transform: translateY(-300%);
  margin: 3rem 0 0 0;
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  border: 0;
  background-color: transparent;
`;

export const ButtonText = styled.p`
  position: absolute;
  transform: translateY(-350%);
  margin: 0;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
`;

export const PracticeArea = styled.div`
  margin-top: 2.56rem;
  width: 63.75rem;
  height: 12.5rem;
  border-radius: 2rem;
  background: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.25);
`;

export const PracticeBefore = styled.div`
  height: 100%;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ea5a47;

  color: white;
  text-align: center;
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const PracticeAfter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ScoreArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 11rem;
  height: 12.5rem;
  border-radius: 2rem 0rem 0rem 2rem;
  border-right: 1px solid #b9b9b9;
  background: white;

  color: #000;
  text-align: center;
  font-family: "M PLUS 1";
  font-size: 2rem;
  font-weight: 700;
`;

export const ScoreText = styled.div<{ score?: number }>`
  margin-bottom: 2rem;
  color: ${(props) => {
    if (props.score !== undefined) {
      if (props.score >= 80) return "#59BED4"; // 80~100
      if (props.score >= 60) return "#FF9D00"; // 60~79
      return "#FF5151"; // 0~59
    }
    return "black";
  }};
  font-family: "M PLUS 1";
  font-size: 3rem;
  font-weight: 700;
`;

export const WordDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #59bed4;
  text-align: center;
  font-family: "M PLUS 1";
  font-size: 3rem;
  font-weight: 700;
`;

export const SentenceDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-family: "M PLUS 1";
  font-size: 2.25rem;
  font-weight: 700;
`;

export const WordTable = styled.table`
  width: 31rem;
  table-layout: fixed;
  border-radius: 1.25rem;
  border: 1px solid White;
  background: white;

  color: white;
  text-align: center;
  font-family: "Inter";
`;

export const TablePHead = styled.th`
  height: 2.5rem;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-top-left-radius: 1.25rem;
  background: #ff7b7b;

  font-size: 1rem;
  font-weight: 700;
`;

export const TableSHead = styled.th`
  height: 2.5rem;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  background: #fba9a9;
  border-bottom-left-radius: 1.25rem;
  font-size: 1rem;
  font-weight: 700;
`;

export const TablePData = styled.td<{ value?: string }>`
  height: 2.5rem;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  background: #f0f0f0;

  color: ${(props) =>
    props.value === "ʊ" || props.value === "o" ? "#FF5151" : "black"};
  font-size: 1.5rem;
  font-weight: 700;
  &:last-child {
    border-top-right-radius: 1.25rem;
  }
`;

export const TableSData = styled.td<{ score?: number }>`
  height: 2.5rem;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  background: #f0f0f0;

  color: ${(props) => {
    if (props.score !== undefined) {
      if (props.score >= 80) return "#59BED4"; // 80~100
      if (props.score >= 60) return "#FF9D00"; // 60~79
      return "#FF5151"; // 0~59
    }
    return "black";
  }};

  font-size: 1rem;
  font-weight: 700;
  &:last-child {
    border-bottom-right-radius: 1.25rem;
  }
`;

export const WordButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2rem 0 0;

  p {
    color: black;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-weight: 700;
    margin: 0.75rem 0 0 0;
  }
`;

export const RecordButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 3.125rem;
    height: 3.125rem;
  }
  path {
  }
`;
