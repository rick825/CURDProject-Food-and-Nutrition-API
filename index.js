const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const app =  express();

// mongo
const connectDB = require('./server/db/db');


// env
dotenv.config({path:'config.env'});
const PORT = process.env.PORT ||3000


// middleware
app.use(bodyparser.urlencoded({extended:true}));

connectDB();

//assets
app.use(express.static("public"));

// routes
app.use("/",require('./server/routes/routes'));




app.listen(PORT,()=>{
    console.log(`Server is running Host is connected http://localhost:${PORT}`);
});