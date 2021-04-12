import express, { Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import './helpers/logger';

import swaggerDocument from './swagger.json';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { PUBLIC_FOLDER_PATH } from './helpers/constants';
import { HttpCode, statusCode } from './types/enums';

import QuestionRouter from './routes/questions/R_questions';
import UserRouter from './routes/users/users';
import AuthRouter from './routes/auth/R_auth';
import Res from './helpers/Response';

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

app.get('/', (_, res) => {
  res.send('Hello world!');
});

// Path for swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handle
// =================================
app.use((_, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found app' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err, _, res, next) => {
  const { status, message } = err;

  if (status === statusCode.ERROR) return Res.BadRequest(res, message);

  Res.InternalError(res, message);
}) as ErrorRequestHandler);

export default app;
