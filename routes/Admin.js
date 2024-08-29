const express = require("express");
const router = express.Router();

const {getAllStudents,getStudentById,deleteStudentById,getAllProfiles} = require('../controllers/AdminAuth');


router.get('/all-students', getAllStudents);
router.get('/all-profile', getAllProfiles);

router.get('/student', getStudentById);
router.delete('/student/delete', deleteStudentById);

module.exports = router;

