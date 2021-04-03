import path from 'path'

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}

export enum testType{
    QA = 'qa',
    TESTTHEORY = 'testTheory',
    COMMON = 'common'
}

export const SALT_WORK_FACTOR = 8

export const PORT = '3010';
export const LOG_LEVEL = 'DEBUG';
export const PUBLIC_FOLDER_PATH = () => path.join(process.cwd(), 'public');

// const HttpCode = {
//     OK: 200,
//     CREATED: 201,
//     NO_CONTENT: 204,
//     BAD_REQUEST: 400,
//     UNAUTHORIZED: 401,
//     FORBIDDEN: 403,
//     CONFLICT: 409,
//     INTERNAL_SERVER_ERROR: 500,
// }