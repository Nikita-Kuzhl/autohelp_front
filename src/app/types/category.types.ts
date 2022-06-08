export interface ICategory {
  id: number;
  name: string;
  description: string;
  image: string;
}
export interface ISubCategory {
  id: number;
  name: string;
}
export interface IProduct {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}
