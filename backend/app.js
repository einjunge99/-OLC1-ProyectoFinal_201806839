const express = require("express");
const app=express();
const cors = require("cors")
app.use(cors())

app.use(express.json())     

const rutas=require("./rutas");


app.use('/analisis',rutas)

module.exports=app;