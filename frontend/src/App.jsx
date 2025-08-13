import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import ProductList from './pages/ProductList';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
}

export default App;
