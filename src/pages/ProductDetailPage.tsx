

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useProducts();

  const productId = Number(id);
  const product = state.products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="page">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Chi tiết sản phẩm</h1>
      <div className="product-detail">
        <h2>{product.ten}</h2>
        <p>
          <strong>Danh mục:</strong> {product.danhMuc}
        </p>
        <p>
          <strong>Giá:</strong>{' '}
          {product.gia.toLocaleString('vi-VN')} VND
        </p>
        <p>
          <strong>Số lượng:</strong> {product.soLuong}
        </p>
        <p>
          <strong>Mô tả:</strong> {product.moTa}
        </p>
      </div>
      <div className="detail-actions">
        <button onClick={() => navigate(`/edit/${product.id}`)}>
          Chỉnh sửa
        </button>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
