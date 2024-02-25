import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [User, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User.email !== "" && User.password !== "") {
      let data = JSON.stringify(User);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3010/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
            let config = {
              method: "get",
              maxBodyLength: Infinity,
              url: "http://localhost:3010/getRole",
              headers: {
                Authorization: response.data.token,
                "Content-Type": "application/json",
              },
              data: data,
            };

            axios
              .request(config)
              .then((response) => {
                if (response.data.role === "teacher") {
                  navigate("/Dashboard/Teacher");
                } else if (response.data.role === "admin") {
                  navigate("/Dashboard/admin");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Fill Email and Password");
    }
  };
  const navigateToSignup = () => {
    navigate("/Signup"); // Update with the path to your signup page
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        
        <button type="button" className="btn btn-link" onClick={navigateToSignup}>
          Don't have an account? Sign up here.
        </button>
      </form>

    </div>

  )
};

export default Login;
