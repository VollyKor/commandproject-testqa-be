import express from 'express';
import Questions from '../../controllers/C_questions';
import guard from '../../helpers/guard';
// =================================================
// import { testType } from '../../helpers/constants'
// import QN from '../../model/schema/S_questions'

const router = express.Router();

router.get('/', guard, Questions.getByType);

router.get('/all', guard, Questions.getAll);

export default router;
