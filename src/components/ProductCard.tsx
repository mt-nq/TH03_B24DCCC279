

import React from 'react';
import type { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  const handleDelete = () => {
    const ok = window.confirm(
      `Bạn có chắc chắn muốn xóa sản phẩm "${product.ten}"?`
    );
    if (ok) deleteProduct(product.id);
  };

  return (
    <div className="product-card">
      <h3>{product.ten}</h3>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString('vi-VN')} VND</p>
      <p>Số lượng: {product.soLuong}</p>
      <div className="card-actions">
        <button onClick={() => navigate(`/products/${product.id}`)}>
          Xem chi tiết
        </button>
        <button onClick={() => navigate(`/edit/${product.id}`)}>
          Chỉnh sửa
        </button>
        <button className="danger" onClick={handleDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
