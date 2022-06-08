import { IOrder, IOrderUpdate } from "./../types/order.types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
export const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/order",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Order", "OrderAll"],
  endpoints: (build) => ({
    getOrderByUser: build.query<IOrder[], any>({
      query: () => ({
        url: "/user",
      }),
      providesTags: (result) => ["Order"],
    }),
    cancelOrder: build.mutation<any, number>({
      query: (id) => ({
        url: `/canceled/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrder: build.query<IOrder[], any>({
      query: () => ({
        url: "/",
      }),
      providesTags: (result) => ["OrderAll"],
    }),
    updateOrder: build.mutation<any, IOrderUpdate>({
      query: (data) => ({
        url: `/update/status/${data.id}`,
        method: "POST",
        body: JSON.stringify({ status: data.status, comment: data.comment }),
      }),
      invalidatesTags: ["OrderAll"],
    }),
  }),
});
export const {
  useGetOrderByUserQuery,
  useCancelOrderMutation,
  useGetAllOrderQuery,
  useUpdateOrderMutation,
} = orderApi;
