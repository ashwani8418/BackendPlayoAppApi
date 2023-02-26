const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please add the user name"],
    },
    email :{
        type : String,
        required : [true, "Please Enter an email address to register"],
        unique : [true, "Email address is already exit"],
    },
    password : {
        type : String,
        required : [true, "Please enter a password"],
    },
}, {
    timestamps :true,
});
module.exports = mongoose.model("User", userSchema);