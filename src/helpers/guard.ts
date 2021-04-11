import passport from 'passport';
import { RequestHandler } from 'express-serve-static-core';
import { HttpCode } from '../types/enums';
import '../config/passport';

const guard = ((req, res, next) => {
  if (req.get('Authorization') === undefined) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      data: 'Unauthorized',
    });
  }

  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: 'error',
        code: HttpCode.FORBIDDEN,
        message: 'Access is denied',
      });
    }
    req.body.user = user;
    return next();
  })(req, res, next);
}) as RequestHandler;
export default guard;
