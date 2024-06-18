import {ObjectId, Schema, model} from 'mongoose';
import { isStringObject } from 'util/types';

export interface IUser{
    ID:string,
    password: string;
    nickname : string;
    exc_purpose : Array<string>;
    exc_history : number;
    height : number;
    weight : number;
    address : string;
    POINT : number;
    profile : string;
    shared :  string[];
    friend :  string[];
}

const userSchema = new Schema<IUser>({ 
    ID: { type: String, required: true }, 
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    exc_purpose: [{ type: String }], // 배열 안의 각 요소가 String 타입인 배열
    exc_history: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    address: { type: String },
    POINT: { type: Number },
    profile: { type: String },
    shared: [{ type: String }], // 다른 User의 ObjectId를 참조
    friend: [{ type: String }],
    
});
const user =  model<IUser>('user', userSchema, 'User');
export default user;