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
        <div className="w-75 m-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label className="my-1">School Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter School Name"
                name="SchoolName"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Teacher Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Teacher Name"
                name="TeacherName"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Teacher Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter Teacher Email"
                name="Teacheremail"
                required
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div class="form-group my-1">
              <label className="my-1">Number Of Student</label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter Number Of Student"
                name="NumberOfStudent"
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
