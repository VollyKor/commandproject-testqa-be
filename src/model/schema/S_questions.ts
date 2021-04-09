import { model, Schema } from 'mongoose';
import { testType } from '../../helpers/constants';

import { qnDocument, qnModel } from '../../types/interfaces';

const QuestionSchema = new Schema<qnDocument, qnModel>(
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

const Question = model<qnDocument, qnModel>('question', QuestionSchema);

export default Question;
