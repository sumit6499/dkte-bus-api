const express = require('express');
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const Student =  require("../models/Student");
require("dotenv").config();


// Auth middleware
exports.auth = async(req, res, next) => {
    try{      
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        //console.log(token);
        if(!token){
            return res.status(401).json({
                success : false,
                message : `Token is missing`
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token Payload:", decode);
            req.user = decode;
          } catch (error) {
            console.error("Error decoding token:", error);
            return res.status(401).json({
              success: false,
              message: "Token is invalid",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success : false,
            message : `Something went wrong while valadating the token`
        });
    }
} 

// Student role middleware
exports.isStudent = async(req, res, next) => {
    try{
            if(req.user.accountType !== "Student"){
                return res.status(401).json({
                    success : false,
                    message : "This is protected route for Students only"
                })
            }
            next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Student role cannot be verified, please try again"
        });
    }
}


// Admin role middleware
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for Admin only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Student role cannot be verified, please try again"
        })
    }
}

// Institute Member role middleware
exports.isInstituteMember = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Institute_Admin"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for Aicte-Members only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Student role cannot be verified, please try again"
        })
    }
}



