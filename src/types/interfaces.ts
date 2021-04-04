import { Document, Model } from 'mongoose'
import {testType} from '../helpers/constants'



export interface IUser {
    // check types
    name: string,
    // _id: string,
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

export interface InewUser {
    name: string,
    email: string,
    password: string,

}

// Export this for strong typing
export interface UserDocument extends IUser, Document {
    password: string
    _id:string
    validPassword (password: string) : boolean
 }

// For model
export type UserModel = Model<UserDocument>


export interface Question {
    type: testType
    questions: string[],
    rightAnswer: string
}

export interface qnDocument extends Question, Document { }


export type qnModel = Model<qnDocument>

export interface IFindUserByValue<Value>  {
    (value: Value) : Promise<UserDocument>
    }

// export type TupdateToken = (id: string , token:string) => Promise<IUser>
export type TupdateToken = (id: string , token:string) => void