
import React from 'react';
import type { Category } from '../types';

interface FilterBarProps {
  category: Category | '' | 'Tất cả';
  onCategoryChange: (value: Category | '' | 'Tất cả') => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange
}) => {
  return (
    <div className="filter-bar">
      {}
      <select
        value={category}
        onChange={(e) =>
          onCategoryChange(
            e.target.value === '' ? 'Tất cả' : (e.target.value as Category)
          )
        }
      >
        <option value="">Tất cả danh mục</option>
        <option value="Điện tử">Điện tử</option>
        <option value="Quần áo">Quần áo</option>
        <option value="Đồ ăn">Đồ ăn</option>
        <option value="Sách">Sách</option>
        <option value="Khác">Khác</option>
      </select>

      {}
      <input
        type="number"
        placeholder="Giá min"
        value={minPrice}
        onChange={(e) => onMinPriceChange(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá max"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
      />
    </div>
  );
};

export default FilterBar;
