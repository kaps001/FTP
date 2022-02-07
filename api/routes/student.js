const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');
const student = require('../model/student');

router.get('/', (req, res, next) => {
    Student.find()
    .then(result=>{
        res.status(200).json({
            mesaage:"all transection data",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"Something is wrong so please try again",
            err:err
        })
    })
});

router.get('/:id',(req,res,next)=>{
    //console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            message:"your data",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"data is not found"
        })
    })
})

router.post('/', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        transection_type: req.body.transection_type,
        amount: req.body.amount,
        description: req.body.description
    });
    student.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "transection has been submitted",
            new_transection: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Something is wrong so please try again",
                error: err
            });
        });
});

module.exports = router;