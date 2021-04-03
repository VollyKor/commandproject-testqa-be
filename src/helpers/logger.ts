import dotenv from 'dotenv';
import log4js from 'log4js';
import * as Const from './constants'
dotenv.config();
// using log4js as Logger
// ========================================
const logger = log4js.getLogger();

//  LOG_LEVEL = 'debug' | 'info' | 'error'
logger.level = Const.LOG_LEVEL;

logger.info('log4js log info');
logger.debug('log4js log debug');
logger.error('log4js log error');