const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({

    name : {
        type:String,
        required : true
    },

    rollNumber : {
        type : Number ,
        required : true
    },

    department : {
        type : String,
        required : true
    },

    contact : {
        type : String,
        required: true

    },

    email :{
        type : String,
        required : true
    },
    
    description :{
        type : String,
        required : true

    },
    
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"],
      default: "pending"
    }
})

const ComplaintModel = mongoose.model("complaint",complaintSchema);
module.exports = ComplaintModel;