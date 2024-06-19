"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class work {
    constructor(type, count, set) {
        this.type = type;
        this.count = count;
        this.set = set;
    }
}
const RecordSchema = new mongoose_1.Schema({
    exc_data: [{
            type: {
                type: [String],
                count: [String],
                set: Number
            }
        }],
    exc_time: { type: Number },
    exc_number: { type: Number },
    exc_weight: { type: Number },
    exc_image: { type: String },
    exc_memo: { type: String },
    exc_share: { type: Boolean }
});
const record = (0, mongoose_1.model)('record', RecordSchema, 'Record');
exports.default = record;
