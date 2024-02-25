const express = require("express");
const app = express();
const port = 3010;
const connectDB = require("./Database/Databse");
const Admin = require("./models/Admin");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "123ABC!@#";
const AuthChecker = require("./middelware/AuthChecker");
const Event = require("./models/Post");
const ApplyEvent = require('./models/apply-event')
var cors = require("cors");
const mongoose = require('mongoose')
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'bc00eaf71ccd5bda976620100cc7c1e5-5d2b1caa-cbd1c3d5' });
const sendMail = require('./utils/mail-service')

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.post("/register", async (req, res) => {
  const { role, password, fullName, email } = req.body; //   const Admin = req.body;
  console.log(req.body)
  try {
    // Check if the admin with the provided username or email already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }],
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: `${existingAdmin.role} already exists`,
      });
    }

    // Create a new admin instance
    const newAdmin = new Admin({
      role,
      password,
      fullName,
      email,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({
      message: `${newAdmin.role}  registered successfully`,
    });
  } catch (error) {
    console.error("Error registering admin:", error.message);
    res.status(500).json({ message: "User Already Exists!!!" });
  }
});

app.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ email }],
    });

    if (existingAdmin) {
      if (password === existingAdmin.password) {
        // Create a JWT token
        const token = jwt.sign(
          {
            adminId: existingAdmin._id,
            email: existingAdmin.email,
          },
          JWT_SECRET_KEY,
          { expiresIn: "1h" } // Optional: Set the expiration time for the token
        );

        res.status(200).json({
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Password" });
      }
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/createEvent", AuthChecker, async (req, res) => {
  const { eventTitle, eventDescription, eventVenue, eventTime, Agegroup } =
    req.body;
  const userId = req.user.adminId; // Assuming your JWT payload has an adminId field

  try {
    // Check if the admin (user) exists
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new event instance
    const newEvent = new Event({
      eventTitle,
      eventDescription,
      eventVenue,
      eventTime,
      Agegroup,
      admin: userId,
    });

    // Associate the event with the user

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/apply-event', AuthChecker, async (req, res) => {
  try {
    const { teacherName, teacherEmail, schoolName, studentSize, gender, ageGroup, registrationCode, eventId } = req.body

    const eventDetails = await ApplyEvent.findOne({ eventId, teacherEmail })

    if (eventDetails) {
      return res.status(500).json({ message: "Internal Server Error", status: false });

    }

    const applyEvent = new ApplyEvent({
      eventId: eventId,
      teacherName: teacherName,
      teacherEmail: teacherEmail,
      gender: gender,
      schoolName: schoolName,
      studentSize: studentSize,
      Agegroup: ageGroup,
      registrationCode: registrationCode,
      status: 'Pending'
    })

    await applyEvent.save()

    res.status(201).json({ message: "Event Has Been Register Successfully", status: true });
  }
  catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error", status: false });

  }

})

app.get('/get-apply-events', AuthChecker, async (req, res) => {

  try {
    // console.log(req.user.adminId)
    const events = await ApplyEvent.find()
    if (events) {
      res.status(201).json({ status: true, events: events })
    }

  }
  catch (error) {
    console.lof(error)
    res.status(500).json({ status: false, events: [] })
  }

})
app.post('/update-event', AuthChecker, async (req, res) => {
  try {
    const admin = await Admin.findById(new mongoose.Types.ObjectId(req.user.adminId))
    const adminEmail = admin.email
    const { event, status } = req.body;
    const teacherEmail = event.teacherEmail
    // console.log(admin)
    if (status === "Accepted") {
      const appliedEvent = await ApplyEvent.findById(event._id)
      if (!appliedEvent) {
        return res.status(400).json({ status: false, message: 'Not able to find event' })
      }
      appliedEvent.status = status
      await appliedEvent.save()
      sendMail(event, status, teacherEmail, adminEmail)
      res.status(200).json({ status: true, message: 'Successfully marked approved the request' })


    }
    if (status === "Rejected") {
      const appliedEvent = await ApplyEvent.findById(event._id)
      if (!appliedEvent) {
        return res.status(400).json({ status: false, message: 'Not able to find event' })
      }
      appliedEvent.status = status
      await appliedEvent.save()
      sendMail(event, status, teacherEmail, adminEmail)
      res.status(200).json({ status: true, message: 'Successfully marked rejected the request' })

    }
    if (status === "Pending") {
      const appliedEvent = await ApplyEvent.findById(event._id)
      if (!appliedEvent) {
        return res.status(400).json({ status: false, message: 'Not able to find event' })
      }
      appliedEvent.status = status
      await appliedEvent.save()
      sendMail(event, status, teacherEmail, adminEmail)
      res.status(200).json({ status: true, message: 'Successfully marked pending the request' })

    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ status: false, message: 'Not able to find event' })

  }
})

