import type { RequestHandler } from 'express';
import express from 'express';
import { recommendRoute } from './routes/recommendRoute';
import { errorHandler } from './middlewares/errorHandler';

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use('/api', recommendRoute);

app.use('*splat', ((req, res) => {
  throw new Error('Not Found', { cause: { status: 404 } });
}) as RequestHandler);

app.use(errorHandler);
app.listen(port, () => console.log(`Server listening on port ${port}`));
