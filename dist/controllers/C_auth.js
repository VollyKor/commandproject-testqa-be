"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.googleRedirect = exports.googleAuth = void 0;
const qS = __importStar(require("query-string"));
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../helpers/constants");
const M_google_user_1 = require("../model/M_google-user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BASE_URL = process.env.BASE_URL || 'http://localhost:3010';
const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost:3000';
const SECRET_KEY = process.env.JWT_SECRET;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.googleAuth = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stringifiedParams = qS.stringify({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: `${BASE_URL}/auth/google-redirect`,
            scope: [constants_1.reqGoogleUserEmail, constants_1.reqGoogleUserData].join(' '),
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        });
        return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.googleRedirect = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = qS.parse(urlObj.search);
    const code = urlParams.code;
    const tokenData = yield axios_1.default({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: `${BASE_URL}/auth/google-redirect`,
            grant_type: 'authorization_code',
            code,
        },
    });
    const { data: userData } = yield axios_1.default({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });
    const user = yield M_google_user_1.createOrUpdateGoogleUser(userData);
    const payload = { id: user._id, googleReg: GOOGLE_CLIENT_SECRET };
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '7d' });
    const urlString = qS.stringifyUrl({
        url: FRONT_END_URL,
        query: {
            userEmail: userData.email,
            token,
            refreshToken,
        },
    });
    return res.redirect(urlString);
}));
//# sourceMappingURL=C_auth.js.map