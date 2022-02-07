const mongoose = new require('mongoose');
const  totalBalanceSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    total_running_balance:Number,
    total_credit_amount:Number,
    transection_date:String
});
totalBalanceSchema.set('timestamps', true);
module.exports = mongoose.model('TotalBalanceSchema',totalBalanceSchema);