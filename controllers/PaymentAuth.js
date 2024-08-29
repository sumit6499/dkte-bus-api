const Payment = require('../models/Paymnet');
const Student = require('../models/Student');
const BussPass = require("../models/Profile");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');
const mailSender = require('../utils/mailSender');
const successPayment = require('../mail/successfullyPayment');
require("dotenv").config();
const PaymentSchema = require('../models/Paymnet')
const jwt = require("jsonwebtoken");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// exports.checkout = async (req, res, next) => {
//     try {
//         const id = req.user.id;
//         const options = {
//             amount: Number(req.body.amount * 100),
//             currency: "INR",
//         };        

//         // Assuming you have a logged-in user with req.user
//         const studentDetails = await Student.findById({ _id: id });
//         //console.log("Student Details: ", studentDetails);
//         const studentProfile = await BussPass.findById(studentDetails.additionalDetails);
//         console.log("Payment Details: ", studentProfile);

//         const order = await razorpay.orders.create(options);

//         const PaymentDones= {
//             razorpay_order_id: order.id,
//             amount:(options.amount)/100,
//             createdAt: new Date(),
//         }
      
//         studentProfile.bussPass.push(PaymentDones);
//         await studentProfile.save();

//         return res.status(200).json({
//             success: true,
//             order,            
//         });

//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

exports.checkout = async (req, res) => {
    try {
      const { amount} = req.body;
      const id = req.user.id;
  
      console.log(amount);
  
      const studentDetails = await Student.findOne({ _id: id });
      const studentProfile = await BussPass.findById(studentDetails.additionalDetails);
      const studentId = studentDetails.studentId;
  
      // console.log(studentId);
    
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
        message: "Bus Payment added Sucessfully",
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

// exports.checkout = async (req, res, next) => {
//     try {
//         const id = req.user.id;
//         const options = {
//             amount: Number(req.body.amount * 100),
//             currency: "INR",
//         };

//         // Assuming you have a logged-in user with req.user
//         const studentDetails = await Student.findById(id);
//         const busPassId = generateBusPassId(); // Add your logic to generate a unique bus pass id
//         const order = await razorpay.orders.create(options);

//         // Create a new bus pass
//         const newBusPass = {
//             busPassId,
//             busFrom: req.body.busFrom, // Update with your actual data
//             busDestination: req.body.busDestination, // Update with your actual data
//             busSubDestination: req.body.busSubDestination, // Update with your actual data
//             applyDate: new Date(),
//             validDate: req.body.validDate, // Update with your actual data
//             amount: options.amount / 100,
//             razorpay_order_id: order.id,
//             createdAt: new Date(),
//         };

//         // Save the new bus pass to the student's profile
//         studentDetails.bussPass.push(newBusPass);
//         await studentDetails.save();

//         // Update the payment details
//         const paySuccess = await Payment.findById(studentDetails.additionalDetails);
        
//         if (!paySuccess) {
//             // If the payment document doesn't exist, create a new one
//             const newPaymentSuccess = new Payment({
//                 bussPass: [newBusPass],
//             });
//             await newPaymentSuccess.save();
//         } else {
//             // If the payment document exists, push the new bus pass details
//             paySuccess.bussPass.push(newBusPass);
//             await paySuccess.save();
//         }

//         return res.status(200).json({
//             success: true,
//             order,
//             busPassId,
//         });

//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

exports.paymentVerification = async(req, res) => {
    try {
         const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
         console.log("razorpay_payment_id: ",razorpay_payment_id)
         console.log("razorpay_order_id: ",razorpay_order_id)
         console.log("razorpay_signature: ",razorpay_signature)
 
         const body = razorpay_order_id + "|" + razorpay_payment_id;
 
         const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");        

         console.log("generated_signature: ",generated_signature)

         if (generated_signature == razorpay_signature) 
         {
            res.redirect(`https://digi-bus.vercel.app/paymentsuccessful?reference=${razorpay_payment_id}`);
         }
         else{
             return res.status(400).json({
                success: false,
                message: "Payment Verification Failed",
             });
         }
  
    } catch (error) {
         return res.status(400).json({
             success: false,
             message: error.message
         })
    }
}

