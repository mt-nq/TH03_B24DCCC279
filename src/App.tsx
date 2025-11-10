import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">
          Product Manager
        </Link>
        <div className="nav-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/add">Thêm sản phẩm</Link>
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
