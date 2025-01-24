import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Please enter email"],
        unique : true
    },

    hashed_token : {
        type : String,
        required : [true, "Please enter hashed token"],
    },

    expiration_duration : {
        type : Number,
        default : 3600
    },

    is_logined : {
        type : Boolean,
        default : false
    },

    expiration_time : {
        type : Number,
        required : [true, "Please enter expiration time"],
    }

}, {timestamps : true});

export const User_auth = mongoose.model("user_auth",userAuthSchema);