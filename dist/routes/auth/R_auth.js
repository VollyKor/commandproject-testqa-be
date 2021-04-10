"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const C_auth_1 = require("../../controllers/C_auth");
const router = express_1.default.Router();
router.get('/google', C_auth_1.googleAuth);
router.get('/google-redirect', C_auth_1.googleRedirect);
exports.default = router;
//# sourceMappingURL=R_auth.js.map