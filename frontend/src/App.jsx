import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductShow from './pages/ProductShow';
import ProductAdd from './pages/ProductAdd';
import ProductUpdate from './pages/ProductUpdate';
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductShow />} />
      <Route path="/product/new" element={<ProductAdd />} />
      <Route path="/products/update/:id" element={<ProductUpdate />} />


    </Routes>
  );
}

export default App;
