import path from 'path';

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

//  LOG_LEVEL = 'debug' | 'info' | 'error'
export const LOG_LEVEL = 'INFO';

export const PUBLIC_FOLDER_PATH = (): string =>
  path.join(process.cwd(), 'src', 'public');
