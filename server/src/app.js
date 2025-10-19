import express from 'express';
import cors from 'cors';
import routes from './routes/leaderboard.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
