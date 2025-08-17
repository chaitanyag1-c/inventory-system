import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi', // changed from productsApi to authApi for clarity
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }), // Your Rails backend URL
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body: body
      }),
    }),

    signIn: builder.mutation({
      query: (signInParams) => ({
        url: '/login',
        method: 'POST',
        body: signInParams,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