app.get("/get-events", AuthChecker, async (req, res) => {
  const userId = req.user.adminId;

  try {
    const newAdmin = await Admin.findOne({ _id: userId });
    if (newAdmin && newAdmin.role === "Teacher") {
      const events = await Event.find();

      res.status(200).json(events);
    } else {
      const events = await Event.find({ admin: userId });

      res.status(200).json(events);
    }
  } catch (error) {
    console.error("Error getting events:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to edit an event
app.put("/edit-event/:eventId", AuthChecker, async (req, res) => {
  const {
    SchoolName,
    TeacherName,
    Teacheremail,
    NumberOfStudent,
    Agegroup,
    status,
  } = req.body;
  const userId = req.user.adminId;
  const eventId = req.params.eventId;

  try {
    const newAdmin = await Admin.findOne({ _id: userId });

    if (newAdmin && newAdmin.role === "admin") {
      const event = await Event.findOne({ _id: eventId });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      event.SchoolName = SchoolName || event.SchoolName;
      event.TeacherName = TeacherName || event.TeacherName;
      event.Teacheremail = Teacheremail || event.Teacheremail;
      event.NumberOfStudent = NumberOfStudent || event.NumberOfStudent;
      event.Agegroup = Agegroup || event.Agegroup;
      event.status = status || event.status;
      await event.save();

      res.status(200).json({ message: "Event updated successfully", event });
    } else {
      const event = await Event.findOne({ _id: eventId, admin: userId });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      event.SchoolName = SchoolName || event.SchoolName;
      event.TeacherName = TeacherName || event.TeacherName;
      event.Teacheremail = Teacheremail || event.Teacheremail;
      event.NumberOfStudent = NumberOfStudent || event.NumberOfStudent;
      event.Agegroup = Agegroup || event.Agegroup;
      event.status = status || event.status;

      await event.save();

      res.status(200).json({ message: "Event updated successfully", event });
    }
  } catch (error) {
    console.error("Error editing event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Route to delete an event
app.delete("/delete-event/:eventId", AuthChecker, async (req, res) => {
  const userId = req.user.adminId;
  const eventId = req.params.eventId;

  try {
    const newAdmin = await Admin.findOne({ _id: userId });

    if (newAdmin && newAdmin.role === "admin") {
      const event = await Event.findOne({ _id: eventId });
      if (!event) {
        return res.status(404).json({ message: "Unauthorized" });
      }
      await Event.deleteOne({ _id: eventId });

      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      const event = await Event.findOne({ _id: eventId, admin: userId });
      if (!event) {
        return res.status(404).json({ message: "Unauthorized" });
      }
      await Event.deleteOne({ _id: eventId, admin: userId });

      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/getRole", AuthChecker, async (req, res) => {
  const userId = req.user.adminId;

  try {
    const newAdmin = await Admin.findOne({ _id: userId });
    res.status(200).json({ role: newAdmin.role });
  } catch (error) {
    console.error("Error getting events:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/send-email", AuthChecker, async (req, res) => {
  const teacherEmailId = req.body.teacherEmail
  const eventId = req.body.eventId

  if (teacherEmailId) {
    mg.messages.create('sandbox056f90b63c49402dafd8dbd00391daaa.mailgun.org', {
      from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
      to: [teacherEmailId],
      subject: 'Applied Event Details',
      text: 'You have applied for an event, the details are given below!',
      html: `
<p>New Event added by the Teacher!!!!</p>
<p>Here are the details</p>
<table border="1">
  <tr>
    <th>Event ID</th>
    <td>${eventId}</td>
  </tr>
  <tr>
    <th>School Name</th>
    <td>${req.body.schoolName}</td>
  </tr>
  <tr>
    <th>Teacher Name</th>
    <td>${req.body.teacherName}</td>
  </tr>
  <tr>
    <th>Teacher Email</th>
    <td>${req.body.teacherEmail}</td>
  </tr>
  <tr>
    <th>Number of Students</th>
    <td>${req.body.studentSize}</td>
  </tr>
 
</table>
<p>Have a great day!</p>
`
    });
    console.log(`Reset Link has been sent to ${teacherEmailId}`)

  }
  try {
    res.status(200).send({ message: 'Sent Email', status: 'True' })
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
