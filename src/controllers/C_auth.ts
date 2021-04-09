import { RequestHandler } from 'express-serve-static-core';
import queryString from 'query-string';
import axios from 'axios';
import { reqGoogleUserEmail, reqGoogleUserData } from '../helpers/constants';

export const googleAuth = (async (req, res) => {
  try {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      scope: [reqGoogleUserEmail, reqGoogleUserData].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
    );
  } catch (error) {
    console.log(error);
  }
}) as RequestHandler;

export const googleRedirect = (async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  console.log(queryString.parse(req.originalUrl));

  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  // userData.data.email
  console.log(userData.data);

  return res.redirect(
    // `${process.env.FRONTEND_URL}?email=${userData.data.email}`,
    'http://localhost:3000',
  );
}) as RequestHandler;
