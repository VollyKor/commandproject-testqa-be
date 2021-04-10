import Joi from 'joi';
import { NextFunction, RequestHandler } from 'express-serve-static-core';
import { HttpCode, statusCode } from '../../helpers/constants';
import { InewUser, Ilogin } from '../../types/interfaces';

const registerUserSchema: Joi.ObjectSchema<InewUser> = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(24).required(),
  name: Joi.string().alphanum().min(2).max(16).optional(),
});

const loginUserSchema: Joi.ObjectSchema<Ilogin> = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(24).required(),
});

const validate = <T>(schema: Joi.ObjectSchema, obj: T, next: NextFunction) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: statusCode.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: `${message.replace(/"/g, '')}`,
    });
  }
  next();
};

export type Tvalidate<T> = (
  scema: Joi.ObjectSchema<T>,
  obj: T,
  next: NextFunction,
) => void;

export const registerUserValidation = ((req, _, next) => {
  return validate<InewUser>(registerUserSchema, req.body, next);
}) as RequestHandler;

export const loginUserValidation = ((req, _, next) => {
  return validate<Ilogin>(loginUserSchema, req.body, next);
}) as RequestHandler;
