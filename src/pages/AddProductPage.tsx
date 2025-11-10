

import React from 'react';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../types';

const AddProductPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = (data: {
    ten: string;
    danhMuc: Category;
    gia: number;
    soLuong: number;
    moTa: string;
  }) => {
    addProduct(data);
    navigate('/');
  };

  return (
    <div className="page">
      <ProductForm mode="add" onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProductPage;
