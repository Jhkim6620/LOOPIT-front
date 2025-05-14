import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMsg('비밀번호가 일치하지 않습니다.');
    }

    try {
      const res = await axios.post('http://localhost:8000/api/register/', {
        email,
        username,
        password,
      });
      alert('회원가입 성공! 로그인 해주세요.');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (err) {
      setErrorMsg('회원가입 실패: 입력 값을 확인해주세요.');
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <input
          type="text"
          placeholder="닉네임"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
  
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
  
        <button type="submit">회원가입</button>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
    </div>
  );
  
};

export default RegisterPage;
