import { Schema, model } from 'mongoose';
class work {
    types;
    count;
    set;
}
const recordSchema = new Schema({
    exc_data: [{ type: work }],
    exc_time: { type: Number },
    exc_number: { type: Number },
    exc_weight: { type: Number },
    exc_image: { type: String },
    exc_memo: { type: String },
    exc_share: { type: Boolean }
});
const record = model('record', recordSchema, 'Record');
export default record;
