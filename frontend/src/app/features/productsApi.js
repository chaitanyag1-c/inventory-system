import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery(
    { 
      baseUrl: 'http://localhost:3000/' ,
      prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },

    }


  ), 
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, per_page = 10, search = "" }) =>
        `/products?page=${page}&per_page=${per_page}&search=${search}`,
    }),
    showProduct: builder.query({
      query: (id) => `products/${id}`
    }),
    addProduct: builder.mutation({
      query: (formData) =>({
        url: `/products`,
        method: 'POST', // PUT is used for updating resources
        body: formData,
      })
    }),
    updateProduct: builder.mutation({
      query: (Product) =>({
        url: `/products/${Product.product.id}`,
        method: 'PUT', // PUT is used for updating resources
        body: Product,
      })
    }),
    deleteProduct: builder.mutation({
      query: (ProductId) =>({
        url: `/products/${ProductId}`,
        method: 'DELETE', // PUT is used for updating resources
      })
    })
  }),
});

export const { useGetProductsQuery,useLazyShowProductQuery,useAddProductMutation,useShowProductQuery,useUpdateProductMutation,useDeleteProductMutation } = productsApi;


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000', // your backend URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // your endpoints like getProducts, etc.
  }),
});