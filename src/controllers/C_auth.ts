import axios from 'axios';
import jwt from 'jsonwebtoken';

import * as qS from 'query-string';
import * as Session from '../model/M_session';

import { RequestHandler } from 'express-serve-static-core';
import { reqGoogleUserEmail, reqGoogleUserData } from '../helpers/constants';
import { HttpCode, statusCode } from '../types/enums';
import { createOrUpdateGoogleUser } from '../model/M_google-user';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3010';
const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost:3000';
const SECRET_KEY = process.env.JWT_SECRET;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const googleAuth = (async (_, res) => {
  const stringifiedParams = qS.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/auth/google-redirect`,
    scope: [reqGoogleUserEmail, reqGoogleUserData].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );
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
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
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
  const session = await Session.create(user._id);

  const payload = {
    id: user._id,
    sessionId: session._id,
    googleAuth: true,
  };

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

export const refreshTokens = (async (req, res) => {
  const user = req.body.user;

  if (!user) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: statusCode.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: 'Bad request',
    });
  }

  const payload = {
    userid: user._id,
    sessionId: user.sessionId,
  };
  console.log('payload in refreshToken rout', payload);

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

  res.status(HttpCode.OK).json({
    status: statusCode.SUCCESS,
    code: HttpCode.OK,
    data: { token, refreshToken, email: user.email },
  });
  return console.log('refreshTokens');
}) as RequestHandler;
