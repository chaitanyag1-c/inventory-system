import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // Your Rails backend URL
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    showProduct: builder.query({
      query: (id) => `products/${id}`
    }),
    addProduct: builder.mutation({
      query: (Product) =>({
        url: `/products`,
        method: 'POST', // PUT is used for updating resources
        body: Product,
      })
    }),
    updateProduct: builder.mutation({
      query: (Product) =>({
        url: `/products/${Product.product.id}`,
        method: 'PUT', // PUT is used for updating resources
        body: Product,
      })
    })
  }),
});

export const { useGetProductsQuery,useLazyShowProductQuery,useAddProductMutation,useShowProductQuery,useUpdateProductMutation } = productsApi;
