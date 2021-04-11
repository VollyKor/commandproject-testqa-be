import jwt from 'jsonwebtoken';
import Users from '../model/M_user';
import { HttpCode } from '../types/enums';
import { RequestHandler } from 'express-serve-static-core';
import * as Session from '../model/M_session';

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const JWT_REFRESHTOKEN_SECRET = process.env.JWT_REFRESHTOKEN_SECRET;

interface Iregistration {
  email: string;
  name?: string;
  password: string;
}
interface Ilogin {
  email: string;
  password: string;
}

const reg = (async (req, res, next) => {
  try {
    const { email, name } = req.body as Iregistration;

    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email is already use',
      });
    }

    const { id } = await Users.create({ ...req.body });
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id,
        email,
        name,
      },
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

const login = (async (req, res, next) => {
  try {
    const { email, password } = req.body as Ilogin;
    const user = await Users.findByEmail(email);

    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }
    const session = await Session.create(user._id);

    const payload = { id: user._id, sessionId: session._id };
    const token = jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, JWT_REFRESHTOKEN_SECRET, {
      expiresIn: '7d',
    });

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        refreshToken,
        email,
      },
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

const logout = (async (req, res) => {
  const user = req.body.user;

  const result = await Session.remove(req.body.sessionId);

  res.status(HttpCode.NO_CONTENT).json({});
}) as RequestHandler;

const current = (async (req, res) => {
  const { name, email } = req.body.user;
  return res.status(200).json({
    email,
    name,
  });
}) as RequestHandler;

export default { reg, login, logout, current };
