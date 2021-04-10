"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GoogleUserSchema = new mongoose_1.Schema({
    googleUserId: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email required'],
    },
    verified_email: {
        type: Boolean,
        default: false,
    },
    given_name: {
        type: String,
        default: null,
    },
    family_name: {
        type: String,
        default: null,
    },
    picture: {
        type: String,
        default: null,
    },
    locate: {
        type: String,
        default: null,
    },
    user_data: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'user',
    },
}, { versionKey: false, timestamps: true });
// Document middlewares
const GoogleUser = mongoose_1.model('google-user', GoogleUserSchema);
exports.default = GoogleUser;
//# sourceMappingURL=S_googleUser.js.map