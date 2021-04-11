import { NextFunction, Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import { testType } from '../types/enums';

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

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => any;

//  Answers
// ==============================================
export interface IreqAnswer {
  type: testType;
  answers: string[];
}

//  Tokens
// ==============================================
export interface IuserPayload extends ItokenPayload {
  user: Iuser;
}

export interface ItokenPayload {
  id: string;
  sessionId: string;
  googleAuth?: boolean;
}
