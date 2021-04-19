import passport from 'passport';
import '../config/passport';
import { RequestHandler } from 'express-serve-static-core';
import { HttpCode } from '../types/enums';
import { IuserPayload } from '../types/interfaces';

const guardRefresh = ((req, res, next) => {
  try {
    if (req.get('Authorization') === undefined) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
      });
    }

    passport.authenticate(
      'jwt-refresh',
      { session: false },
      (err, payload: IuserPayload) => {
        if (!payload?.user || err) {
          return res.status(HttpCode.FORBIDDEN).json({
            status: 'error',
            code: HttpCode.FORBIDDEN,
            message: 'Access is denied',
          });
        }

        req.body = { ...payload };
        return next();
      },
    )(req, res, next);
  } catch (error) {
    next(error);
  }
}) as RequestHandler;
export default guardRefresh;
