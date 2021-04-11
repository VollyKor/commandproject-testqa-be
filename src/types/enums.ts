export enum HttpCode {
  // Success
  // =======================
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // Error
  // =======================
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  // ServerError
  // =======================
  INTERNAL_SERVER_ERROR = 500,
}

export enum testType {
  QA = 'qa',
  TESTTHEORY = 'testTheory',
  COMMON = 'common',
}

export enum statusCode {
  SUCCESS = 'success',
  ERROR = 'error',
}
