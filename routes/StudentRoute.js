const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { login, signup, sendotp, changePassword,logout,updateStudentDetails,getStudentDetails,uploadImagePrfoile} = require("../controllers/StudentAuth");
const Student = require("../models/Student");


router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/changepassword", auth, changePassword);
router.get("/logout",logout);

router.post("/updateStudentDetails", auth, updateStudentDetails);
router.get("/getStudentDetails", auth, getStudentDetails);
router.post("/uploadImagePrfoile", auth, uploadImagePrfoile);


module.exports = router;