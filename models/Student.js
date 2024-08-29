const mongoose = require("mongoose");
const { resetPasswordToken } = require("../controllers/ResetPassword");

const userSchema = mongoose.Schema(
    {
        
        email : {
            type : String,
            required : true,
            trim : true,
        },
        studentId : {
            type : String,
            required : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
        },
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
        paymentDoneDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Payment"
        },
        accountType : {
            type : String,
            enum : ["Student", "Institute_Admin"],
            default : "Student"
        },
        tokens : [
            {
                token : {
                    type : String,
                    required : true
                }
            }
        ],
        resetPasswordToken : {
            type: Date,
        }
    }
);

module.exports = mongoose.model("Student", userSchema);