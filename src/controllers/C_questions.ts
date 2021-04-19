import { RequestHandler } from 'express-serve-static-core';
import Questions from '../model/M_questions';
import { testType } from '../types/enums';
import getuniqueQns from '../helpers/getuniqueQn';
import countRightAnswears from '../helpers/compareAnswersFn';
import Res from '../helpers/Response';
import { IreqAnswer } from '../types/interfaces';

const getAll = (async (_, res) => {
  const data = await Questions.getAll();
  return Res.Success(res, data);
}) as RequestHandler;

const getByType = (async (req, res) => {
  const testquery = req.query.test;

  const isValidTestQuery =
    testquery === testType.QA ||
    testquery === testType.COMMON ||
    testquery === testType.TESTTHEORY;

  if (!isValidTestQuery) return Res.BadRequest(res);

  if (testquery === testType.QA) {
    const questions = await Questions.getByTypeWithoutAnswers(testType.QA);
    const data = getuniqueQns(questions);
    return Res.Success(res, data);
  }
  if (testquery === testType.TESTTHEORY) {
    const questions = await Questions.getByTypeWithoutAnswers(
      testType.TESTTHEORY,
    );
    const data = getuniqueQns(questions);
    return Res.Success(res, data);
  }

  const questions = await Questions.getByTypeWithoutAnswers(testType.COMMON);
  return Res.Success(res, questions);
}) as RequestHandler;

const compareAnswers = (async (req, res) => {
  const { answers, type } = req.body;
  const questions = await Questions.getByType(type);

  const amount = countRightAnswears(questions, answers);

  if (amount === undefined)
    return Res.BadRequest(res, 'Something wrong with questions');

  return Res.Success(res, { amountOfRightAnswers: amount });
}) as RequestHandler<unknown, unknown, IreqAnswer>;

export default { getByType, getAll, compareAnswers };
