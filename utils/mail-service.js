const nodemailer = require('nodemailer');

function sendEventDetails(event, status, teacherEmail, adminEmail) {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'teacherportal24@gmail.com',
      pass: 'stnp gjrh hfam cxmm'
    }
  });

  let eventDetailsTable = `
    <table style={{ border: '3px solid', background: '#B2BABB', padding: '40px' }}>
      <tr>
        <th>Event ID</th>
        <th>Teacher Name</th>
        <th>Teacher Email</th>
        <th>School Name</th>
        <th>Student Size</th>
        <th>Gender</th>
        <th>Agegroup</th>
        <th>Registration Code</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>${event.eventId}</td>
        <td>${event.teacherName}</td>
        <td>${event.teacherEmail}</td>
        <td>${event.schoolName}</td>
        <td>${event.studentSize}</td>
        <td>${event.gender}</td>
        <td>${event.Agegroup}</td>
        <td>${event.registrationCode}</td>
        <td>${status}</td>
      </tr>
    </table>
  `;

  let details = {
    from: "teacherportal24@gmail.com",
    to: `${teacherEmail},${adminEmail}`,
    subject: "Event Booking Details",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Event Booking Details</title>
          <style>
              /* Your CSS styles here */
              .container{
                font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
              }
          </style>
      </head>
      <body>
          <div class="container" style={{ border: '3px solid', background: '#B2BABB', padding: '40px' }}>
              <h1>Event Details</h1>
              <p>Dear ${event.teacherName},</p>
              <p>Please find below the details of the event:</p>
              <p>Event Details:</p>
              ${eventDetailsTable}
              <p>Thank you,<br>Vaseem Ahmed Shaik,<br> </p>
          </div>
      </body>
      </html>
    `
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('The mail has been sent');
    }
  });
}

module.exports = sendEventDetails;
