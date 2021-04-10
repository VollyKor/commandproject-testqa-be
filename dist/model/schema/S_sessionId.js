"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'user',
    },
}, { versionKey: false });
const Session = mongoose_1.model('session', SessionSchema);
exports.default = Session;
//# sourceMappingURL=S_sessionId.js.map