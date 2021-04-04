"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../../helpers/constants");
const QuestionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: [constants_1.testType.QA, constants_1.testType.TESTTHEORY, constants_1.testType.COMMON],
        default: constants_1.testType.COMMON
    },
    questions: {
        type: Array,
        required: [true, 'miss array of questions'],
    },
    rightAnswer: {
        type: String,
        required: [true, 'miss right Answer']
    }
}, { versionKey: false, timestamps: true });
const Question = mongoose_1.model("question", QuestionSchema);
exports.default = Question;
//# sourceMappingURL=S_questions.js.map