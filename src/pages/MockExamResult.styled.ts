import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  padding-top: 6.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: row;
  text-align: start;
  align-items: center;
  justify-content: start;
  padding-left: 3.5rem;

  background: #ff5151;
  color: #fff;
  text-align: center;
  font-family: "Roboto";
  font-size: 2rem;
  font-weight: 700;
`;

export const SubTitleContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  text-align: start;
  align-items: center;
  justify-content: start;
  padding-left: 3.5rem;

  color: black;
  font-family: "Roboto";
  font-size: 1.5rem;
  font-weight: 700;
`;

export const GradeContainer = styled.div`
  width: 100%;
  height: 21rem;
  background: #f8f8f8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const GradeArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  justify-content: center;
  align-items: center;
  border-right: solid #8a8a8a 1px;
`;

export const GradeTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans HK";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
`;

export const Grade = styled.div`
  color: #000;

  text-align: center;
  font-family: "Noto Sans HK";
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
`;

export const ChartArea = styled.div`
  display: flex;
  height: 19rem;
  margin-right: 10rem;
  padding: 1rem;
`;

export const PartArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
`;

export const Part2Area = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 5rem 0;
`;

export const Part3Area = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 5rem 0;
`;

export const Part4Area = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 5rem 0;
`;

export const FloatingButton = styled.button`
  position: fixed;
  width: 6.25rem;
  height: 6.25rem;
  bottom: 5rem;
  right: 5rem;
  background: #ff7373;
  border-radius: 4rem;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.25);
  border: none;
  color: #fff;

  text-align: center;
  font-family: "Inter";
  font-size: 1.5rem;
  font-weight: 700;

  cursor: pointer;
  z-index: 100;
  transition: background-color 0.2s;

  &:hover {
    background: #ff5151;
  }
`;
