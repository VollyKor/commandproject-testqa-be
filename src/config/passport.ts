import passport from 'passport';
import User from '../model/M_user';
import GoogleUser from '../model/M_google-user';
import { Strategy, ExtractJwt } from 'passport-jwt';

import Session from '../model/schema/S_session';
import { ItokenPayload } from '../types/interfaces';

import dotenv from 'dotenv';
dotenv.config();

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_REFRESHTOKEN_SECRET = process.env.JWT_REFRESHTOKEN_SECRET;

const jwtParams = {
  secretOrKey: JWT_TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  'jwt',
  new Strategy(jwtParams, async (payload: ItokenPayload, done) => {
    const { id, sessionId, googleAuth } = payload;

    const session = await Session.findById(sessionId);

    if (googleAuth) {
      const user = await GoogleUser.find(id);

      if (!user && !session) {
        return done(new Error('User not found'));
      }

      const nextPayload = {
        user,
        sessionId,
        googleAuth,
      };

      return done(null, nextPayload);
    }
    const user = await User.findById(payload.id);

    if (!session) return done(new Error('Session not found'));
    if (!user) return done(new Error('User not found'));

    const nextPayload = {
      user,
      sessionId,
    };
    return done(null, nextPayload);
  }),
);

const jwtRefreshParams = {
  secretOrKey: JWT_REFRESHTOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  'jwt-refresh',
  new Strategy(jwtRefreshParams, async (payload: ItokenPayload, done) => {
    const { id, sessionId, googleAuth } = payload;

    const session = await Session.findById(sessionId);

    if (googleAuth) {
      const user = await GoogleUser.find(id);

      if (!user && !session) {
        return done(new Error('User not found'));
      }

      const nextPayload = {
        user,
        sessionId,
        googleAuth,
      };

      return done(null, nextPayload);
    }
    const user = await User.findById(payload.id);

    if (!session) return done(new Error('Session not found'));
    if (!user) return done(new Error('User not found'));

    const nextPayload = {
      user,
      sessionId,
    };
    return done(null, nextPayload);
  }),
);
