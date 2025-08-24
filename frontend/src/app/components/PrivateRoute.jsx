import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { notification } from 'antd';
// Function to check token validity (based on expiration time)
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    // JWT token payload is the 2nd part (index 1), base64 decoded
    const payload = JSON.parse(atob(token.split('.')[1]));
    // payload.exp is in seconds, convert to milliseconds and check if current time is less
    return payload.exp * 1000 > Date.now();
  } catch {
    return false; // If invalid token format or decode error
  }
};

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!isTokenValid(token)) {
      notification.error({
        message: 'Invalid Token',
        description: 'Please sign in to continue.',
        placement: 'bottomLeft',
      });
    }
  }, [token]);
  // If token valid, render the nested routes, else redirect to SignIn
  return isTokenValid(token) ? <Outlet /> : (
    <Navigate 
      to="/signin" 
      replace 
      state={{ message: 'Session expired. Please sign in again.' }} 
    />

  );
};

export default PrivateRoute;
