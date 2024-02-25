import axios from "axios";
import React, { useState } from "react";

const Event = ({ e, i }) => {
  const [data, setData] = useState(e);

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
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:3010/edit-event/${data._id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <td className="text-center">{i + 1}</td>
      <td className="text-center">{data.TeacherName}</td>
      <td className="text-center">{data.Teacheremail}</td>
      <td className="text-center">{data.NumberOfStudent}</td>
      <td className="text-center">{data.Agegroup}</td>
      <td className="text-center">{data.SchoolName}</td>
      <td className="text-center">
        <select
          name="status"
          onChange={(e) => handleChange(e)}
          defaultValue={data.status}
        >
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </td>
      <td className="text-center">
        <button
          onClick={() => DeleteItem(data._id)}
          className="btn btn-sm btn-primary"
        >
          Delete
        </button>
      </td>
    </>
  );
};

export default Event;
