import passport from 'passport'
import User from '../model/M_user'
import {Strategy, ExtractJwt} from 'passport-jwt'

import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
    new Strategy(params, async (payload, done) => {
        try {
            const user = await User.findById(payload.id)
            if (!user) {
                return done(new Error('User not found'))
            }
            if (!user.token) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            done(err)
        }
    }),
)
