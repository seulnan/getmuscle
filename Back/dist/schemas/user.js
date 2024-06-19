import { Schema, model } from 'mongoose';
const userSchema = new Schema({
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
    shared: [{ type: Schema.Types.ObjectId, ref: 'User' }], // 다른 User의 ObjectId를 참조
    friend: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
const user = model('user', userSchema, 'User');
export default user;
