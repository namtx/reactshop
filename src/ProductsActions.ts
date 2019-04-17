import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"

import { getProducts as getProductsFromAPI } from "./ProductData"
import { IProductsGetAllAction, IProductsLoadingAction, ProductsActionTypes, IProductsState } from "./ProductsTypes"

const loading: ActionCreator<IProductsLoadingAction> = () => {
  return {
    type: ProductsActionTypes.LOADING
  }
}

export const getProducts: ActionCreator<ThunkAction<Promise<AnyAction>, IProductsState, null, IProductsGetAllAction>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loading())
    const products = await getProductsFromAPI()
    return dispatch({
      products: products,
      type: ProductsActionTypes.GETALL
    })
  }
}
