
import React, { useMemo, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import ProductList from '../components/ProductList';
import type { Category } from '../types';
import { Link } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const { state } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<Category | '' | 'Tất cả'>(
    'Tất cả'
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      if (
        searchTerm &&
        !p.ten.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (
        category !== 'Tất cả' &&
        category !== '' &&
        p.danhMuc !== category
      ) {
        return false;
      }

      const price = p.gia;
      const min = minPrice ? Number(minPrice) : undefined;
      const max = maxPrice ? Number(maxPrice) : undefined;

      if (min !== undefined && !isNaN(min) && price < min) return false;
      if (max !== undefined && !isNaN(max) && price > max) return false;

      return true;
    });
  }, [state.products, searchTerm, category, minPrice, maxPrice]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    value: Category | '' | 'Tất cả'
  ) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Quản lý sản phẩm</h1>
        <Link to="/add" className="primary-link">
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <FilterBar
          category={category}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />
      </div>

      <p className="summary">
        Tổng số sản phẩm: {filteredProducts.length} | Trang{' '}
        {currentPage}/{totalPages}
      </p>

      <ProductList products={paginatedProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
