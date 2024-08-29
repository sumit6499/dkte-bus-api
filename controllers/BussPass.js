const { validationResult } = require("express-validator");
const Student = require("../models/Student");
const BussPass = require("../models/Profile");
const Payment = require("../models/Paymnet")
const moment = require("moment");
const mailSender = require("../utils/mailSender");
const Razorpay = require('razorpay');
const { successfullyRegistered } = require("../mail/successfullyRegistration");
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.applyForBusPass = async (req, res) => {
  try {
    const { busFrom, busDestination, busSubDestination, validDate, applyDate, amount} = req.body;
    const id = req.user.id;

    console.log(amount);

    const studentDetails = await Student.findOne({ _id: id });
    const studentProfile = await BussPass.findById(studentDetails.additionalDetails);
    const studentId = studentDetails.studentId;

    // console.log(studentId);

    const busPassId = generateBusPassId(studentId);
    const busPass = {
      busPassId,
      busFrom,
      busDestination,
      busSubDestination,
      applyDate,
      validDate,
    };

    // Add the payment details
    //console.log("amount",amount);
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    
    const paymentDetails = {
      razorpay_order_id: order.id,
      amount:(options.amount)/100,
      createdAt: new Date(),
    };

    //console.log("Payment Details",paymentDetails);

    studentProfile.bussPass.push(
      {
        busPassId: busPass.busPassId,
        busFrom: busPass.busFrom,
        busDestination: busPass.busDestination,
        busSubDestination: busPass.busSubDestination,
        applyDate: busPass.applyDate,
        validDate: busPass.validDate,
        receiptId: `BT${Math.floor(Math.random() * 1000000000)}`,
        amount: options.amount / 100,
        razorpay_order_id: paymentDetails.razorpay_order_id,
        createdAt: paymentDetails.createdAt,
      }
    );
    await studentProfile.save();

    // try{
    //   const emailResponse = await mailSender(
    //     studentDetails.email, `Your Bus Pass Application is Successfully Registered`,
    //     successfullyRegistered(studentDetails.firstName,paymentDetails.receiptId,paymentDetails.amount,
    //       busPass.applyDate,
    //       busPass.validDate,
    //       busPass.busPassId,
    //       )

    //   );

    // }catch(err){
    //     res.status(200).json({
    //     success: true,
    //     message: "Student Registered Successfully",
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Bus Pass Applied Successfully",
      order,
      data: studentProfile,
    });
  } catch (error) {
    console.log("Error: ",error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


function generateBusPassId(studentId) {
    // Implement your logic to generate a unique bus pass number
    // For example, you can use a combination of timestamp and random numbers
    //make 8 character string with studentId last 3digit and startt with DKTE and created date date and month iclude
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const busPassId = "DKTE" + studentId.slice(-3) + moment().format("DDMM")+ 
    randomNum.toString();
    return busPassId;
}


// Renew Bus Pass with new Valid Date
exports.renewBusPass = async (req, res) => {
    try {
      // Validate input using express-validator or other validation method
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
  
      // Extract necessary information from the request
      const { studentId, validDate, busPassId } = req.body;
  
      const parsedValidDate = moment(validDate, "DD/MM/YYYY").toDate();
  
      // Find the student profile and add the bus pass to the array
      const studentProfile = await BussPass.findOne({ studentId });
  
      if (!studentProfile) {
        return res.status(400).json({
          success: false,
          message: "Student profile not found",
        });
      }
  
      // Find the bus pass to be renewed
      const busPass = studentProfile.bussPass.find(
        (busPass) => busPass.busPassId === busPassId
      );
  
      if (!busPass) {
        return res.status(400).json({
          success: false,
          message: "Bus pass not found",
        });
      }
  
      // Update the valid date of the bus pass
      busPass.validDate = parsedValidDate;
  
      // Save the student profile with the updated bus pass array
      await studentProfile.save();
  
      return res.status(200).json({
        success: true,
        message: "Bus pass renewed successfully",
        data: busPass,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while renewing the bus pass",
      });
    }
};


// get bus pass by id
http://localhost:8000/api/v1/buspass/getBusPassById?busPassId=${busPassId}
exports.getBusPassById = async (req, res) => {
    try {
      const { busPassId } = req.query;
      const studentProfile = await BussPass.findOne({ "bussPass.busPassId": busPassId });
      
      if (!studentProfile) {
        return res.status(404).json({
          success: false,
          message: "Bus pass not found",
        });
      }
  
      const busPass = studentProfile.bussPass.find(
        (pass) => pass.busPassId === busPassId
      );
  
      if (!busPass) {
        return res.status(404).json({
          success: false,
          message: "Bus pass not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Bus pass found",
        data: busPass,
      });
    } catch (err) {
      console.log("Error in getting Bus Pass By Id : ", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
};





