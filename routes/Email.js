const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const {sendBusConfirmation} = require('../controllers/SendEmail');
dotenv.config();


router.post('/sendbusconfirmation',sendBusConfirmation);


module.exports = router;
