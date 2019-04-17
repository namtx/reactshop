import { IProduct } from "./ProductData"

export enum ProductsActionTypes {
  GETALL = "PRODUCTS/GETALL",
  LOADING = "PRODUCTS/LOADING",
  GETSINGLE = "PRODUCTS/GETSINGLE"
}

export interface IProductsGetAllAction {
  type: ProductsActionTypes.GETALL,
  products: IProduct[]
}

export interface IProductsLoadingAction {
  type: ProductsActionTypes.LOADING
}

export interface IProductsGetSingle {
  type: ProductsActionTypes.GETSINGLE
  
}

export type ProductsActions = IProductsGetAllAction | IProductsLoadingAction

export interface IProductsState {
  readonly products: IProduct[]
  readonly productsLoading: boolean
}

