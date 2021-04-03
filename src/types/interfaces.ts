import { Document, Model } from 'mongoose'
import {testType} from '../helpers/constants'

export interface User {
    // check types
    name: string,

    email: string,
    results?: {
        qaResult: number | null,
        testTheoryResult : number | null
    }
    refreshToken?: string,
    sessionId?: string,
    
    // check types
    token: string | null,
    
}

// Export this for strong typing
export interface UserDocument extends User, Document {
    password :string
 }

// For model
export interface UserModel extends Model<UserDocument> {}


export interface Question {
    type: testType
    questions: string[],
    rightAnswer: string
}

export interface qnDocument extends Question, Document {}
export interface qnModel extends Model<qnDocument>{}