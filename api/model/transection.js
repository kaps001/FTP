const mongoose = new require('mongoose');
const  transectionSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    transection_type:String,
    credit_amount:Number,
    debit_amount:Number,
    description:String,
    running_balance:Number,
    transection_date:String
});
transectionSchema.set('timestamps', true);
module.exports = mongoose.model('Transection',transectionSchema);