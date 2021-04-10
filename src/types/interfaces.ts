import { Document, Model } from 'mongoose';
import { testType } from '../helpers/constants';

//  User Interfaces
// ===========================================
export type TuserModel = Model<IuserDocument>;

export interface InewUser {
  name: string;
  email: string;
  password: string;
}

export interface Iuser {
  name: string;
  email: string;
  results?: {
    qaResult: number | null;
    testTheoryResult: number | null;
  };
  refreshToken?: string;
}

export interface IuserDocument extends Iuser, Document {
  password: string;
  _id: string;
  validPassword(password: string): boolean;
}
// ===========================================
// ===========================================

//  Session Interfaces
// ===========================================
export type TsessionModel = Model<IsessionDocument>;

export interface IsessionDocument extends Isession, Document {
  _id: string;
}

export interface Isession {
  userId: string;
}
// ==============================================
// ==============================================

//  Question Interfaces
// ===========================================
export type TqnModel = Model<IqnDocument>;

export interface IqnDocument extends Iquestion, Document {
  _id: string;
}

export interface Iquestion {
  type: testType;
  answers: string[];
  question: string[];
  rightAnswer: string;
}

export interface IqnDocument extends Iquestion, Document {
  _id: string;
}
// ===========================================
// ===========================================

//  GoogleUser Interfaces
// ===========================================
export type TgoogleUserModel = Model<IgoogleUserDocument>;

export interface IgoogleUserDocument extends IgoogleUser, Document {
  _id: string;
}

export interface IgoogleUser {
  googleUserId: string;
  email: string;
  verified_email?: boolean;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locate?: string;
}
// ===========================================
// ===========================================

// export type TupdateToken = (id: string , token:string) => Promise<IUser>
export type TupdateToken = (id: string, token: string) => void;

export interface IfindUserByValue {
  (value: string): Promise<IuserDocument>;
}
