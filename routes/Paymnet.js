const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { auth } = require("../middlewares/auth");
const {checkout, paymentVerification} = require('../controllers/PaymentAuth');
dotenv.config();

router.get('/getkey',(req, res) => {
    res.json({
        key_id: process.env.RAZORPAY_KEY_ID,
    });
});
router.post('/checkout',auth,checkout);
router.post('/paymentverification',paymentVerification);

module.exports = router;
