import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import {PORT, PUBLIC_FOLDER_PATH} from './helpers/constants'

dotenv.config();

// example of import from .js to .ts files
// =================================
// import { example } from './controllers/user'
// console.log(example);

const app = express();
app.use(cors())
app.use(express.static(PUBLIC_FOLDER_PATH()))


app.get('/', (_, response) => {
  response.send('Hello world!');
});
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app