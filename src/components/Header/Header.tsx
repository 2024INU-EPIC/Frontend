import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./Header.styled";
import Logo from "../../assets/img/logo.svg";
import axios from "axios";
import { useUserStore } from "../../stores/userStore";
import { useAuthStore } from "../../stores/authStore";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { name } = useUserStore();
  const toggleDropdown = (isOpen: boolean) => {
    setDropdownOpen(isOpen);
  };
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      sessionStorage.clear();
      clearAuth();
      clearUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <S.HeaderContainer>
      {/* 로고 */}
      <S.LogoContainer>
        <Link to="/">
          <img src={Logo} alt="MyApp Logo" />
        </Link>
      </S.LogoContainer>

      {/* 유저 정보 */}
      <S.UserContainer>
        <S.UserName>Hi, {name}! 😊</S.UserName>
        <S.UserIconContainer
          onMouseEnter={() => toggleDropdown(true)}
          onMouseLeave={() => toggleDropdown(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <path d="M30 11.25C32.4864 11.25 34.871 12.2377 36.6291 13.9959C38.3873 15.754 39.375 18.1386 39.375 20.625C39.375 23.1114 38.3873 25.496 36.6291 27.2541C34.871 29.0123 32.4864 30 30 30C27.5136 30 25.129 29.0123 23.3709 27.2541C21.6127 25.496 20.625 23.1114 20.625 20.625C20.625 18.1386 21.6127 15.754 23.3709 13.9959C25.129 12.2377 27.5136 11.25 30 11.25ZM30 34.6875C40.3594 34.6875 48.75 38.8828 48.75 44.0625V48.75H11.25V44.0625C11.25 38.8828 19.6406 34.6875 30 34.6875Z" />
          </svg>
          {isDropdownOpen && (
            <S.DropdownMenu>
              <S.DropdownItem href="/mypage">My Page</S.DropdownItem>
              <S.DropdownItem onClick={handleLogout}>Sign Out</S.DropdownItem>
              <S.DropdownItem href="/aboutus">About Us</S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.UserIconContainer>
      </S.UserContainer>
    </S.HeaderContainer>
  );
};

export default Header;
