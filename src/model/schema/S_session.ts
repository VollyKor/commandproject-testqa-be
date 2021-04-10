import { model, Schema, SchemaTypes } from 'mongoose';

const SessionSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

SessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

const Session = model('session', SessionSchema);

export default Session;
