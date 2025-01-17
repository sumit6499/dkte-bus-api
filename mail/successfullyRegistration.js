exports.successfullyRegistered = (firstName,amount,receiptId,applyDate,validDate,busPassId) => {


    let month;
    if(amount==2500){
        month=1;
    }
    else if(amount==6000){
        month=6;
    }
    else if(amount==12000){
        month=12;
    }
    else{
        month=0;
    } 

    // show only date not show time
    applyDate = applyDate.toString().split(" ");
    applyDate = applyDate[1] + " " + applyDate[2] + " " + applyDate[3];

    validDate = validDate.toString().split(" ");
    validDate = validDate[1] + " " + validDate[2] + " " + validDate[3];

	return `<html>

    <head>
    </head>
    
    <body>
        <style>
            @font-face {
                font-family: 'Graphik';
                src: url('https://prime.terragoncdp.com/assets/graphik_font_amily/GraphikRegular.otf') format("opentype");
                font-weight: normal;
                font-style: normal;
                line-height: 1.5;
            }
    
            @font-face {
                font-family: 'semibold_Graphik';
                src: url('https://prime.terragoncdp.com/assets/graphik_font_amily/GraphikSemibold.otf') format("opentype");
                font-weight: normal;
                font-style: normal;
                line-height: 1.5;
            }
    
            @font-face {
                font-family: 'medium_Graphik';
                src: url('https://prime.terragoncdp.com/assets/graphik_font_amily/GraphikMedium.otf') format("opentype");
                font-weight: normal;
                font-style: normal;
                line-height: 1.5;
            }
            body{
                margin: 0;
                padding: 0;
                background-color:#f4f6fb;
            }
    
            .container {
                font-family: Graphik, sans-serif;
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
    
                color: #526475;
                background: #FFFFFF;
                border-radius: 5px;
                width: 510px;
                margin: 0 auto;
                box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.05);
            }
    
    
            .btn {
                border: none;
                color: #fff;
                background: #008138;
                border-radius: 6px;
                width: 369px;
                font-weight: 600;
                display: inline-block;
                padding: 15px 0;
            }
    
            .divider {
                background: #E5EFFF;
                height: 0.49px;
                width: 100%;
            }
    
            .p-24 {
                padding: 24px;
            }
    
            .mr-40 {
                margin-right: 40px;
            }
    
            .bold {
                font-weight: 600;
            }
    
            .text-light {
                color: #7F92A4;
            }
    
            .center {
                text-align: center;
            }
    
            .flex {
                display: flex;
            }
    
            .justify-between {
                justify-content: space-between;
            }
    
            .justify-end {
                justify-content: flex-end;
            }
    
            .mb-6 {
                margin-bottom: 24px;
            }
    
            .my-6 {
                margin-top: 24px;
                margin-bottom: 24px;
            }
    
            .my-4 {
                margin-top: 16px;
                margin-bottom: 16px;
            }
    
            .logo {
                width: 137px;
                height: 40px;
            }
            .header{
                background-color: #2b0318;
            }
            .footer{
                background-color: #2b0318;
                color: #fff;
                padding: 20px;
            }
            @media only screen and (max-width: 600px) {
                /* Adjustments for smaller screens */
    
                .container {
                    width: 100%;
                }
    
                .btn {
                    width: 100%;
                }
    
                /* Add more adjustments as needed */
            }
        </style>
        <div class="container">
            <header class="header p-24">
                <img class="logo" src="https://www.dkte.ac.in/images/dkte-logo.png">
            </header>
            <div class="divider"></div>
            <div class="main p-24">
                <p class="bold">Hi ${firstName},</p>
                <p class="bold center">Thank you for your purchase!</p>
                <p>
                    We have successfully processed payment of
                    <span class="bold">${amount}</span> for your
                    <span class="bold">Bus Pass plan.</span>
                    Kindly use this email as the receipt for your purchase.
                </p>
                <p>Below are the details for this transaction</p>
                <div>
                    <div class="flex justify-between">
                        <span class="bold">[#Receipt ID: ${receiptId}]</span>
                        <span class="bold">[date of purchase: ${applyDate}]</span>
                    </div>
                    <div class="flex justify-between my-4">
                        <span class="text-light">Description</span>
                        <span class="text-light">Amount</span>
                    </div>
                    <div class="divider"></div>
                    <div class="flex justify-between my-4">
                        <span class="">Bus Pass Plan for ${month} Month</span>
                        <span class="">${amount}</span>
                    </div>
                    <div class="divider"></div>
                    <div class="flex justify-end my-4">
                        <span class="bold mr-40">Total</span>
                        <span class="bold">${amount}</span>
                    </div>
                </div>
    
                <div class="divider"></div>
                    
                <p class="">Bus Details</p>
                <div class="divider"></div>
                    
                <div>
                    <div class="flex justify-between">
                        <span class="bold">Bus Pass Id</span>
                        <span class="bold">Apply Date</span>
                        <span class="bold">Valid Date</span>
                    </div>
                    <div class="flex justify-between my-4">
                        <span class="">${busPassId}</span>
                        <span class="">${applyDate}</span>
                        <span class="">${validDate}</span>
                    </div>
                </div>
                <div class="divider"></div>
    
                <p>
                    Note: If you have any questions about this transaction, simply reply to this email or reach out to our
                    support team for help.
                </p>
    
                <!-- <div class="center my-6">
                    <a class="btn">
                        Download as PDF
                    </a>
                </div> -->
    
                
                
                
            </div>
            <div class="divider"></div>
            <div class="footer">
                <p class="center text-light">
                    Need help with anything? Contact support@dkte.com
                    © 2024 DKTE. All rights reserved.
                </p>    
            </div>
    
        </div>
    
    </body>
    
    </html>`;
};