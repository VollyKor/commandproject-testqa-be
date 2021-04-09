"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidation = exports.registerUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../../helpers/constants");
const registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default.string().alphanum().min(2).max(30).required(),
    name: joi_1.default.string().alphanum().min(2).max(30).optional(),
});
const loginUserSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default.string().alphanum().min(2).max(30).required(),
});
const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj);
    if (error) {
        const [{ message }] = error.details;
        return next({
            status: 'error',
            code: constants_1.HttpCode.BAD_REQUEST,
            message: `${message.replace(/"/g, '')}`,
        });
    }
    next();
};
exports.registerUserValidation = ((req, res, next) => {
    return validate(registerUserSchema, req.body, next);
});
exports.loginUserValidation = ((req, res, next) => {
    return validate(loginUserSchema, req.body, next);
});
//# sourceMappingURL=UserValidation.js.map