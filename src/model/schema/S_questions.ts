import { model, Schema } from 'mongoose';
import { testType } from '../../types/enums';

import { Iquestion, TqnModel } from '../../types/interfaces';

const QuestionSchema = new Schema<Iquestion, TqnModel>(
  {
    type: {
      type: String,
      enum: [testType.QA, testType.TESTTHEORY, testType.COMMON],
      default: testType.COMMON,
    },
    question: {
      type: String,
      required: [true, 'miss question'],
    },
    answers: {
      type: Array,
      required: [true, 'miss array of answers'],
    },
    rightAnswer: {
      type: String,
      required: [true, 'miss right Answer'],
    },
  },
  { versionKey: false, timestamps: true },
);

const Question = model('question', QuestionSchema);

export default Question;
