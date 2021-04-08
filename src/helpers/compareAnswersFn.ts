interface As {
  _id: string;
  answer: string;
}

interface Aa {
  _id: string;
  rightAnswer: string;
}

export function countRightAnswears(array: any[], answers: any): number {
  const amount = answers.reduce((acc: number, e) => {
    return (acc += compareAnswers(array, e));
  }, 0);

  return amount;
}

function compareAnswers(array: Aa[], answer: As): 0 | 1 {
  const question = array.find(e => String(e._id) === String(answer._id));
  if (question.rightAnswer === answer.answer) return 1;
  return 0;
}
