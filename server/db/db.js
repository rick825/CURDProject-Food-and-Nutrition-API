const mongoose = require("mongoose");


const connectDb  = async() =>{
   try{
     const con = await mongoose.connect(process.env.DB_URI);
     console.log(`Mongo is connected to ${con.connection.host}`);
     console.log("✨✔DB Connection Success✔✨");
   }catch{
    console.log("Error connecting to DB", err);
    process.exit;
   }
}


module.exports = connectDb;