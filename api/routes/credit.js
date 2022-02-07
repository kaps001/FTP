const mongoose = new require('mongoose');
const  creditSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    credit_amount:String,
    amount:Number,
    credit_date:String
});
transectionSchema.set('timestamps', true);
module.exports = mongoose.model('Transection',transectionSchema);