import { Iquestion } from '../types/interfaces';

export default function countRightAnswears(
  array: Iquestion[],
  answers: string[],
): number {
  const amount = answers.reduce((acc: number, e) => {
    return (acc += compareAnswers(array, e));
  }, 0);

  return amount;
}

function compareAnswers(array: Iquestion[], answer): 0 | 1 {
  const question = array.find(e => String(e._id) === String(answer._id));
  if (question.rightAnswer === answer.answer) return 1;
  return 0;
}
