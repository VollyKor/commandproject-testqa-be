// interface obj {
//     id: number,
//     text: string
// }

// type fn = (array: obj[]) => obj[]

// const getuniqueQn: fn = (array) => {

// }

// const array = [
//   { id: 1, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '1' },
//   { id: 2, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '2' },
//   { id: 3, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '3' },
//   { id: 4, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '4' },
//   { id: 5, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '5' },
//   { id: 6, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '6' },
//   { id: 7, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '1' },
//   { id: 8, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '2' },
//   { id: 9, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '3' },
//   { id: 10, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '4' },
//   { id: 11, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '5' },
//   { id: 12, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '6' },
//   { id: 13, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '1' },
//   { id: 14, vars: ['1', '2', '3', '4', '5', '6'], rightAnswer: '2' },
// ];

// const answers = [
//   { id: 1, answear: '2' },
//   { id: 2, answear: '2' },
//   { id: 3, answear: '1' },
//   { id: 4, answear: '4' },
//   { id: 6, answear: '2' },
// ];

// console.log('right answers :', countRightAnswears(array, answers));
// console.log('unique questions: ', getuniqueQns(array));

function countRightAnswears(array: any[], answers) {
  const amount = answers.reduce((acc: number, e) => {
    return (acc += compareAnswers(array, e));
  }, 0);

  return amount;
}

export function getuniqueQns<T>(array: T[]): T[] {
  const newArray = [];

  (function getItem() {
    const randomNumber = Math.round(Math.random() * (array.length - 1));

    if (newArray.length >= 12) return;

    if (newArray.includes(array[randomNumber])) {
      return getItem();
    }

    newArray.push(array[randomNumber]);

    return getItem();
  })();
  return newArray;
}

interface As {
  id: number;
  answer: string;
}

interface Aa {
  id: number;
  rightAnswer: string;
}

function compareAnswers(array: Aa[], answer: As): 0 | 1 {
  const question = array.find(e => e.id === answer.id);
  if (question.rightAnswer === answer.answer) return 1;
  return 0;
}
