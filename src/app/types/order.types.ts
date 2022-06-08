import { ICart } from "./cart.types";
export interface ICreateOrder {
  date: string;
  products: ICart[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  id: number;
  date: string;
  products: Product[];
  price: number;
  status: string;
  comment: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IOrderUpdate {
  id: number;
  comment: string;
  status: string;
}
