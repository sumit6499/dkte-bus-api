const mongoose = require("mongoose");

const payment = new mongoose.Schema({
    paymentDone: [
        {
            amount: { 
                type: Number 
            },
            studentId: { 
                type: String 
            },
            razorpay_order_id:{
                type:String,
            },
            createdAt: { 
                type: Date
            },
        }
    ]
});

module.exports = mongoose.model("Payment", payment);
