import { Schema, model } from 'mongoose';

export interface IWork {
    type: Array<string>;
    count: Array<string>;
    set: number;
}

class work implements IWork {
    type: Array<string>;
    count: Array<string>;
    set: number;

    constructor(type: Array<string>, count: Array<string>, set: number) {
        this.type = type;
        this.count = count;
        this.set = set;
    }
}

export interface IRecord {
    userID : string;
    exc_data: Array<work>;
    exc_time: number;
    exc_number: number;
    exc_weight: number;
    exc_image: string;
    exc_memo: string;
    exc_share: boolean;
    exc_date : Date;
}

const RecordSchema = new Schema<IRecord>({
    exc_data: [{
        type: {
            type: [String],
            count: [String],
            set: Number
        }
    }],
    userID : {type : String},
    exc_time: { type: Number },
    exc_number: { type: Number },
    exc_weight: { type: Number },
    exc_image: { type: String },
    exc_memo: { type: String },
    exc_share: { type: Boolean },
    exc_date: {type: Date}
});

const record = model<IRecord>('record', RecordSchema, 'Record');
export default record;
