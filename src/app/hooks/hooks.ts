import { AppDispatcch, RootState } from "../store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const useAppDispatch = () => useDispatch<AppDispatcch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});
