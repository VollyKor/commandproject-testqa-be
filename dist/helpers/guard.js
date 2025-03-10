"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("./constants");
require("../config/passport");
const guard = ((req, res, next) => {
    if (req.get('Authorization') === undefined) {
        return res.status(constants_1.HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: constants_1.HttpCode.UNAUTHORIZED,
            data: 'Unauthorized',
        });
    }
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        var _a;
        const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (err || !token) {
            return res.status(constants_1.HttpCode.FORBIDDEN).json({
                status: 'error',
                code: constants_1.HttpCode.FORBIDDEN,
                data: 'Forbidden',
                message: 'Access is denied',
            });
        }
        req.body.user = user;
        return next();
    })(req, res, next);
});
exports.default = guard;
//# sourceMappingURL=guard.js.map