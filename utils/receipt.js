module.exports = ({ firstName, lastName, buspassId, studentId, busFrom, busDestination, busSubDestination, applyDate, validDate, email,receiptId,branch, year, amount,razorpay_order_id }) => {
   
    const today = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})


   return `
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <link rel="stylesheet" href="style.css">
       <script src="https://cdn.tailwindcss.com"></script>
       <link rel="stylesheet"
           href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">
       <link rel="stylesheet" href="https://cdn.tailgrids.com/tailgrids-fallback.css" />
       <script src="js/wow.min.js"></script>
       <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css" rel="stylesheet" />
       <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js"></script>
       <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
       <script src="https://kit.fontawesome.com/c6761947f8.js" crossorigin="anonymous"></script>
        <style>
           
   .card {
       position: relative;
   }
   
   .card::after {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: url('https://www.dkte.ac.in/images/dkte-logo.png') center center no-repeat;
       
       opacity: 0.2; /* Adjust the opacity as needed */
       pointer-events: none; /* Make sure the watermark doesn't interfere with user interactions */
       z-index: -1; /* Place the watermark behind other elements */
   }
        </style>
   
   </head>
   
   <body>
       <section class="flex items-center justify-center h-screen bg-white-100 mt-6">
           <div class="card border border-dark p-8" style="width: 45%;height:fit-content;">
               <div class=" flex flex-wrap items-center justify-between mx-auto">
                   <img src="https://www.dkte.ac.in/images/dkte-logo.png" class="w-15">
                   <p class="font-medium text-xs">DKTE SOCIETY'S TEXTILE AND ENGINEERING INSTITUTE, ICHALKARANJI</p>
               </div>
   
               <section class="overflow-hidden transition-none duration-75">
                   <div class="pt-5 grid mx-auto lg:grid-cols-12">
                       <div class="lg:col-span-6">
                           <ul class="flex flex-col p-4 md:p-0">
                               <li class="nav-item">
                                   <p class="nav-link text-dark">Receipt NO: ${receiptId}</p>
                               </li>
                               <li class="nav-item">
                                   <p class="nav-link text-dark">Student Name: ${firstName} ${lastName}</p>
                               </li>
                               <li class="nav-item">
                                   <p class="nav-link text-dark">PRN No: ${studentId}</p>
                               </li>
                           </ul>
                       </div>
                       <div class="lg:col-span-6">
                           <ul class="flex flex-col p-4 md:p-0">
                               <li class="pl-12 nav-item">
                                   <p class="nav-link text-dark">Date: ${today}</p>
                               </li>
                               <li class="pl-12 nav-item">
                                   <p class="nav-link text-dark">Year:${year}</p>
                               </li>
                               <li class="pl-12 nav-item">
                                   <p class="nav-link text-dark">Branch:${branch}</p>
                               </li>
                           </ul>
                       </div>
                   </div>
               </section>
   
               <div class="flex flex-col pt-5">
                   <div class="-m-1.5 overflow-x-auto">
                       <div class="p-1.5 min-w-full inline-block align-middle">
                           <div class="overflow-hidden">
                               <table class="min-w-full divide-y divide-x divide-gray-200 dark:divide-gray-700">
                                   <thead>
                                       <tr>
                                           <th scope="col" class="px-4 py-2 text-start text-sm font-medium">SL.No</th>
                                           <th scope="col" class="px-2 py-2 text-start text-sm font-medium">Particulars
                                           </th>
                                           <th scope="col" class=" py-2 text-start text-sm font-medium">Amount in Rs.
                                           </th>
                                       </tr>
                                   </thead>
                                   <hr class="border-t border-gray-200 dark:border-gray-700">
                                   </hr>
                                   <tbody class="divide-x divide-gray-200 dark:divide-gray-700">
                                       <tr>
                                           <td class="px-4 py-1 border-l">1</td>
                                           <td class="px-2 py-1 border-l">College Bus fee</td>
                                           <td class="px-4 py-1 border-l">${amount}</td>
                                       </tr>
                                   </tbody>
                               </table>
                               <hr class="border-t border-gray-200 dark:border-gray-700">
                               <div class="pb-3 flex flex-shrink-0 text-dark justify-end">
                                   <div
                                       class="flex items-center flex-grow w-0 h-10 px-2 border-b font-medium border-gray-700">
                                       <span class="ml-auto mr-14">Total: Rs.${amount}</span>
                                   </div>
                               </div>
   
                           </div>
                       </div>
                   </div>
               </div>
   
   
   
               <div class="flex">
                   <div class="">
                   <p class="text-dark pt-5">Bus Details</p>
                   <p class="text-dark">Bus No :${buspassId}</p>
                   <p class="text-dark">Bus From :${busFrom} to ${busDestination}(${busSubDestination})</p>
                   <p class="text-dark">Apply Date :${applyDate}</p>
                   <p class="text-dark">Valid Date :${validDate}</p>
                   </div>
               </div>
   
               <p class="text-dark pt-5">Payment Details</p>
               
               
               <div class="max-w-3xl pb-5">
                   <table class="border-collapse border border-gray-700">
                       <thead>
                           <tr>
                               <th class="font-medium border border-gray-700">Mode</th>
                               <th class="border px-2 py-1 border-gray-700">Online</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td class="font-medium border px-2 py-1 border-gray-700">Transaction Id.</td>
                               <td class="border px-2 py-1 border-gray-700">${razorpay_order_id}</td>
                           </tr>
                           <tr>
                               <td class="font-medium border px-2 py-1 border-gray-700">Rs.</td>
                               <td class="border px-2 py-1 border-gray-700">${amount}</td>
                           </tr>
                           <tr>
                               <td class="font-medium border px-2 py-1 border-gray-700">Bank</td>
                               <td class="border px-2 py-1 border-gray-700">AXIS BANK</td>
                           </tr>
                           <tr>
                               <td class="font-medium border px-2 py-1 border-gray-700">Transaction Date</td>
                               <td class="border px-2 py-1 border-gray-700">${today}</td>
                           </tr>
                       </tbody>
                   </table>
               </div>
               
               <div class="flex pt-12 justify-between">
                   <p class="text-dark font-medium">Principal</p>
                   <p class="text-dark font-medium pr-6">Cashier</p>
               </div>
           </div>
           </div>
           </div>
           </div>
       </section>
   </body>
   
   </html>
   `;
};
