import type { RecomemendationsRequestBody } from '../types';
import { Request, Response } from 'express';
import { answerWithProducts } from '../services/openAIService';

export const getRecommendations = async (
  req: Request<{}, {}, RecomemendationsRequestBody>,
  res: Response
): Promise<void> => {
  if (!req.body) throw new Error('Request body is required', { cause: { status: 400 } });
  const { prompt } = req.body;
  if (!prompt) throw new Error('Prompt is required', { cause: { status: 400 } });
  const result = await answerWithProducts(prompt);
  res.json(result);
  return;
};
