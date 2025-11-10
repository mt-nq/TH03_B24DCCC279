
import type { Product } from "../types";
import { initialProducts } from "../data/initialProducts";

export interface ProductState {
  products: Product[];
}

export type ProductAction =
  | { type: "ADD_PRODUCT"; payload: Omit<Product, "id"> }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number };

export const initialProductState: ProductState = {
  products: initialProducts
};

export function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const maxId = state.products.length
        ? Math.max(...state.products.map((p) => p.id))
        : 0;
      const newProduct: Product = {
        id: maxId + 1,
        ...action.payload
      };
      return {
        ...state,
        products: [...state.products, newProduct]
      };
    }
    case "UPDATE_PRODUCT": {
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        )
      };
    }
    case "DELETE_PRODUCT": {
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload)
      };
    }
    default:
      return state;
  }
}
