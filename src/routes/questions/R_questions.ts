import express from 'express';
import Questions from '../../controllers/C_questions';
import guard from '../../helpers/guard';
import tryCatch from '../../helpers/tryCatch';
import { answersValidation } from './questionsValidation';
// =================================================
// import { testType } from '../../helpers/constants'
// import QN from '../../model/schema/S_questions'

const router = express.Router();

router.get('/', guard, tryCatch(Questions.getByType));
router.get(
  '/answers',
  [guard, answersValidation],
  tryCatch(Questions.compareAnswers),
);
router.get('/all', guard, tryCatch(Questions.getAll));

export default router;
