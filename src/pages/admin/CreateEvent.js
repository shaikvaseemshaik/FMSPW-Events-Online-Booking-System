import axios from "axios";
import React, { useState } from "react";

const CreateEvent = () => {
  const [Show, setShow] = useState(false);
  const [Data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3010/createEvent",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: Data,
    };
  
    axios
      .request(config)
      .then((response) => {
        if (
          response.data &&
          response.data.message === "Event created successfully"
        ) {
          alert(response.data.message);
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div>
      <button
        onClick={() => setShow(!Show)}
        className="btn btn-sm btn-primary my-3 mx-3"
      >
        {" "}
        {Show ? "Hide" : "Create Event"}{" "}
      </button>
      {Show && (
        <div className="w-75 m-auto" style={{ border: '3px solid', background: '#B2BABB', padding: '40px' }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label className="my-1">Event Title</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Event title"
                name="eventTitle"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Event Description</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Description"
                name="eventDescription"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Venue</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Venue"
                name="eventVenue"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Time</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter time of event"
                name="eventTime"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Age Group</label>
              <select
                class="form-select"
                placeholder="Enter Age Group"
                name="Agegroup"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              >
                <option value=""> select</option>
                <option value="GCSE">GCSE</option>
                <option value="A-level">A-level</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary my-2">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
