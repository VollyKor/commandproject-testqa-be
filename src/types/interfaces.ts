import { Document, Model } from 'mongoose';
import { testType } from '../helpers/constants';

//  User Interfaces
// ===========================================
export type TuserModel = Model<Iuser>;

export interface Ilogin {
  email: string;
  password: string;
}

export interface InewUser extends Ilogin {
  name: string;
}

export interface IdbUser {
  name: string;
  email: string;
  results?: {
    qaResult: number | null;
    testTheoryResult: number | null;
  };
  refreshToken?: string;
}

export interface Iuser extends IdbUser, Document {
  password: string;
  validPassword(password: string): boolean;
}
// ===========================================
// ===========================================

//  Session Interfaces
// ===========================================
export type TsessionModel = Model<IsessionDocument>;

export interface IsessionDocument extends Isession, Document {}

export interface Isession {
  userId: string;
}
// ==============================================
// ==============================================

//  Question Interfaces
// ===========================================
export type TqnModel = Model<Iquestion>;

export interface Iquestion extends InewQuestion, Document {}

export interface InewQuestion {
  type: testType;
  answers: string[];
  question: string[];
  rightAnswer: string;
}

// ===========================================
// ===========================================

//  GoogleUser Interfaces
// ===========================================
export type TgoogleUserModel = Model<IgoogleUser>;

export interface IgoogleUser extends IdbGoogleUser, Document {}

export interface IdbGoogleUser {
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

//  User Types
// =====================================================================
export type TfindUserByValue = (value: string) => Promise<Iuser>;
export type TcreateUser = (newuser: InewUser) => Promise<Iuser>;

// Answer Validation
// ==============================================
export interface Ianswer {
  _id: string;
  answer: string;
}

export interface Ianswers {
  type: string;
  answers: Ianswer[];
}
