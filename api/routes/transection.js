const express = require('express');
const router = express.Router();
const Transection = require('../model/transection');
const TotalBalance = require('../model/total-balance');
const mongoose = require('mongoose');

/**
 * Insert the transection data into transection collection
 * @author Ankit Mishra
 * @date 02/02/2021
 */

router.post('/', (req, res, next) => {
      
/*res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Credentials", "true");
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");*/
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    transection_type = req.body.transection_type;
    if (transection_type == "credit") {
        TotalBalance.findOne((err, result) => {
            if (result == null) {
                total_credit_amount = req.body.amount;
                total_running_balance = req.body.amount;
                const totalBalance = TotalBalance({
                    _id: new mongoose.Types.ObjectId,
                    total_credit_amount: total_credit_amount,
                    total_running_balance: total_running_balance
                });
                totalBalance.save();
            } else {
                _id = result._id;
                // calculate total credit balance.
                total_credit_amount = result.total_credit_amount;
                total_credit_amount = req.body.amount + total_credit_amount;


                // calculate total running balance
                total_running_balance = result.total_running_balance;
                total_running_balance = result.total_running_balance + req.body.amount;
                TotalBalance.updateOne({ _id: _id }, { total_credit_amount: total_credit_amount, total_running_balance: total_running_balance }, function (err, result) {
                });
            }
            const transection = new Transection({
                _id: new mongoose.Types.ObjectId,
                transection_type: req.body.transection_type,
                credit_amount: req.body.amount,
                debit_amount: 0,
                description: req.body.description,
                running_balance: total_running_balance,
                transection_date: today,
            });
            transection.save().then(result => {
                res.status(200).json({
                    message: "Amount has been credited.",
                    new_transection: result
                });
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: "Something is wrong so please try again.",
                        error: err
                    });
                });
        });
    }
    /**
     * Apply business logic for debit Amount
     * @author Ankit Mishra
     * @since 04/02/2022
     */
    if (transection_type == "debit") {

        TotalBalance.findOne((err, result) => {
            if (result != null) {
                runningBalance = result.total_running_balance;
                creditAmount = result.total_credit_amount;
                if (runningBalance < req.body.amount) {
                    return res.status(400).json({
                        message: "you are not eligable for debit with this Amount because amount is greeter then credit amount."
                    });
                }
                if (runningBalance == 0) {
                    return res.status(400).json({
                        message: "you are not eligable for debit with this Amount because no amount in walet."
                    });
                }
                _id = result._id;
                debitAmount = req.body.amount;
                runningBalance = runningBalance - debitAmount;
                TotalBalance.updateOne({ _id: _id }, { total_running_balance: runningBalance }, function (err, result) {
                });
                const transection = new Transection({
                    _id: new mongoose.Types.ObjectId,
                    transection_type: req.body.transection_type,
                    credit_amount: 0,
                    debit_amount: req.body.amount,
                    description: req.body.description,
                    running_balance: runningBalance,
                    transection_date: today,
                });
                transection.save().then(result => {
                    return res.status(200).json({
                        message: "Amount has been debited from Account.",
                        new_transection: result
                    });
                })
                    .catch(err => {
                        //console.log(err);
                        return res.status(500).json({
                            message: "Something is wrong so please try again.",
                            error: err
                        });
                    });
            } else {
                res.status(400).json({
                    message: "No any debit amount because you balance is zero."
                });
            }
        });
    }
});

/**
 * get methode for getting all transection according to transection type
 * @author Ankit Mishra
 * @date 03/02/2021
 */

router.get('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    Transection.find().sort({createdAt: -1}).exec((err, data) => {
     if (data != null) {
            return res.status(200).json({
                message: "your all transection data.",
                data: data
            });
        }


 });
});

module.exports = router;
