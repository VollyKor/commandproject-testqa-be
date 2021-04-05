import { RequestHandler } from 'express-serve-static-core';
import Questions from '../model/M_questions';
import { testType } from '../helpers/constants';
import { getuniqueQns } from '../helpers/getuniqueQn';

const getAll = (async (req, res, next) => {
  try {
    // const userId = req.user.id
    console.log('111');

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
      const questions = await Questions.getByType(testType.QA);
      const data = getuniqueQns(questions);
      return res.json({
        status: 'success',
        code: 200,
        data,
      });
    }

    if (testquery === testType.TESTTHEORY) {
      const questions = await Questions.getByType(testType.TESTTHEORY);
      const data = getuniqueQns(questions);
      return res.json({
        status: 'success',
        code: 200,
        data,
      });
    }

    const data = await Questions.getByType(testType.COMMON);
    return res.json({
      status: 'success',
      code: 200,
      data,
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler;

export default { getByType, getAll };
