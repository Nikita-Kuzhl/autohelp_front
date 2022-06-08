import { PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "./../../types/cart.types";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  price: number;
  count: number;
}

const initialState: CartState = {
  price: 0,
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    checkCart: (state: CartState, action: PayloadAction<ICart[]>) => {
      if (action.payload === undefined) return state;
      if (!action.payload.length || action.payload.length === 0) {
        state.price = 0;
        state.count = 0;
        return state;
      }
      state.price = action.payload.reduce(
        (previous, current) => (previous += current.products.price),
        0
      );
      state.count = action.payload.length;
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const cartAction = cartSlice.actions;
