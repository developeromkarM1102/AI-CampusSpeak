const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
       console.log("Database connected successfully!");
    })
    .catch((err)=>{
        console.log("MongoDB connection error??");
    }) 
}

module.exports = connectDB;