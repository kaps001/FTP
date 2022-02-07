const mongoose = require('mongoose');

const  studentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    transection_type:String,
    amount:Number,
    description:String
})

module.exports = mongoose.model('Student',studentSchema);