"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_FOLDER_PATH = exports.LOG_LEVEL = exports.PORT = exports.SALT_WORK_FACTOR = exports.testType = exports.HttpCode = void 0;
const path_1 = __importDefault(require("path"));
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["CONFLICT"] = 409] = "CONFLICT";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
var testType;
(function (testType) {
    testType["QA"] = "qa";
    testType["TESTTHEORY"] = "testTheory";
    testType["COMMON"] = "common";
})(testType = exports.testType || (exports.testType = {}));
exports.SALT_WORK_FACTOR = 8;
exports.PORT = '3010';
exports.LOG_LEVEL = 'DEBUG';
const PUBLIC_FOLDER_PATH = () => path_1.default.join(process.cwd(), 'public');
exports.PUBLIC_FOLDER_PATH = PUBLIC_FOLDER_PATH;
//# sourceMappingURL=constants.js.map