import express from 'express';
import Questions from '../../controllers/C_questions';
import guard from '../../helpers/guard';
import tryCatch from '../../helpers/tryCatch';
import { answersValidation } from './questionsValidation';
// =================================================
// import { testType } from '../../helpers/constants'
// import QN from '../../model/schema/S_questions'

const router = express.Router();

router.get('/', tryCatch(guard), tryCatch(Questions.getByType));
router.get('/answers', answersValidation, tryCatch(Questions.compareAnswers));
router.get('/all', tryCatch(guard), tryCatch(Questions.getAll));

export default router;
