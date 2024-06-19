import mongoose, {Schema, Document} from 'mongoose';


export interface IProduct extends Document {
    img :String,
    name: String,
    price: Number,
    
}

const ProductSchema: Schema = new Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},

}, { collection: 'Product'});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;