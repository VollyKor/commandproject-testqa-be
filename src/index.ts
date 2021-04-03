import express from 'express';
import dotenv from 'dotenv';
import log4js from 'log4js';
import cors from 'cors'
import * as Const from './helpers/constants'

dotenv.config();
const port = Const.PORT;

// using log4js as Logger
// ========================================
const logger = log4js.getLogger();

//  LOG_LEVEL = 'debug' | 'info' | 'error'
logger.level = Const.LOG_LEVEL;

logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');

// example of import from .js to .ts files
// =================================
import { example } from './controllers/user'
console.log(example);

const app = express();
app.use(cors())
    
app.get('/', (_, response) => {
  response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));


export default app