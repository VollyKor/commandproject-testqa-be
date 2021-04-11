import { RequestHandler } from 'express';
import { ControllerFunction } from '../types/interfaces';
// import { ControllerFunction } from '../typescript-helpers/types';

export default (cb: ControllerFunction): any =>
  ((req, res, next) => {
    return cb(req, res, next).catch((err: Error) => next(err));
  }) as RequestHandler;
