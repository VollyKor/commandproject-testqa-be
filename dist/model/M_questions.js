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
const S_questions_1 = __importDefault(require("./schema/S_questions"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield S_questions_1.default.find({});
    return questions;
});
const getByType = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield S_questions_1.default.find({ type });
    return questions;
});
const getByTypeWithoutAnswers = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield S_questions_1.default.find({ type }, { rightAnswer: 0, questionId: 0, updatedAt: 0 });
    return questions;
});
exports.default = { getAll, getByType, getByTypeWithoutAnswers };
//# sourceMappingURL=M_questions.js.map