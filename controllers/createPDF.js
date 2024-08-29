const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
const pdfTemplate = require('../utils/receipt');

// create pdf
exports.createPDF = async (req, res) => {
    try {
        const { firstName, lastName, buspassId, studentId, busFrom, busDestination, busSubDestination, applyDate, validDate, email,receiptId,branch, year, amount,razorpay_order_id } = req.body;
        //console.log(req.body);
        const recipdId = receiptId;
        
        //check the file is already created or not onrecipdId
        // if (fs.existsSync(`${recipdId}.pdf`)) {
        //     res.send({
        //         success: true,
        //         message: "File already created",
        //     });
        // }
        // save the pdf with studentId and save to ../DocPDF
        //else {
            pdf.create(pdfTemplate(req.body), {}).toFile(`${recipdId}.pdf`, (err) => {
                // if (err) {
                //     res.send(
                //         {
                //             success: false,
                //             message: "Internal Server Error file not created",
                //         }
                //     );
                // }
                res.send({
                    success: true,
                    message: "File created successfully",
                });
            });
        //}
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// exports.createPDF = async (req, res) => {
//     try {
//         const { firstName, lastName, buspassId, studentId, busFrom, busDestination, busSubDestination, applyDate, validDate, email,receiptId,branch, year, amount,razorpay_order_id } = req.body;
//         const recipdId = receiptId;

//         // if (fs.existsSync(`${recipdId}.pdf`)) {
//         //     return res.send({
//         //         success: true,
//         //         message: "File already created",
//         //     });
//         // }

//         pdf.create(pdfTemplate(req.body), {}).toFile(`${recipdId}.pdf`, (err) => {
//             if (err) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Internal Server Error file not created",
//                 });
//             }

//             res.send({
//                 success: true,
//                 message: "File created successfully",
//             });
//         });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// };

// get pdf
exports.getPDF = async (req, res) => {
    try {
        const { receiptId } = req.query;
        res.sendFile(`${receiptId}.pdf`, { root: './' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// api end points   

