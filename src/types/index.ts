import z from 'zod';
import { ProductSchema, ProductsSchema, RecommendationSchema } from '../schemas/zodSchemas';

export type RecomemendationsRequestBody = {
  prompt: string;
};
export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
