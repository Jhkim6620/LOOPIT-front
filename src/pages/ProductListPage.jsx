import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  }
`;

const Status = styled.p`
  font-size: 13px;
  color: #888;
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ListContainer>
      <h2>🛍️ 상품 목록</h2>
      <Grid>
        {products.map(p => (
          <Card key={p.id}>
            <Link to={`/products/${p.id}`}><h3>{p.title}</h3></Link>
            <p>{p.description}</p>
            <p><strong>{p.price.toLocaleString()}원</strong></p>
            <Status>{p.status}</Status>
          </Card>
        ))}
      </Grid>
    </ListContainer>
  );
};

export default ProductListPage;
