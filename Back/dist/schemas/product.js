import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
}, { collection: 'Product' });
const Product = mongoose.model('Product', ProductSchema);
export default Product;
