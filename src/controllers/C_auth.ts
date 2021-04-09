import { RequestHandler } from 'express-serve-static-core';
import * as qS from 'query-string';
import axios from 'axios';
import { reqGoogleUserEmail, reqGoogleUserData } from '../helpers/constants';
import { createOrUpdateGoogleUser } from '../model/M_google-user';
import jwt from 'jsonwebtoken';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3010/';
const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost:3000/';
const SECRET_KEY = process.env.JWT_SECRET;

export const googleAuth = (async (req, res) => {
  try {
    const stringifiedParams = qS.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${BASE_URL}/auth/google-redirect`,
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

  const urlParams = qS.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const { data: userData } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const user = await createOrUpdateGoogleUser(userData);

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

  const urlString = qS.stringifyUrl({
    url: FRONT_END_URL,
    query: {
      userEmail: userData.email,
      token,
      refreshToken,
    },
  });

  return res.redirect(urlString);
}) as RequestHandler;
