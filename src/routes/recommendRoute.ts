import { Router } from 'express';
import { getRecommendations } from '../controllers/recommendations';

const router = Router();

router.post('/recommend', getRecommendations);

export { router as recommendRoute };
