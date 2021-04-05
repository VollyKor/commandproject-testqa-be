import Questions from './schema/S_questions';
import { testType } from '../helpers/constants';
import { Question } from '../types/interfaces';

const getAll = async (): Promise<Question[]> => {
  const questions: Question[] = await Questions.find({});

  return questions;
};

const getByType = async (type: testType): Promise<Question[]> => {
  const questions: Question[] = await Questions.find({ type });
  return questions;
};

export default { getAll, getByType };
