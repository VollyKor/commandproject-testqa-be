"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guard_1 = __importDefault(require("../../helpers/guard"));
const C_user_1 = __importDefault(require("../../controllers/C_user"));
const UserValidation_1 = require("./UserValidation");
const router = express_1.default.Router();
router
    .post('/registration', UserValidation_1.registerUserValidation, C_user_1.default.reg)
    .post('/login', UserValidation_1.loginUserValidation, C_user_1.default.login)
    .post('/logout', guard_1.default, C_user_1.default.logout)
    .get('/current', guard_1.default, C_user_1.default.current);
exports.default = router;
//# sourceMappingURL=users.js.map