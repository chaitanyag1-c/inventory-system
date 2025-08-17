import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './features/productsApi';
import { authApi } from './features/authApi';
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware,authApi.middleware),
});
