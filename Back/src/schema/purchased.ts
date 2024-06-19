import mongoose, {Schema, Document} from 'mongoose';



//user아이디 추가하는거해야됨. 
export interface IPurchased extends Document {
    img: string,
    name: string,
    price: number,
    order_date: Date,
    arrive_date: Date,
    arrive_done: boolean,
    count: number
    userID: string,
}

const PurchasedSchema: Schema = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    order_date: {type : Date, required: true},
    arrive_date: { type: Date, required: true },
    arrive_done: { type: Boolean, required: true },
    count: { type: Number, required: true },
    userID: { type: String, required: true},

}, { collection: 'Purchased'});

const Purchased = mongoose.model<IPurchased>('Purchased', PurchasedSchema);

export default Purchased;