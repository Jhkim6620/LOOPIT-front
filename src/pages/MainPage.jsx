import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 80px 20px;
  background-color: #fffdf7;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #2f2f2f;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  padding: 14px 20px;
  background-color: #fff8ed;
  border: 2px solid #f39c12;
  border-radius: 8px;
  color: #5a3e1b;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fdebd0;
    border-color: #e67e22;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>🛍️ LoopIt 메인</Title>
      <ButtonGroup>
        <StyledButton onClick={() => navigate('/products/new')}>상품 등록하기</StyledButton>
        <StyledButton onClick={() => navigate('/products')}>상품 목록 보기</StyledButton>
        <StyledButton onClick={() => navigate('/my-products')}>내 상품 관리</StyledButton>
        <StyledButton onClick={() => navigate('/chat')}>실시간 채팅</StyledButton>
        <StyledButton onClick={() => navigate('/report')}>신고하러 가기</StyledButton>
      </ButtonGroup>
    </Container>
  );
};

export default MainPage;