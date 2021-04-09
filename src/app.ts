import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import {ErrorRequestHandler} from 'express-serve-static-core'
import { PUBLIC_FOLDER_PATH, HttpCode } from './helpers/constants'
import QuestionRouter from './routes/questions/R_questions';
import UserRouter from './routes/users/users';
dotenv.config();

// example of import from .js to .ts files
// =================================
// import { example } from './controllers/user'
// console.log(example);

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(PUBLIC_FOLDER_PATH()))



// Common routes
// ================================
app.use('/test', QuestionRouter);
app.use('/users', UserRouter)

app.get('/', (_, response) => {
  response.send('Hello world!');
});
// Error handle
// =================================
app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND).json({ message: 'Not found app' })
})

app.use(((err, _, res, next) => {  
  if (err.code === HttpCode.BAD_REQUEST) {
    // const [{ message }] = err.details;
    return res.status(HttpCode.BAD_REQUEST).json(err) 
  }
      
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
}) as ErrorRequestHandler);

export default app