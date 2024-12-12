import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../services/ProductService';
import { ProductData } from '../../types';

interface ProductContextType {
  products: ProductData[];
  loading: boolean;
  addProduct: (product: Omit<ProductData, 'id'>) => Promise<void>;
  updateProduct: (product: ProductData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const defaultContextValue: ProductContextType = {
  products: [],
  loading: false,
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
};

export const ProductContext = createContext<ProductContextType>(defaultContextValue);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = async (product: Omit<ProductData, 'id'>) => {
    const newProduct = await addProduct(product);
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleUpdateProduct = async (product: ProductData) => {
    const updatedProduct = await updateProduct(product);
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct: handleAddProduct,
        updateProduct: handleUpdateProduct,
        deleteProduct: handleDeleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
