const Student = require('../models/Student');
const Profile = require("../models/Profile")

exports.getAllStudents = async (req, res) =>{
    try{
        const students = await Student.find();
        return res.status(200).json({
            success: true,
            message: "All Students Fetched Successfully",
            data: students,
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

exports.getAllProfiles = async (req, res) =>{
  try{
      const Profiles = await Profile.find();
      return res.status(200).json({
          success: true,
          message: "All Profiles Fetched Successfully",
          data: Profiles,
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

exports.getStudentById = async (req, res) =>{
    try{

        const {id} = req.query;
        const user = await Student.findById(id);
        const studentProfile = await Profile.findById(user.additionalDetails);
      
        return res.status(200).json({
          success : true,
          message : "Student Details Fetched Successfully",
          data : {
            user,
            studentProfile,
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
}


exports.deleteStudentById = async(req, res)=>{
    try{
        const {id} = req.query;
        const user = await Student.findById(id);
        const studentProfile = await Profile.findById(user.additionalDetails);
        await studentProfile.delete();
        await user.delete();
        return res.status(200).json({
            success : true,
            message : "Student Deleted Successfully",
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
    }
}





