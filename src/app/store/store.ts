import { orderApi } from "./../services/orderService";
import { userApi } from "./../services/userServices";
import { cartReducer } from "./../features/cart/cartSlice";
import { cartApi } from "./../services/cartService";
import { categoryApi } from "./../services/categoryServices";
import { userReducer } from "../features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      cartApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcch = typeof store.dispatch;
