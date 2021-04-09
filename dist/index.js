"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const constants_1 = require("./helpers/constants");
const R_questions_1 = __importDefault(require("./routes/questions/R_questions"));
const users_1 = __importDefault(require("./routes/users/users"));
const R_auth_1 = __importDefault(require("./routes/auth/R_auth"));
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static(constants_1.PUBLIC_FOLDER_PATH()));
// Common routes
// ================================
app.use('/test', R_questions_1.default);
app.use('/users', users_1.default);
app.use('/auth', R_auth_1.default);
app.get('/', (_, response) => {
    response.send('Hello world!');
});
// Path for swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Error handle
// =================================
app.use((req, res) => {
    res.status(constants_1.HttpCode.NOT_FOUND).json({ message: 'Not found app' });
});
app.use(((err, _, res, next) => {
    if (err.status === constants_1.HttpCode.BAD_REQUEST) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json(err);
    }
    res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
}));
exports.default = app;
//# sourceMappingURL=index.js.map