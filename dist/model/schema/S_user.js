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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const constants_1 = require("../../helpers/constants");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minlength: 2,
        default: 'Guest',
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S+/;
            return re.test(String(value).toLowerCase());
        },
    },
    password: {
        type: String,
        required: [true, 'Password required'],
    },
    token: {
        type: String,
        default: null,
    },
    results: {
        type: Object,
        default: {
            qaResult: null,
            testTheoryResult: null
        }
    },
    refreshToken: {
        type: String,
        default: null,
        // required: [true, 'Refresh token required'],
    },
    sessionId: {
        type: String,
        default: null,
        // required: [true, 'sessionId required'],
    },
}, { versionKey: false, timestamps: true });
// Document middlewares
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        // add password to schema
        const salt = yield bcryptjs_1.default.genSalt(constants_1.SALT_WORK_FACTOR);
        this.password = yield bcryptjs_1.default.hash(this.password, salt, null);
        next();
    });
});
UserSchema.methods.validPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValidPassword = yield bcryptjs_1.default.compare(password, this.password);
        return isValidPassword;
    });
};
const User = mongoose_1.model("user", UserSchema);
exports.default = User;
//# sourceMappingURL=S_user.js.map