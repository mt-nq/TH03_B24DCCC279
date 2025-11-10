

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import type { Category } from '../types';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const { state, updateProduct } = useProducts();
  const navigate = useNavigate();

  const productId = Number(id);
  const product = state.products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="page">
        <p>Không tìm thấy sản phẩm để chỉnh sửa.</p>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
    );
  }

  const handleSubmit = (data: {
    ten: string;
    danhMuc: Category;
    gia: number;
    soLuong: number;
    moTa: string;
  }) => {
    updateProduct({
      ...product,
      ...data
    });
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="page">
      <ProductForm
        mode="edit"
        initialValues={product}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditProductPage;
