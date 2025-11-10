
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect
} from 'react';
import { productReducer, initialProductState } from "../reducers/productReducer";
import type {
  ProductState,
  ProductAction
} from "../reducers/productReducer";
import type { Product } from '../types';

const STORAGE_KEY = 'products_state_v1';

interface ProductContextType {
  state: ProductState;
  addProduct: (data: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

function loadInitialState(): ProductState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialProductState;
    }

    const parsed = JSON.parse(raw) as ProductState;

    if (!parsed || !Array.isArray(parsed.products)) {
      return initialProductState;
    }

    return parsed;
  } catch (err) {
    console.error('Lỗi khi đọc localStorage:', err);
    return initialProductState;
  }
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    productReducer,
    initialProductState,
    () => loadInitialState()
  );

  useEffect(() => {
    try {
      const dataToSave: ProductState = {
        products: state.products
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (err) {
      console.error('Lỗi khi ghi localStorage:', err);
    }
  }, [state.products]);


  const addProduct = (data: Omit<Product, 'id'>) => {
    const action: ProductAction = {
      type: 'ADD_PRODUCT',
      payload: data
    };
    dispatch(action);
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  return (
    <ProductContext.Provider
      value={{ state, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return ctx;
};
