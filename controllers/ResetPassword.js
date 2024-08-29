const Student = require("../models/Student");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


exports.resetPasswordToken = async(req,  res) => {
    try{
        const email = req.body.email;
        const user = await Student.findOne({email : email});
        if(!user){
            return res.json({
                success : false,
                message : `This Email: ${email} is not registered with us Enter a valid Email`
            });
        }
        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await Student.findOneAndUpdate({ email : email }, { token : token, resetPasswordExpires: Date.now() + 3600000 }, { new : true }); // 1hr
        console.log("Details", updatedDetails);

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Reset Password", `Your Link for Email Verification is ${url}. Please click this url to reset your password`);

        res.status(200).json({
            success : true,
            message : "Email Send Successfully, Please Check Your Email to Continue Further"
        })
    }
    catch(error){
        return res.json({
            error : error.message,
            success : false,
            message : `Some Error in Sending the Reset Message`
        })
    }
}


exports.resetPassword = async(req, res) => {
    try{
        const { password, confirmPassword, token } = req.body;

        if(confirmPassword !== password){
            return res.json({
                success : false,
                message : "Password and Confirm Password Does not Match"
            });
        }
        const userDetails = await Student.findOne({token : token});
        if(!userDetails){
            return res.json({
                success : false,
                message : "Token is Invalid"
            });
        }
        if(!(userDetails.resetPasswordExpires > Date.now())) {
            return res.json({
                success : false,
                message : "Token is Expired, Please Regenerate Your Token"
            });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        await Student.findOneAndUpdate({token : token}, { password : encryptedPassword }, { new : true } );

        res.status(200).json({
            success : true,
            message : `Password Reset Successfull`
        })
    }
    catch(err){
        return res.status(500).json({
            error : err.message,
            success : false,
            message : `Some Error in Updating the Password`
        })
    }
}

