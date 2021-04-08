import { RequestHandler } from 'express-serve-static-core';
import queryString from 'query-string';

const reqGoogleUserData = '';
const reqGoogleUserEmail = '';

export const googleAuth = (async (req, res, next) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CLIENT_SECRET,
    scope: [],
  });
  console.log('hello');
}) as RequestHandler;
