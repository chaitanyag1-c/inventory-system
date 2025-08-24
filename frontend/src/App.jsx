import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import ProductList from './pages/Product/ProductList';
import ProductShow from './pages/Product/ProductShow';
import ProductAdd from './pages/Product/ProductAdd';
import ProductUpdate from './pages/Product/ProductUpdate';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import PrivateRoute from './app/components/PrivateRoute';
import Navbar from './pages/Common Components/Navbar';
import Home from './pages/Common Components/Home';
import ProductCatalogList from './pages/Product/ProductCatalogList';
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
    <Route element={<PrivateRoute />}>
      <Route path="/products" element={<ProductList />} />
      <Route path="/allproducts" element={<ProductCatalogList />} />

      <Route path="/products/:id" element={<ProductShow />} />
      <Route path="/product/new" element={<ProductAdd />} />
      <Route path="/products/update/:id" element={<ProductUpdate />} />


    </Route>

      
      <Route path ="/signin" element={<SignIn/>} />
      <Route path ="/signup" element={<SignUp/>} />
      
      <Route path="/" element={<Home />} />

      

    </Routes>
    </>
  );
}

export default App;
