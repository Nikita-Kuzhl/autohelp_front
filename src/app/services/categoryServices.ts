import { ICategory, IProduct, ISubCategory } from "./../types/category.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    getSubCategory: build.query<ISubCategory[], any>({
      query: () => ({ url: "/subcategory" }),
    }),
    getCategory: build.query<ICategory[], number>({
      query: (id) =>
        id === 0 ? { url: "/category" } : { url: `/category/subcat/${id}` },
    }),
    getProduct: build.query<IProduct[], any>({
      query: (id) => ({ url: `/product/cat/${id}` }),
    }),
    getCategoryByID: build.query<ICategory, number>({
      query: (id) => ({ url: `/category/${id}` }),
    }),
  }),
});
export const {
  useGetSubCategoryQuery,
  useGetCategoryQuery,
  useGetProductQuery,
  useGetCategoryByIDQuery,
} = categoryApi;
