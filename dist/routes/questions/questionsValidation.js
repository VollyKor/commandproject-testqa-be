"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answersValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../../helpers/constants");
const answersSchema = joi_1.default.object().keys({
    type: joi_1.default.string().valid('qa', 'testTheory', 'common').required(),
    answers: joi_1.default.array().items(joi_1.default.string()).required()
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
exports.answersValidation = ((req, res, next) => {
    return validate(answersSchema, req.body, next);
});
//# sourceMappingURL=questionsValidation.js.map