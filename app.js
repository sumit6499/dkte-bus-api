const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");
database.connect();


const studentRoute = require("./routes/StudentRoute");
const busPass = require("./routes/BussPass");
const payPayment = require("./routes/Paymnet");
const sendEmail = require('./routes/Email');
const adminauth = require('./routes/Admin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
    cors({
        origin : "*",
        credentials : true,
    })
)


// // middlewares
app.use((req,res,next)=>{
    console.log("http method->"+req.method+",URL->"+ req.url);
    next();
})

// routes
app.use("/api/v1/auth", studentRoute);
app.use("/api/v1/buspass", busPass);
app.use("/api/v1/payment", payPayment);
app.use("/api/v1/email", sendEmail);
app.use("/api/v1/admin", adminauth);
app.get("/api/v1/getkey", (req,res,next) => res.status(200).json({key_id:process.env.RAZORPAY_KEY_ID}));




app.get('/', (req, res) => {
    res.send("Welcome to Digi_PASS_API");
});

app.listen(PORT, ()=> {
    console.log(`Server started at Port ${PORT}`);
});
