import Joi from 'joi';
import { RequestHandler } from 'express-serve-static-core';

import { HttpCode } from '../../helpers/constants';

const registerUserSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(24).required(),
  name: Joi.string().alphanum().min(2).max(16).optional(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(24).required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: `${message.replace(/"/g, '')}`,
    });
  }
  next();
};

export const registerUserValidation = ((req, res, next) => {
  return validate(registerUserSchema, req.body, next);
}) as RequestHandler;

export const loginUserValidation = ((req, res, next) => {
  return validate(loginUserSchema, req.body, next);
}) as RequestHandler;
