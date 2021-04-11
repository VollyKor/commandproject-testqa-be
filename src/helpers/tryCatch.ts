// import { RequestHandler } from 'express';
// import { ControllerFunction } from '../types/interfaces';
import { ControllerFunction } from '../types/interfaces';

// export default (cb: ControllerFunction): any =>
//   ((req, res, next) => {
//     cb(req, res, next).catch((err: Error) => next(err));
//   }) as RequestHandler;

import { Request, Response, NextFunction } from 'express';
// import { ControllerFunction } from '../typescript-helpers/types';

export default (cb: ControllerFunction) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return cb(req, res, next).catch((err: any) => next(err));
};
