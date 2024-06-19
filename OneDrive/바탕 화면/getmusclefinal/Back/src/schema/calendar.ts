import mongoose, {Schema, Document, ObjectId, Date} from 'mongoose';



export interface ICalendar extends Document {
    userID: Schema.Types.ObjectId,
    date_exercise: Date[],
    id: ObjectId, //게시글id;
    ymd: Date,
    date_rest: Date[],
}

const CalendarSchema: Schema = new Schema({
    uuserID: { type: Schema.Types.ObjectId, required: true },
    date_exercise: { type: [Date], default: [] },
    id: { type: Schema.Types.ObjectId, required: true }, // 게시글 id
    ymd: { type: Date, required: true },
    date_rest: { type: [Date], default: [] }
}, { collection: 'Calendar'});

const Calendar = mongoose.model<ICalendar>('Calendar', CalendarSchema);

export default Calendar;
