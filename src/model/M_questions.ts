import Questions from './schema/S_questions';
import { testType } from '../helpers/constants';
import { Iquestion } from '../types/interfaces';

const getAll = async (): Promise<Iquestion[]> => {
  const questions: Iquestion[] = await Questions.find({});

  return questions;
};

const getByType = async (type: testType): Promise<Iquestion[]> => {
  const questions: Iquestion[] = await Questions.find({ type });
  return questions;
};

const getByTypeWithoutAnswers = async (
  type: testType,
): Promise<Iquestion[]> => {
  const questions: Iquestion[] = await Questions.find(
    { type },
    { rightAnswer: 0, questionId: 0, updatedAt: 0 },
  );
  return questions;
};

export default { getAll, getByType, getByTypeWithoutAnswers };
