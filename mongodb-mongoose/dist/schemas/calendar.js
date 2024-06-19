import mongoose, { Schema } from 'mongoose';
const CalendarSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, required: true },
    date_exercise: { type: [Date], default: [] },
    id: { type: Schema.Types.ObjectId, required: true }, // 게시글 id
    ymd: { type: Date, required: true },
    date_rest: { type: [Date], default: [] }
}, { collection: 'Calendar' });
const Calendar = mongoose.model('Calendar', CalendarSchema);
export default Calendar;
