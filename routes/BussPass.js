const express = require('express');
const router = express.Router();
const {renewBusPass,applyForBusPass,getBusPassById} = require('../controllers/BussPass');
const {createPDF, getPDF} = require('../controllers/createPDF');
const { auth } = require("../middlewares/auth");

router.post("/renewBusPass", auth, renewBusPass);
router.post("/applyForBusPass", auth, applyForBusPass);
//router.get("/getBusPassById/:id", auth, getBusPassById);
router.get("/getBusPassById", auth, getBusPassById);

// PDF 
router.post('/create-pdf', createPDF);
router.get('/fetch-pdf', getPDF);

module.exports = router;