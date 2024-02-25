import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [User, setUser] = useState({
    email: "",
    password: "",
    role: "",
    fullName: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User.email !== "" && User.password !== "" && User.role !== "" && User.fullName !== "") {
      let data = JSON.stringify(User);

      let config = {
        method: "post",
        url: "http://localhost:3010/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          alert(response.data.message); // Show the registration message

          // Assuming the registration was successful, redirect to the login page
          navigateToLogin();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Handle status code 500 (Internal Server Error)
            alert(error.response.data.message);
          } else {
            // Handle other errors
            console.log(error);
          }
        });
    } else {
      alert("Please Fill all requird fields");
    }
  };

  const navigateToLogin = () => {
    navigate("/login"); // Update with the path to your login page
  };

  return (
    <div className="w-50 mt-5 m-auto" style={{ border: '3px solid', background: '#B2BABB', padding: '40px' }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={User.email}
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={User.password}
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputRole">Role</label>
          <select
            className="form-control"
            id="exampleInputRole"
            name="role"
            value={User.role}
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFullname">Fullname</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputFullname"
            placeholder="Enter fullname"
            name="fullName"
            value={User.fullName}
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Signup
        </button>
        {/* Back to Login button */}
        <button type="button" className="btn btn-link" onClick={navigateToLogin}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
