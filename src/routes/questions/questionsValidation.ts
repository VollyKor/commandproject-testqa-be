import Joi from 'joi';
import { NextFunction, RequestHandler } from 'express-serve-static-core';
import { testType, HttpCode, statusCode } from '../../types/enums';
import { Ianswers } from '../../types/interfaces';

const answersSchema: Joi.ObjectSchema<Ianswers> = Joi.object().keys({
  user: Joi.object().optional(),
  type: Joi.string()
    .valid(testType.COMMON, testType.QA, testType.TESTTHEORY)
    .required(),
  answers: Joi.array()
    .items(
      Joi.object().keys({
        _id: Joi.string(),
        answer: Joi.string().empty(''),
      }),
    )
    .required(),
});

function validate<T>(schema: Joi.ObjectSchema, obj: T, next: NextFunction) {
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
}

export const answersValidation = ((req, _, next) => {
  console.log(req.body);

  return validate<Ianswers>(answersSchema, req.body, next);
}) as RequestHandler;
