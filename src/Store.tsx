import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "./ProductReducers";
import { IProductsState } from "./ProductsTypes";

export interface IApplicationState {
  products: IProductsState;
}

const rootReducer = combineReducers<IApplicationState>({
  products: productsReducer
});

export default function configStore(): Store<IApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
