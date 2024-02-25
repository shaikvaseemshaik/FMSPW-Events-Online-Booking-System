import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "./Event";

const AdminEventList = () => {
  const [Events, setEvents] = useState([]);
  const [data] = useState([]);
  const DeleteItem = (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3010/delete-event/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3010/get-apply-events",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setEvents(response.data.events); // Extract 'events' from the response
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStatusChange = (event, status) => {
    // Make API call to update the event status
    const updateConfig = {
      method: "post",
      url: "http://localhost:3010/update-event",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: {
        event: event, // Replace 'id' with the actual property name in your 'event' object
        status: status,
        
      },
    };

    axios
      .request(updateConfig)
      .then((response) => {
        window.location.reload();
        alert('Status Has been changed')
        // Handle the response if needed
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mt-3 m-auto">
      <table className="w-100" 
       style={{ border: '3px solid',  padding: '40px' }}
      >
        <thead className="table-secondary" style={{ border: '3px solid', background: '#BDB9B9', padding: '40px' }}>
          <tr>
            <th className="text-center">S.No</th>
            <th className="text-center">Teacher Name</th>
            <th className="text-center">Teacher Email</th>
            <th className="text-center">Number Of Student</th>
            <th className="text-center">Age Group</th>
            <th className="text-center">School Name</th>
            <th className="text-center">Student Size</th>
            <th className="text-center">Gender</th>
            <th className="text-center">Registration Code</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Events.map((event, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{event.teacherName}</td>
              <td className="text-center">{event.teacherEmail}</td>
              <td className="text-center">{event.studentSize}</td>
              <td className="text-center">{event.Agegroup}</td>
              <td className="text-center">{event.schoolName}</td>
              <td className="text-center">{event.studentSize}</td>
              <td className="text-center">{event.gender}</td>
              <td className="text-center">{event.registrationCode}</td>
              <td className="text-center">{event.status}</td>


              <td className="text-center">
                <select
                  value={event.status}
                  onChange={(e) => handleStatusChange(event, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accept</option>
                  <option value="Rejected">Reject</option>
                </select>
              </td>
              {/*<button
                onClick={() => DeleteItem(data._id)}
                className="btn btn-sm btn-primary"
              >
                Delete
              </button>*/}
              {/* Add the buttons or actions as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventList;
