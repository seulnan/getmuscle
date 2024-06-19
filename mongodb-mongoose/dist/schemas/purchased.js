import mongoose, { Schema } from 'mongoose';
const PurchasedSchema = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    arrive_date: { type: Date, required: true },
    arrive_done: { type: Boolean, required: true },
    count: { type: Number, required: true },
    userID: { type: String, required: true },
}, { collection: 'Purchased' });
const Purchased = mongoose.model('Purchased', PurchasedSchema);
export default Purchased;
