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
exports.find = exports.createOrUpdateGoogleUser = void 0;
const S_googleUser_1 = __importDefault(require("./schema/S_googleUser"));
const createOrUpdateGoogleUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield S_googleUser_1.default.find({ email: data.email });
    if (!user) {
        const newUser = yield S_googleUser_1.default.create(Object.assign({}, data));
        yield newUser.save();
        return newUser;
    }
    yield S_googleUser_1.default.updateOne({ googleUserId: data.googleUserId }, Object.assign({}, data));
    const [updatedUser] = yield S_googleUser_1.default.find({ email: data.email });
    return updatedUser;
});
exports.createOrUpdateGoogleUser = createOrUpdateGoogleUser;
const find = id => {
    const user = S_googleUser_1.default.findById(id);
    return user;
};
exports.find = find;
exports.default = { createOrUpdateGoogleUser: exports.createOrUpdateGoogleUser, find: exports.find };
//# sourceMappingURL=M_google-user.js.map