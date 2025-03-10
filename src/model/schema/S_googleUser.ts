import { model, Schema, SchemaTypes } from 'mongoose';
import { IUser, UserDocument, UserModel } from '../../types/interfaces';

const GoogleUserSchema = new Schema(
  {
    googleUserId: {
      type: String,
    },

    email: {
      type: String,
      required: [true, 'Email required'],
    },

    verified_email: {
      type: Boolean,
      default: false,
    },

    given_name: {
      type: String,
      default: null,
    },

    family_name: {
      type: String,
      default: null,
    },

    picture: {
      type: String,
      default: null,
    },

    locate: {
      type: String,
      default: null,
    },
    user_data: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

// Document middlewares

const GoogleUser = model('google-user', GoogleUserSchema);

export default GoogleUser;
