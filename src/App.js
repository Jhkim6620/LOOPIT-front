import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProductFormPage from './pages/ProductFormPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MainPage from './pages/MainPage';
import MyProductPage from './pages/MyProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/my-products" element={<MyProductPage />} />
        <Route path="/chat/:roomName" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;