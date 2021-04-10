import { model, Schema } from 'mongoose';
import { testType } from '../../helpers/constants';

import { IqnDocument, TqnModel } from '../../types/interfaces';

const QuestionSchema = new Schema<IqnDocument, TqnModel>(
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

const Question = model<IqnDocument, TqnModel>('question', QuestionSchema);

export default Question;
