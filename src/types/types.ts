import { InewUser, Iuser } from './interfaces';

//  User Types
// =====================================================================
export type TfindUserByValue = (value: string) => Promise<Iuser>;
export type TcreateUser = (newuser: InewUser) => Promise<Iuser>;
