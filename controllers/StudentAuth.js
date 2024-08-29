const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Profile = require("../models/Profile");
const Payment = require("../models/Paymnet");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdate");
const { successfullyRegistered } = require("../mail/successfullyRegistration");
const upload = require('../utils/upload');
require("dotenv").config();


exports.signup = async (req, res) => {
  try {
    const { email, password, studentId} = req.body;
    if (!email || !password || !studentId) {
      return res.status(403).send({
        success: false,
        message: "All Fields Are required",
      });
    }

    const existingUser = await Student.findOne({ email });
    const studentIDEsit = await Student.findOne({studentId});
    if (existingUser || studentIDEsit) {
      return res.status(400).json({
        success: false,
        message: "Student Already Exists. Please sign in to continue.",
      });
    }

    // const response = await OTP.find({ email }).sort({ created : -1 }).limit(1);
    //   console.log(response);
    //   if(response.length == 0)
    //   {
    //       return res.status(400).json({
    //           success : false,
    //           message : "Invalid OTP"
    //       });
    //   }else if(otp !== response[0].otp) {
    //       return res.status(400).json({
    //           success : false,
    //           message : "Invalid OTP"
    //       });
    //   }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      firstName : null,
      lastName : null,
      year : null,
      branch : null,
      phno : null,
      busno : null,
      address : null,
    })
    // const paymentDetails = await Payment.create({
    //   amount : null,
    //   studentId: studentId,
    //   razorpay_payment_id : null,
    //   razorpay_order_id : null,
    //   razorpay_signature : null,
    //   createdAt : null,
    // })

    const user = await Student.create({
      email,
      studentId,
      password: hashedPassword,
      additionalDetails : profileDetails._id,     
      //paymentDoneDetails : paymentDetails._id,
      accountType:"Student",
    });

    // try{
    //   const emailResponse = await mailSender(
    //     user.email, `DKTE Society's Textile and Engineering Institute`, 
    //     successfullyRegistered(`${user.studentId}`)
    //   );

    // }catch(err){
    //     res.status(200).json({
    //     success: true,
    //     message: "Student Registered Successfully",
    //   });
    // }
  
    return res.status(200).json({
      success: true,
      message: "Student Registered Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please try again!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Student is not registered with Us please Signup to Continue",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.tokens = user.tokens.concat({ token });
      //console.log(user.tokens);
      await user.save();

      user.token = token;
      user.password = undefined;

      // save tokens in to schema for logout functionality
      

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Student login successfully",
      });



    } 
    else {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            "message" : "Internal Server Error"
        })
  }
};

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await Student.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Student is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.changePassword = async (req, res) => {
    try{

        const userDetails = await Student.findOne(req.user.body);

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPasswordMatch){
          return res.status(401).json({
            success : false,
            message : "old password doesn't match"
          })
        }

        if(newPassword !== confirmNewPassword){
          return res.status(401).json({
            success : false,
            message : "New Password & Confirm New Password doesn't match"
          })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUserDetails = await Student.findByIdAndUpdate(req.user.id, { password : encryptedPassword }, { new : true });

        try{
          const emailResponse = await mailSender(
            updatedUserDetails.email, `Password Updated Successfully`, 
            passwordUpdated(
              updatedUserDetails.email, `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
          );

              console.log("Email sent successfully:", emailResponse.response);
        }
        catch(error){
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
              success : false,
              message : "Error occurred while sending email",
              error : error.message
            });
        }

        return res.status(200).json({
          success : true,
          message : "Password Updated Succesfully"
        })


    }   
    catch(err){ 
        console.log("Error occurred while updating password:", err);
        return res.status(500).json({
          success : false,
          message : "Error occurred while updating password",
          error : err.message
        })
    }
};

exports.getStudentDetails = async (req, res) => {
  try{

    const id = req.user.id;
    const user = await Student.findById(id);
    const studentProfile = await Profile.findById(user.additionalDetails);
    const PaymentDetails = await Payment.findById(user.paymentDoneDetails);
  
    return res.status(200).json({
      success : true,
      message : "Student Details Fetched Successfully",
      data : {
        user,
        studentProfile,
        PaymentDetails
      }
    })
  }
  catch(error){
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update Student Details Profile and Bus Pass Details
exports.updateStudentDetails = async (req, res) => {
  try{
    const { firstName,lastName,year, branch, phno, address, busno } = req.body;
    const email = req.user.email;
    const id = req.user.id;

    const studentDetails = await Student.findOne({_id: id});
    console.log(typeof studentDetails);

    const studentProfile = await Profile.findById(studentDetails.additionalDetails);

    studentProfile.firstName = firstName;
    studentProfile.lastName = lastName;
    studentProfile.year = year;
    studentProfile.branch = branch;
    studentProfile.phno = phno;
    studentProfile.address = address;
    studentProfile.busno = busno;

    await studentProfile.save();

    return res.status(200).json({
      success : true,
      message : "Student Details Updated Successfully",
      data : studentProfile
    });
  }
  catch(error){
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


exports.uploadImagePrfoile = async (req, res) => {
  try {
    // Handle file upload using multer and S3
    upload.single('profileImage')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Error uploading profile image',
        });
      }

      // Update user details
      const id = req.user.id;
      const studentDetails = await Student.findOne({ _id: id });
      const studentProfile = await Profile.findById(studentDetails.additionalDetails);

      // Update profile details


      // Update profile image URL with S3 link
      if (req.file) {
        studentProfile.profileImage = req.file.location;
      }

      await studentProfile.save();

      return res.status(200).json({
        success: true,
        message: 'Student Profile Image Updated Successfully',
        data: studentProfile,
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Student Logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




