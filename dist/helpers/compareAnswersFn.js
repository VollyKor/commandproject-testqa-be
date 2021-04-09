"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countRightAnswears = void 0;
function countRightAnswears(array, answers) {
    const amount = answers.reduce((acc, e) => {
        return (acc += compareAnswers(array, e));
    }, 0);
    return amount;
}
exports.countRightAnswears = countRightAnswears;
function compareAnswers(array, answer) {
    const question = array.find(e => String(e._id) === String(answer._id));
    if (question.rightAnswer === answer.answer)
        return 1;
    return 0;
}
//# sourceMappingURL=compareAnswersFn.js.map