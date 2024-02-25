// EventList.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "./Event";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [studentSize, setStudentSize] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null); // New state to store the selected event

  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3010/get-events",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data)
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      teacherName,
      teacherEmail,
      schoolName,
      studentSize,
      gender, // Include gender in the form data
      ageGroup, // Include ageGroup in the form data
      registrationCode, // Include registrationCode in the form data
      eventId: selectedEvent._id,
      // ... other details
    };

    console.log("Form Data:", formData);

    try {
      const response = await axios.post("http://localhost:3010/apply-event", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      console.log("Response from send-email:", response.data);
      if (response.data.status == true) {
        alert('Event Applied Successfully')
      }

      // Optionally, handle the response here

    } catch (error) {
      alert("Failed to apply on following event")

      console.error("Failed to apply on event", error);
    }

    setTeacherName("");
    setTeacherEmail("");
    setSchoolName("");
    setStudentSize("");
    setGender("")
    setAgeGroup("")
    setSelectedEvent(null); // Reset selected event after submission
    setShowForm(false); // Hide the form after submission
  };

  const handleApplyClick = (event) => {
    setSelectedEvent(event); // Set the selected event
    setShowForm(true);
  };

  return (

    <div className="container mt-3">
      {showForm && (
        <div className="card" style={{ border: '3px solid', background: '#B2BABB', padding: '40px' }}>
          <div className="card-header">Apply For Event</div>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="teacherName">Teacher Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="teacherName"
                  placeholder="Enter your name!"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="teacherEmail">Teacher Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="teacherEmail"
                  placeholder="Enter Email!"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="schoolName">School Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="schoolName"
                  placeholder="Enter School Name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentSize">Student Size:</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentSize"
                  placeholder="Enter Student Size"
                  value={studentSize}
                  onChange={(e) => setStudentSize(e.target.value)}
                />
              </div>
              {/* Additional Fields */}
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-control"
                  id="gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ageGroup">Age Group:</label>
                <select
                  className="form-control"
                  id="ageGroup"
                  onChange={(e) => setAgeGroup(e.target.value)}
                >
                  <option value="">Select Age Group</option>
                  <option value=""> select</option>
                  <option value="GCSE">GCSE</option>
                  <option value="A-level">A-level</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="registrationCode">Registration Code:</label>
                <input
                  type="text"
                  className="form-control"
                  id="registrationCode"
                  placeholder="Enter Registration Code"
                  value={registrationCode}
                  onChange={(e) => setRegistrationCode(e.target.value)}
                />
              </div>
              {/* End of Additional Fields */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}



      <table className="table mt-3" style={{ border: '3px solid', background: '#B2BABB', padding: '40px' }}>
        <thead >
          <tr>
            <th className="text-center">S.No</th>
            <th className="text-center">Event Title</th>
            <th className="text-center">Event Description</th>
            <th className="text-center">Event Venue</th>
            <th className="text-center">Event Time</th>
            <th className="text-center">Age Group</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{event.eventTitle}</td>
              <td className="text-center">{event.eventDescription}</td>
              <td className="text-center">{event.eventVenue}</td>
              <td className="text-center">{event.eventTime}</td>
              <td className="text-center">{event.Agegroup}</td>

              {/* Add other cells as needed */}
              <td className="text-center">
                <button className="btn btn-success" onClick={() => handleApplyClick(event)}>Register</button>
                {/* <button onClick={() => handleDeleteClick(event._id.$oid)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
