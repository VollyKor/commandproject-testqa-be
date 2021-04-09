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
const S_user_1 = __importDefault(require("./schema/S_user"));
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findedUser = yield S_user_1.default.findOne({ email });
    return findedUser;
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findedUser = yield S_user_1.default.findOne({ _id: id });
    return findedUser;
});
const findByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const findedUser = yield S_user_1.default.findOne({ token });
    return findedUser;
});
const create = ({ name, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new S_user_1.default({ name, email, password });
    const savedUser = yield user.save();
    return savedUser;
});
const updateToken = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const uppdatedUser = yield S_user_1.default.updateOne({ _id: id }, { token });
    return uppdatedUser;
});
exports.default = {
    findByEmail,
    findById,
    findByToken,
    create,
    updateToken,
};
// const verify = async (req, res, next) => {
//     const id = req.user.id
//     await Users.updateToken(id, null)
//     return res.status(HttpCode.NO_CONTENT).json({})
// }
// const updateAvatar = async (id, avatar, imgIdCloud) => {
//     return await User.updateOne({ _id: id }, { avatar, imgIdCloud })
// }
// const updateVerifyToken = async (id, verify, verifyToken) => {
//     return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken }) // [1]
// }
// const findByVerifyToken: TFindUserByValue<string> = async verifyToken => {
//     return await User.findOne({ verifyToken })
// }
//# sourceMappingURL=M_user.js.map