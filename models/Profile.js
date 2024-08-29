const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true
    },
    lastName : {
        type : String,
        trim : true
    },
    year:{
        type:String,
        trim:true,
        // enum : ["FE", "SE", "TE", "BE"],
    },
    branch:{
        type:String,
        trim:true,
        // enum : ["Computer Science", "Information Technology", "Mechanical", "Electrical", "Electronics", "Textile"],
    },
    busno:{
        type:String,
        trim:true
    },
    phno:{
        type:String,
        trim:true
    },
    profileImage : {
        type : String,
    },
    address:{
        type:String,
        trim:true
    },
    bussPass:[
        {
            
            busPassId:{
                type:String,
                trim:true
            },
            busFrom:{
                type:String,
                trim:true
            },
            busDestination:{
                type:String,
                trim:true
            },
            busSubDestination:{
                type:String,
                trim:true
            },
            applyDate:{
                type: String,
                trim:true,
            },
            validDate:{
                type:String,
                trim:true
            },
            receiptId:{
                type:String,
                trim:true
            },
            amount: { 
                type: Number 
            },
            razorpay_order_id:{
                type:String,
            },
            createdAt: { 
                type: Date
            },
        }
    ],
    status:{
        type:String,
        trim:true,
        enum : ["Pending", "Approved", "Rejected"],
    },
    isAvailable:{
        type:String,
        trim:true
    },
});

module.exports = mongoose.model("StudentProfile", profileSchema);
