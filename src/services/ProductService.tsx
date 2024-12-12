import { ProductData } from "../types";

const API_URL = 'http://localhost:5000/phone';

export const fetchProducts = async (): Promise<ProductData[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (id: string): Promise<ProductData> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const addProduct = async (product: Omit<ProductData, 'id'>): Promise<ProductData> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  console.log(response)
  return response.json();
};

export const updateProduct = async (product: ProductData): Promise<ProductData> => {
  const response = await fetch(`${API_URL}/${product.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete product');
};
