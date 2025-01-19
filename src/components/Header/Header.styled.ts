import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  height: 6.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  z-index: 1000;
  box-shadow: 8px 16px 16px 0px rgba(0, 0, 0, 0.25);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  height: 100%;

  img {
    margin: 1.63rem 0rem 1.63rem 2.5rem;
    height: 3rem;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const UserName = styled.span`
  font-family: Vibur;
  font-size: 2.5rem;
  font-weight: 400;
  color: black;
`;

export const UserIconContainer = styled.div`
  display: flex;
  cursor: pointer;

  svg {
    width: 3.75rem;
    height: 3.75rem;
    margin: 2rem 1.25rem 2rem 1.25rem;
    fill: #ff5151;
  }
`;

export const DropdownMenu = styled.div`
  margin: 5.5rem 0rem 0rem -4.5rem;
  display: flex;
  width: 9.5rem;
  height: 11.75rem;
  position: absolute;
  background-color: white;
  border-radius: 1rem;
  border: 0.25px solid #b4b4b4;
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
  flex-direction: column;
  z-index: 100;
`;

export const DropdownItem = styled.a`
  text-decoration: none;
  font-family: Inter;
  text-align: center;
  color: #7f7f7f;
  font-size: 1rem;
  font-weight: 400;
  padding: 1.25rem;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    border-bottom: 1px solid #7f7f7f;
  }

  &:hover {
    font-weight: 600;
    color: #ea5a47;
  }
`;
