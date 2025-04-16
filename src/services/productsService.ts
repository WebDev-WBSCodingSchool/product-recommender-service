import { ProductsSchema } from '../schemas/zodSchemas';
import type { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  const json = await response.json();
  const result = ProductsSchema.safeParse(json);
  if (!result.success) {
    throw new Error('There was an error while retrieving the products');
  } else {
    return result.data;
  }
};
