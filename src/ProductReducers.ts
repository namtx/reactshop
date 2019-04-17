import { Reducer } from "redux"
import { IProductsState, ProductsActions, ProductsActionTypes } from "./ProductsTypes"

const initialProductsState: IProductsState = {
  products: [],
  productsLoading: false
}

export const productsReducer: Reducer<IProductsState, ProductsActions> = (state = initialProductsState, action) => {
  switch (action.type) {
    case ProductsActionTypes.LOADING: {
      return {
        ...state,
        productsLoading: true
      }
    }
    case ProductsActionTypes.GETALL: {
      return {
        ...state,
        products: action.products,
        productsLoading: false
      }
    }
  }
  return state;
}
