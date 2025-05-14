import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 60px auto;
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

const Textarea = styled.textarea`
  padding: 12px;
  margin-bottom: 16px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
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

const ProductFormPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(price) || price <= 0) {
      return setErrorMsg('가격은 숫자이며 0보다 커야 합니다.');
    }

    try {
      await axios.post('http://localhost:8000/api/products/', {
        title,
        description,
        price: Number(price),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      alert('상품 등록 성공!');
      navigate('/products');
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.detail || '등록 실패: 로그인 상태 또는 입력값을 확인해주세요.';
      setErrorMsg(message);
    }
  };

  return (
    <Container>
      <Title>상품 등록</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="설명"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Button type="submit">등록하기</Button>
      </Form>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
    </Container>
  );
};

export default ProductFormPage;