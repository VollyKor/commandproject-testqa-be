"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const M_user_1 = __importDefault(require("../model/M_user"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET;
const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport_1.default.use(new passport_jwt_1.Strategy(params, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield M_user_1.default.findById(payload.id);
        if (!user) {
            return done(new Error('User not found'));
        }
        if (!user.token) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        done(err);
    }
})));
//# sourceMappingURL=passport.js.map