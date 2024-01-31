import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

type strictedtype =
  | "alert-success"
  | "alert-info"
  | "alert-warning"
  | "alert-dengers";

export type IProps = {
  type: strictedtype;
  icon: ReactNode;
  desc: string;
  title: string;
};

export type IImage = {
  imageURL: string;
  alt: string;
  className: string;
};

export type IButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  className: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
};

export type ICategory = {
  id: string;
  name: string;
  imageURL: string;
};

export type ICircel = {
  className: string;
};

export type IProduct = {
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
};

export type IChildOfProduct = {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  onEditModel: () => void;
  setIndexProduct: (idx:number) => void;
  setDeleteIndexProduct: (idx:IProduct) => void;
  setOpenDeleteConfimration: (value:boolean) => void;
  idx: number;
};

export type IModalInfo = {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  description?: string;
  closeModal: () => void;
};

export type IFormData = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: "price" | "imageURL" | "description" | "title";
  type: string;
  label: string;
};
