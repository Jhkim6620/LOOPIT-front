import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  background: #fffdf7;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const ProductInfo = styled.p`
  margin: 6px 0;
  color: #555;
`;

const MyProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((res) => {
        const myId = parseInt(localStorage.getItem('user_id'));
        const filtered = res.data.filter((p) => p.owner === myId);
        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Title>내가 등록한 상품</Title>
      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>등록한 상품이 없습니다.</p>
      ) : (
        products.map((p) => (
          <ProductCard key={p.id}>
            <ProductTitle>{p.title}</ProductTitle>
            <ProductInfo>가격: {p.price.toLocaleString()}원</ProductInfo>
            <ProductInfo>상태: {p.status}</ProductInfo>
            <ProductInfo>설명: {p.description}</ProductInfo>
          </ProductCard>
        ))
      )}
    </Container>
  );
};

export default MyProductPage;
