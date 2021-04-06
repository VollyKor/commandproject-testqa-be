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
const M_questions_1 = __importDefault(require("../model/M_questions"));
const constants_1 = require("../helpers/constants");
const getuniqueQn_1 = require("../helpers/getuniqueQn");
const fn = __importStar(require("../helpers/compareAnswersFn"));
const getAll = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield M_questions_1.default.getAll();
        return res.json({
            status: 'success',
            code: 200,
            data,
        });
    }
    catch (e) {
        next(e);
    }
}));
const getByType = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testquery = req.query.test;
        if (testquery === constants_1.testType.QA) {
            const questions = yield M_questions_1.default.getByTypeWithoutAnswers(constants_1.testType.QA);
            const data = getuniqueQn_1.getuniqueQns(questions);
            return res.json({
                status: 'success',
                code: 200,
                data,
            });
        }
        if (testquery === constants_1.testType.TESTTHEORY) {
            const questions = yield M_questions_1.default.getByTypeWithoutAnswers(constants_1.testType.TESTTHEORY);
            const data = getuniqueQn_1.getuniqueQns(questions);
            return res.json({
                status: 'success',
                code: 200,
                data,
            });
        }
        const data = yield M_questions_1.default.getByTypeWithoutAnswers(constants_1.testType.COMMON);
        return res.json({
            status: 'success',
            code: 200,
            data,
        });
    }
    catch (e) {
        next(e);
    }
}));
const compareAnswers = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body.answers;
        const questions = yield M_questions_1.default.getByType(req.body.type);
        const amount = fn.countRightAnswears(questions, answers);
        res.status(constants_1.HttpCode.OK).json({
            status: 'success',
            code: 200,
            data: {
                amountOfRightAnswers: amount,
            },
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = { getByType, getAll, compareAnswers };
//# sourceMappingURL=C_questions.js.map