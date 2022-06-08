import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export interface AuthState {
  token: string | null;
  isAuth: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isStaff: boolean;
}
const decodedToken: any =
  localStorage.getItem("token") !== null
    ? //@ts-ignore
      jwt_decode(localStorage.getItem("token"))
    : "";
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem("token") ? true : false,
  isAdmin: decodedToken.roles
    ? decodedToken.roles.value === "admin"
      ? true
      : false
    : false,
  isUser: decodedToken.roles
    ? decodedToken.roles.value === "user"
      ? true
      : false
    : false,
  isStaff: decodedToken.roles
    ? decodedToken.roles.value === "staff"
      ? true
      : false
    : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (
      state: AuthState,
      action: PayloadAction<{ token: string; role: string }>
    ) => {
      if (action.payload.token === undefined) return alert("error server");
      localStorage.setItem("token", `Bearer ${action.payload.token}`);
      state.token = action.payload.token;
      state.isAuth = true;
      action.payload.role === "admin"
        ? (state.isAdmin = true)
        : (state.isAdmin = false);
      action.payload.role === "staff"
        ? (state.isStaff = true)
        : (state.isStaff = false);
      action.payload.role === "user"
        ? (state.isUser = true)
        : (state.isUser = false);
    },
    removeToken: (state: AuthState, action: any) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuth = false;
      state.isAdmin = false;
      state.isStaff = false;
      state.isUser = false;
    },
  },
});
export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
