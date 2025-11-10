
import React, { useState, useEffect } from 'react';
import type { Category, Product } from '../types';

interface ProductFormProps {
  mode: 'add' | 'edit';
  initialValues?: Product;
  onSubmit: (data: {
    ten: string;
    danhMuc: Category;
    gia: number;
    soLuong: number;
    moTa: string;
  }) => void;
}

interface FormErrors {
  ten?: string;
  gia?: string;
  soLuong?: string;
  danhMuc?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  mode,
  initialValues,
  onSubmit
}) => {
  const [ten, setTen] = useState(initialValues?.ten ?? '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>(
    initialValues?.danhMuc ?? ''
  );
  const [gia, setGia] = useState<string>(
    initialValues ? String(initialValues.gia) : ''
  );
  const [soLuong, setSoLuong] = useState<string>(
    initialValues ? String(initialValues.soLuong) : ''
  );
  const [moTa, setMoTa] = useState(initialValues?.moTa ?? '');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialValues) {
      setTen(initialValues.ten);
      setDanhMuc(initialValues.danhMuc);
      setGia(String(initialValues.gia));
      setSoLuong(String(initialValues.soLuong));
      setMoTa(initialValues.moTa);
    }
  }, [initialValues]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!ten.trim()) {
      newErrors.ten = 'Tên sản phẩm là bắt buộc.';
    } else if (ten.trim().length < 3) {
      newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự.';
    }

    const giaNumber = Number(gia);
    if (!gia) {
      newErrors.gia = 'Giá là bắt buộc.';
    } else if (isNaN(giaNumber) || giaNumber <= 0) {
      newErrors.gia = 'Giá phải là số dương.';
    }

    const soLuongNumber = Number(soLuong);
    if (!soLuong) {
      newErrors.soLuong = 'Số lượng là bắt buộc.';
    } else if (
      !Number.isInteger(soLuongNumber) ||
      soLuongNumber <= 0
    ) {
      newErrors.soLuong = 'Số lượng phải là số nguyên dương.';
    }

    if (!danhMuc) {
      newErrors.danhMuc = 'Danh mục là bắt buộc.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ten: ten.trim(),
      danhMuc: danhMuc as Category,
      gia: Number(gia),
      soLuong: Number(soLuong),
      moTa: moTa.trim()
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{mode === 'add' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}</h2>

      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
        />
        {errors.ten && <p className="error">{errors.ten}</p>}
      </div>

      <div className="form-group">
        <label>Danh mục</label>
        <select
          value={danhMuc}
          onChange={(e) =>
            setDanhMuc(e.target.value as Category | '')
          }
        >
          <option value="">-- Chọn danh mục --</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.danhMuc && <p className="error">{errors.danhMuc}</p>}
      </div>

      <div className="form-group">
        <label>Giá (VND)</label>
        <input
          type="number"
          value={gia}
          onChange={(e) => setGia(e.target.value)}
        />
        {errors.gia && <p className="error">{errors.gia}</p>}
      </div>

      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          value={soLuong}
          onChange={(e) => setSoLuong(e.target.value)}
        />
        {errors.soLuong && (
          <p className="error">{errors.soLuong}</p>
        )}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          rows={3}
        />
      </div>

      <button type="submit">
        {mode === 'add' ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
      </button>
    </form>
  );
};

export default ProductForm;
