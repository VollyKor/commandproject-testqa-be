import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { PORT, PUBLIC_FOLDER_PATH, HttpCode } from './helpers/constants'
import {ErrorRequestHandler} from 'express-serve-static-core'

dotenv.config();

// example of import from .js to .ts files
// =================================
// import { example } from './controllers/user'
// console.log(example);

const app = express();
app.use(cors())
app.use(express.static(PUBLIC_FOLDER_PATH()))

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

app.get('/', (_, response) => {
  response.send('Hello world!');
});

// Common routes
// ================================
// app.use('/api/contacts', contactsRouter)
// app.use('/api/users', userRouter)

// Error handle
// =================================
app.use (((err, req, res, next) => {
    if (err.status === 400) {
        return res.status(400).json(err)
    }
    res.status(500).json({ message: err.message })
}) as ErrorRequestHandler )

export default app