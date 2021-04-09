import { RequestHandler } from 'express-serve-static-core';
import Questions from '../model/M_questions';
import { HttpCode, testType } from '../helpers/constants';
import { getuniqueQns } from '../helpers/getuniqueQn';
import * as fn from '../helpers/compareAnswersFn';
import { Request } from 'express';

const getAll = (async (req, res, next) => {
  try {
    const data = await Questions.getAll();
    return res.json({
      status: 'success',
      code: 200,
      data,
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

const getByType = (async (req, res, next) => {
  try {
    const testquery = req.query.test;

    if (testquery === testType.QA) {
      const questions = await Questions.getByTypeWithoutAnswers(testType.QA);
      const data = getuniqueQns(questions);
      return res.json({
        status: 'success',
        code: 200,
        data,
      });
    }

    if (testquery === testType.TESTTHEORY) {
      const questions = await Questions.getByTypeWithoutAnswers(
        testType.TESTTHEORY,
      );
      const data = getuniqueQns(questions);
      return res.json({
        status: 'success',
        code: 200,
        data,
      });
    }

    const data = await Questions.getByTypeWithoutAnswers(testType.COMMON);
    return res.json({
      status: 'success',
      code: 200,
      data,
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

interface IreqAnswer {
  type: testType;
  answers: string[];
}

const compareAnswers = (async (
  req: Request<unknown, unknown, IreqAnswer>,
  res,
  next,
) => {
  try {
    const answers: string[] = req.body.answers;
    const questions = await Questions.getByType(req.body.type);

    const amount = fn.countRightAnswears(questions, answers);

    if (amount === undefined) {
      res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Something wrong with questions',
      });
    }

    res.status(HttpCode.OK).json({
      status: 'success',
      code: 200,
      data: {
        amountOfRightAnswers: amount,
      },
    });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

export default { getByType, getAll, compareAnswers };
