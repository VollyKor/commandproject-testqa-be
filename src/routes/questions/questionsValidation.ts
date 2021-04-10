import Joi from 'joi';
import { RequestHandler } from 'express-serve-static-core';
import { HttpCode } from '../../helpers/constants';
import { testType } from '../../helpers/constants';

const answersSchema = Joi.object().keys({
  type: Joi.string()
    .valid(testType.COMMON, testType.QA, testType.TESTTHEORY)
    .required(),
  answers: Joi.array()
    .items(
      Joi.object().keys({
        _id: Joi.string(),
        answer: Joi.string(),
      }),
    )
    .required(),
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

export const answersValidation = ((req, _, next) => {
  return validate(answersSchema, req.body, next);
}) as RequestHandler;
