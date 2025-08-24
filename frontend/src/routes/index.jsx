import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import ProductList from '.../pages/Product/ProductList'
import ProductList from './pages/Product/ProductList'
import ProductShow from './pages/Product/ProductShow';
import ProductAdd from './pages/Product/ProductAdd';
import ProductUpdate from './pages/Product/ProductUpdate';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import PrivateRoute from '../app/components/PrivateRoute';


const AppRoutes = () => (
  <Routes>
          
          <Route path ="/signin" element={<SignIn/>} />
          <Route path ="/signup" element={<SignUp/>} />

    {/* Protected routes */}
    <Route element={<PrivateRoute />}>
       <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductShow />} />
          <Route path="/product/new" element={<ProductAdd />} />
          <Route path="/products/update/:id" element={<ProductUpdate />} />
      {/* Add more protected routes here */}
    </Route>
  </Routes>
);

export default AppRoutes;
