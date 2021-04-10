import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { PUBLIC_FOLDER_PATH, HttpCode } from './helpers/constants';

import QuestionRouter from './routes/questions/R_questions';
import UserRouter from './routes/users/users';
import AuthRouter from './routes/auth/R_auth';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_FOLDER_PATH()));

// Common routes
// ================================
app.use('/test', QuestionRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

app.get('/', (_, response) => {
  response.send('Hello world!');
});

// Path for swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handle
// =================================
app.use((_, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found app' });
});

app.use(((err, _, res) => {
  if (err.status === HttpCode.BAD_REQUEST) {
    return res.status(HttpCode.BAD_REQUEST).json(err);
  }
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
}) as ErrorRequestHandler);

export default app;
