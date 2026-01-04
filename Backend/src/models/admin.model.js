const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const adminModel = mongoose.model("admin",adminschema);
module.exports = adminModel;