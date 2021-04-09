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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const M_user_1 = __importDefault(require("../model/M_user"));
const constants_1 = require("../helpers/constants");
const SECRET_KEY = process.env.JWT_SECRET;
const reg = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        const user = yield M_user_1.default.findByEmail(email);
        if (user) {
            return res.status(constants_1.HttpCode.CONFLICT).json({
                status: 'error',
                code: constants_1.HttpCode.CONFLICT,
                data: 'Conflict',
                message: 'Email is already use',
            });
        }
        const { id } = yield M_user_1.default.create(Object.assign({}, req.body));
        return res.status(constants_1.HttpCode.CREATED).json({
            status: 'success',
            code: constants_1.HttpCode.CREATED,
            data: {
                id,
                email,
                name,
            },
        });
    }
    catch (e) {
        console.log('error', e.body);
        next(e);
    }
}));
const login = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield M_user_1.default.findByEmail(email);
        const isValidPassword = yield (user === null || user === void 0 ? void 0 : user.validPassword(password));
        console.log('isValidPassword', isValidPassword);
        if (!user || !isValidPassword) {
            return res.status(constants_1.HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: constants_1.HttpCode.UNAUTHORIZED,
                data: 'UNAUTHORIZED',
                message: 'Invalid credentials',
            });
        }
        const payload = { id: user._id };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '2h' });
        M_user_1.default.updateToken(user._id, token);
        return res.status(constants_1.HttpCode.OK).json({
            status: 'success',
            code: constants_1.HttpCode.OK,
            data: {
                token,
                email,
            },
        });
    }
    catch (e) {
        next(e);
    }
}));
const logout = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id: string = req.user.id
        const { id } = req.body.user;
        M_user_1.default.updateToken(id, null);
        return res.status(constants_1.HttpCode.NO_CONTENT).json();
    }
    catch (error) {
        next(error);
    }
}));
const current = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('Authorization').slice(7);
    const { email, name } = yield M_user_1.default.findByToken(token);
    return res.status(200).json({
        email,
        name,
    });
}));
exports.default = { reg, login, logout, current };
//# sourceMappingURL=C_user.js.map