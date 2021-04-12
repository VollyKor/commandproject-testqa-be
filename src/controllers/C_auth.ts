import axios from 'axios';
import jwt from 'jsonwebtoken';
import Res from '../helpers/Response';
import * as qS from 'query-string';
import * as Session from '../model/M_session';

import { RequestHandler } from 'express-serve-static-core';
import { reqGoogleUserEmail, reqGoogleUserData } from '../helpers/constants';
import { createOrUpdateGoogleUser } from '../model/M_google-user';
import { ItokenPayload, IuserPayload } from '../types/interfaces';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3010';
const FRONT_END_URL = process.env.FRONT_END_URL || 'http://localhost:3000';

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_REFRESHTOKEN_SECRET = process.env.JWT_REFRESHTOKEN_SECRET;

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

  const token = jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, JWT_REFRESHTOKEN_SECRET, {
    expiresIn: '7d',
  });

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
  req.body as IuserPayload;

  const user = req.body.user;

  if (!user) {
    return Res.BadRequest(res);
  }

  const payload: ItokenPayload = {
    id: user._id,
    sessionId: req.body.sessionId,
    googleAuth: req.body.googleAuth,
  };

  const token = jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, JWT_REFRESHTOKEN_SECRET, {
    expiresIn: '7d',
  });

  return Res.Success(res, { token, refreshToken, email: user.email });
}) as RequestHandler;
