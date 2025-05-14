// NavigationBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/loopit.logo.png';

const Nav = styled.nav`
  background-color: #fff8ed;
  border-bottom: 1px solid #f0e6d2;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Title = styled(Link)`
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  color: #2e2e2e;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #444;
  font-weight: 500;
  &:hover {
    color: #007bff;
  }
`;

const Username = styled.span`
  color: #777;
  margin-left: 12px;
`;

const NavigationBar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <Nav>
      <Left>
        <LogoImg src={logo} alt="LoopIt Logo" />
        <Title to="/products">LoopIt</Title>
      </Left>
      <NavLinks>
        <StyledLink to="/main">홈</StyledLink>
        <StyledLink to="/products/new">상품 등록</StyledLink>
        <StyledLink to="/my-products">내 상품</StyledLink>
        {isLoggedIn ? (
          <>
            {username && <Username>{username}님</Username>}
            <StyledLink as="button" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              로그아웃
            </StyledLink>
          </>
        ) : (
          <StyledLink to="/login">로그인</StyledLink>
        )}
      </NavLinks>
    </Nav>
  );
};

export default NavigationBar;