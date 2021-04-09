import jwt from 'jsonwebtoken';
import Users from '../model/M_user';
import { HttpCode } from '../helpers/constants';
import { RequestHandler } from 'express-serve-static-core';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

interface Ireg {
  email: string;
  name?: string;
  password: string;
}

const reg = (async (req, res, next) => {
  try {
    const { email, name } = req.body as Ireg;

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
    console.log('error', e.body);
    next(e);
  }
}) as RequestHandler;

const login = (async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);

    const isValidPassword = await user?.validPassword(password);
    console.log('isValidPassword', isValidPassword);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });

    Users.updateToken(user._id, token);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        email,
      },
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

const logout = (async (req, res, next) => {
  try {
    // const id: string = req.user.id
    const { id } = req.body.user;
    Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

const current = (async (req, res, next) => {
  const token = req.get('Authorization').slice(7);
  const { email, name } = await Users.findByToken(token);
  return res.status(200).json({
    email,
    name,
  });
}) as RequestHandler;

export default { reg, login, logout, current };
