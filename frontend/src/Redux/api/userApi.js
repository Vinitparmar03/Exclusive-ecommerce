import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register-user",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "login-user",
        method: "POST",
        body: user,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    saveDetails: builder.mutation({
      query: ({ data, userId }) => ({
        url: `save-details?id=${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    allUsers: builder.query({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    singleUser: builder.query({
      query: (id) => `${id}`,
      providesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: ({ userId, adminUserId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useSingleUserQuery,
  useLogoutUserMutation,
  useSaveDetailsMutation,
} = userAPI;
