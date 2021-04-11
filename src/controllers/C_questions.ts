import { RequestHandler } from 'express-serve-static-core';
import Questions from '../model/M_questions';
import { HttpCode, testType } from '../types/enums';
import getuniqueQns from '../helpers/getuniqueQn';
import countRightAnswears from '../helpers/compareAnswersFn';
import { IreqAnswer } from '../types/interfaces';

const getAll = (async (_, res) => {
  const data = await Questions.getAll();
  return res.json({
    status: 'success',
    code: 200,
    data,
  });
}) as RequestHandler;

const getByType = (async (req, res) => {
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
}) as RequestHandler;

const compareAnswers = (async (req, res) => {
  const answers = req.body.answers;
  const questions = await Questions.getByType(req.body.type);

  const amount = countRightAnswears(questions, answers);

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
}) as RequestHandler<unknown, unknown, IreqAnswer>;

export default { getByType, getAll, compareAnswers };
