import passport from 'passport';
import User from '../model/M_user';
import GoogleUser from '../model/M_google-user';
import { Strategy, ExtractJwt } from 'passport-jwt';

import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      if (payload.googleReg === GOOGLE_CLIENT_SECRET) {
        const user = await GoogleUser.find(payload.id);
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, user);
      } else {
        const user = await User.findById(payload.id);
        if (!user) {
          return done(new Error('User not found'));
        }
        if (!user.token) {
          return done(null, false);
        }
        return done(null, user);
      }
    } catch (err) {
      done(err);
    }
  }),
);
