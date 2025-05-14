// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  background: #fffef9;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 14px;
  background-color: #f39c12;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e67e22;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const SubText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #555;
`;

const SubButton = styled.button`
  margin-top: 8px;
  background: none;
  border: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      alert('로그인 성공!');
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('username', response.data.user?.username || '');
      navigate('/main');
    } catch (err) {
      setErrorMsg('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">로그인</Button>
        {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      </Form>

      <SubText>아직 회원이 아니신가요?</SubText>
      <SubButton onClick={goToRegister}>회원가입하러 가기</SubButton>
    </Container>
  );
};

export default LoginPage;