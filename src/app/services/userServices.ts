import { IUpdateUser } from "./../types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserInfo } from "../types/user.types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getInfoUser: build.query<IUserInfo, any>({
      query: () => ({
        url: "/users/user",
      }),
    }),
    getAllUser: build.query<IUserInfo[], any>({
      query: () => ({
        url: "/users/",
      }),
      providesTags: (result) => ["User"],
    }),
    delUser: build.mutation<any, IUpdateUser>({
      query: (data: IUpdateUser) => ({
        url: `/users/delete/${data.id}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation<any, IUpdateUser>({
      query: (data: IUpdateUser) => ({
        url: `/users/update/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useGetInfoUserQuery,
  useGetAllUserQuery,
  useDelUserMutation,
  useUpdateUserMutation,
} = userApi;
