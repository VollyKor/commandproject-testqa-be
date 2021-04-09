import { model, Schema, SchemaTypes } from 'mongoose';

const SessionSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

const Session = model('session', SessionSchema);

export default Session;
