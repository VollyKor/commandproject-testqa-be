"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const C_questions_1 = __importDefault(require("../../controllers/C_questions"));
const guard_1 = __importDefault(require("../../helpers/guard"));
// =================================================
// import { testType } from '../../helpers/constants'
// import QN from '../../model/schema/S_questions'
const router = express_1.default.Router();
router.get('/', guard_1.default, C_questions_1.default.getByType);
router.get('/answers', C_questions_1.default.compareAnswers);
router.get('/all', guard_1.default, C_questions_1.default.getAll);
exports.default = router;
//# sourceMappingURL=R_questions.js.map