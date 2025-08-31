import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (signInParams) => ({
        url: '/login',
        method: 'POST',
        body: signInParams,
      }),
    }),
    userDetails: builder.query({
      query: () => `me`,
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: '/update',
        method: 'PUT',
        body,
      }),
    }),
    updateUserPassword: builder.mutation({
      query: (body) => ({
        url: '/update_password',
        method: 'PUT',
        body,
      }),
    }),

  }),
});

// Export hooks
export const { useSignInMutation, useSignUpMutation, useUserDetailsQuery, useUpdateUserMutation,useUpdateUserPasswordMutation } = authApi;
