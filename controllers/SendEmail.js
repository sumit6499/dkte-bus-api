const nodemailer = require("nodemailer");
const { busConfirmation } = require('../mail/busConfirmation');
require('dotenv').config();

exports.sendBusConfirmation = async (req, res) => {
    const { email,firstName,lastName,busFrom,busDestination,busSubDestination,validDate,applyDate,studentId,buspassId} = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });

    const mailOptions = {
        from: "pradeeppawar4182@gmail.com",
        to: email,
        subject: "Bus Confirmation",
        html: busConfirmation(firstName,lastName,busFrom,busDestination,busSubDestination,validDate,applyDate,studentId,buspassId)
        };
        try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
};


