const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
   res.status(200).json({
       message : 'this is faculty get methode'
   })
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message : 'this is faculty post methodd'
    });
});

module.exports = router;