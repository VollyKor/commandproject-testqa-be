"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../db/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3010;
// Connect to Database
// ======================================
db_1.default.then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
}).catch(e => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
});
//# sourceMappingURL=server.js.map