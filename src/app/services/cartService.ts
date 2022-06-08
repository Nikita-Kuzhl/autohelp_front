import { ICreateOrder } from "./../types/order.types";
import { ICart } from "./../types/cart.types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
// const token: any = localStorage.getItem("token");
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart", "Order"],
  endpoints: (build) => ({
    getCart: build.query<ICart[], any>({
      query: () => ({ url: "/cart/user" }),
      providesTags: (result) => ["Cart"],
    }),
    addCart: build.mutation<any, number>({
      query: (id) => ({
        url: "/cart/add",
        method: "POST",
        body: { productId: id },
      }),
      invalidatesTags: ["Cart"],
    }),
    delCartItem: build.mutation<any, number>({
      query: (id) => ({
        url: "/cart/item/del",
        method: "DELETE",
        body: { productId: id },
      }),
      invalidatesTags: ["Cart"],
    }),
    orderAdd: build.mutation<any, ICreateOrder>({
      query: ({ date, products }) => ({
        url: "/order/add",
        method: "POST",
        body: { date, products: products },
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
  }),
});
export const {
  useGetCartQuery,
  useAddCartMutation,
  useDelCartItemMutation,
  useOrderAddMutation,
} = cartApi;
