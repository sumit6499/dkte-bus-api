exports.busConfirmation = (firstName,lastName,busFrom,busDestination,busSubDestination,validDate,applyDate,studentId,buspassId) =>{
    return`
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Add your CSS styles here */
    body {
      font-family: sans-serif;
      background-color: #f0f0f0;
      color: #333;
    }

    table {
      width: 100%;
      max-width: 600px;
      margin: 8px auto;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #bab8b8;
    }

    h1 {
      font-size: 2em;
      font-weight: bold;
      color: #333;
      padding: 16px;
    }

    p {
      color: #444;
      margin: 0;
    }

    .content {
      padding: 16px;
    }

    .details {
      margin-top: 16px;
    }

    .details span {
      font-weight: bold;
      margin-right: 8px;
    }

    .additional-info {
      margin-top: 16px;
    }

    .footer {
      padding: 16px;
      background-color: #eee;
      color: #666;
    }
  </style>
  <title>Bus Pass Confirmation</title>
</head>

<body>

  <table>
    <!-- Header -->
    <tr>
      <td>
        <h1>Bus Pass Confirmation</h1>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td class="content">
        <p>Dear ${firstName},</p>
        <p class="mt-2">Your bus pass has been successfully processed. Here are the details:</p>

        <!-- Bus Pass Details -->
        <div class="details mt-4">
          <p><span>Student Name:</span> ${firstName} ${lastName}</p>
          <p><span>Student PRN:</span> ${studentId}</p>
          <p><span>Bus Pass Number:</span> ${buspassId}</p>
          <p><span>Bus Form:</span> ${busFrom}</p>
          <p><span>Bus To:</span> ${busDestination} (${busSubDestination})</p>
          <p><span>Validity:</span> ${applyDate} to ${validDate}</p>
        </div>

        <!-- Additional Information -->
        <div class="additional-info mt-4">
          <p>For any inquiries, please contact our customer support.</p>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td class="footer">
        <p>Thank you for choosing our bus services!</p>
      </td>
    </tr>
  </table>

</body>

</html>

`
}