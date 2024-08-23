const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter username"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter email address"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        min:6,
        max:32
    },
    role:{
        type:String,
        default:"User"
    }
})

module.exports = mongoose.model("user",UserSchema)