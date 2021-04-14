import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express-serve-static-core';
import Res from '../helpers/Response';
import Users from '../model/M_user';
import * as Session from '../model/M_session';
import { HttpCode } from '../types/enums';
import { Ilogin, Iregistration } from '../types/interfaces';

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_REFRESHTOKEN_SECRET = process.env.JWT_REFRESHTOKEN_SECRET;

const reg = (async (req, res, next) => {
  try {
    const { email, name } = req.body as Iregistration;
    const user = await Users.findByEmail(email);

     if (user) return Res.Conflict(res, 'Email is already use');

    await Users.create({ ...req.body });

    return Res.Created(res, { email, name });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

const login = (async (req, res, next) => {
  try {
    const { email, password } = req.body as Ilogin;
    const user = await Users.findByEmail(email);
    console.log(user);

    const isValidPassword = await user?.validPassword(password);
    console.log(isValidPassword);

    if (!user || !isValidPassword) return Res.Unauthorized(res);

    const session = await Session.create(user._id);

    const payload = { id: user._id, sessionId: session._id };
    const token = jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, JWT_REFRESHTOKEN_SECRET, {
      expiresIn: '7d',
    });

    return Res.Success(res, {
      token,
      refreshToken,
      email,
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

const logout = (async (req, res) => {
  await Session.remove(req.body.sessionId);

  return res.sendStatus(HttpCode.NO_CONTENT);
}) as RequestHandler;

const current = (async (req, res) => {
  const user = req.body.user.user;

  return Res.Success(res, {
    email: user.email,
    name: user.name,
  });
}) as RequestHandler;

export default { reg, login, logout, current };
