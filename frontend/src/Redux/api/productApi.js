import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    cheapProducts: builder.query({
      query: () => `cheap-products`,
      providesTags: ["product"],
    }),
    categories: builder.query({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    productDetails: builder.query({
      query: (id) => `${id}`,
      providesTags: ["product"],
    }),
    relatedProducts: builder.query({
      query: ({ category, productId }) =>
        `related-products?category=${category}&productId=${productId}`,
      providesTags: ["product"],
    }),

    searchProducts: builder.query({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["product"],
    }),

    newProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCheapProductsQuery,
  useRelatedProductsQuery,
} = productAPI;
