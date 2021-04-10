import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { UserDocument, UserModel } from '../../types/interfaces';
import { SALT_WORK_FACTOR } from '../../helpers/constants';

const UserSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },

    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate(value: string) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    token: {
      type: String,
      default: null,
    },

    results: {
      type: Object,
      default: {
        qaResult: null,
        testTheoryResult: null,
      },
    },

    refreshToken: {
      type: String,
      default: null,
      // required: [true, 'Refresh token required'],
    },
  },
  { versionKey: false, timestamps: true },
);

// Document middlewares
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // add password to schema
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

UserSchema.methods.validPassword = async function (password: string) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
};

const User = model<UserDocument, UserModel>('user', UserSchema);

export default User;
