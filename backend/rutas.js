const express=require('express');
var interprete = require('./interprete');
const router= express.Router();


router.post('/',(req,res,next)=>{

    var original=req.body.original
    var analizar=req.body.analizar
    var salida=interprete.analizar(original,analizar);
    
    //console.log(salida)

    res.send(salida)
});

module.exports=router;