import path from 'path';

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL_SERVER_ERROR = 500,
}

export enum testType {
  QA = 'qa',
  TESTTHEORY = 'testTheory',
  COMMON = 'common',
}

export const reqGoogleUserEmail =
  'https://www.googleapis.com/auth/userinfo.email';
export const reqGoogleUserData =
  'https://www.googleapis.com/auth/userinfo.profile';

export const SALT_WORK_FACTOR = 8;

// local env vars
// ============================
// BASE_URL=http://localhost:3010
// FRONT_END_URL=http://localhost:3000
export const PORT = '3010';
export const LOG_LEVEL = 'DEBUG';

export const PUBLIC_FOLDER_PATH = (): string =>
  path.join(process.cwd(), 'public');
