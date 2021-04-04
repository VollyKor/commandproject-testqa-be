"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const db_1 = __importDefault(require("../db/db"));
// import dotenv from 'dotenv'
// dotenv.config()
const PORT = process.env.PORT || 3010;
// Connect to Database
// ======================================
db_1.default.then(() => {
    index_1.default.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
}).catch(e => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
});
//# sourceMappingURL=server.js.map