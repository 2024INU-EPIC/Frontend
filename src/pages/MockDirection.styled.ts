import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  padding-top: 6.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #000;
    font-family: "Noto Sans HK";
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const DirectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 81.5rem;
  min-height: 7.5rem;
  padding: 0 3rem 0 3rem;
  margin-bottom: 1rem;

  background: #fff;
  border-radius: 1rem;
  box-shadow: 4px 4px 16px 6px rgba(0, 0, 0, 0.25);

  color: #000;
  font-family: "Roboto";
  font-size: 1.45rem;
  font-weight: 400;
  line-height: 3rem;
  p {
    margin: 0.5rem 0 0.5rem 0;
  }
`;

export const DirectionTable = styled.table`
  width: 87.5rem;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  border: 1px solid #b9b9b9;
  margin-bottom: 1rem;

  thead {
    height: 4rem;
    background: #f0f0f0;
    color: #000;
    text-align: center;
    font-family: "Inter";
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 130%;
    th:first-child {
      width: 18.75rem;
      border-top-left-radius: 1rem;
    }
    th:last-child {
      border-top-right-radius: 1rem;
    }
  }
  tbody {
    background: #fff;
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.25rem;
    font-weight: 400;
    td {
      height: 4rem;
    }
  }
  tr:last-child {
    td:first-child {
      border-bottom-left-radius: 1rem;
    }
    td:last-child {
      border-bottom-right-radius: 1rem;
    }
  }
  ul {
    list-style-position: inside;
    padding-left: 0;
    margin: 0;
  }
`;

export const LearnButton = styled.button`
  width: 25rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6.25rem;
  background: #ff7b7b;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
    fill: white;
  }

  span {
    color: white;
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    margin-left: 2.5rem;
  }
`;
