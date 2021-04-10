import passport from 'passport';
import User from '../model/M_user';
import GoogleUser from '../model/M_google-user';
import { Strategy, ExtractJwt } from 'passport-jwt';

import dotenv from 'dotenv';
import Session from '../model/schema/S_session';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const session = Session.findById(payload.sessionId);

      if (payload.googleAuth) {
        const user = GoogleUser.find(payload.id);

        const promises = await Promise.all([user, session]);
        console.log('promises google auth', promises);

        if (!user && !session) {
          return done(new Error('User not found'));
        }

        const userwithSessionId = {
          ...user,
          sessionId: payload.sessionId,
        };

        return done(null, userwithSessionId);
      }

      const user = await User.findById(payload.id);
      const promises = await Promise.all([user, session]);
      console.log('promises auth', promises);

      if (!user && !session) {
        return done(new Error('User not found'));
      }

      const userwithSessionId = {
        ...user,
        sessionId: payload.sessionId,
      };

      return done(null, userwithSessionId);
    } catch (err) {
      done(err);
    }
  }),
);
