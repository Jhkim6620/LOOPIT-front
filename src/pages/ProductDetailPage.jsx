// ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 20px 0;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const Status = styled.p`
  font-size: 14px;
  color: #888;
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p style={{ textAlign: 'center', marginTop: '100px' }}>불러오는 중...</p>;

  return (
    <Container>
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>{product.price.toLocaleString()}원</Price>
      <Status>상태: {product.status}</Status>
      <Status>등록일: {new Date(product.created_at).toLocaleDateString()}</Status>
    </Container>
  );
};

export default ProductDetailPage;
