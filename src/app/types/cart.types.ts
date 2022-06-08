import { IProduct } from "./category.types";
export interface ICart {
  productId: number;
  products: IProduct;
}
