const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
                ID: String, 
                password: String,
                nickname : String,
                exc_purpose : [String],
                exc_history : Number,
                height : Number,
                weight : Number,
                address : String,
                POINT : Number,
                profile : String,
                shared : [{type: mongoose.Schema.Types.ObjectId}],
                friend : [{type: mongoose.Schema.Types.ObjectId}]
            }); 
 
module.exports = mongoose.model('user', userSchema, 'User');