import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate} from "react-router-dom";

import "./signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple form validation
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required.";
    if (!password) validationErrors.password = "Password is required.";
    if (!fullname) validationErrors.fullname = "Full Name is required.";
    if (!username) validationErrors.username = "Username is required.";
    
    // If there are errors, don't submit the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const  data = {
      email: email,
      fullname: fullname,
      password: password,
      username: username
    };
    console.log('sign up: ',data)
    // const jsonString = JSON.stringify(data)
    // console.log(email, fullname, password, username, "data- ", data)
    // API Call
    axios.post('http://localhost:3000/user/signup', data )
    .then(res => { 
      // console.log(res);
      if(res.data.message){
        navigate('/signin')
        alert(res.data.message)
      }
      

      // Optionally reset the form here
      setEmail("");
      setFullname(""); 
      setPassword("");
      setUsername("");
    })
    .catch(error => {
    console.log(error);
    });

  };

  return (
    <div className="signup-container">
      <div className="container1">
        <h2>Instagram</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Mobile Number or Email"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

          <input
            type="text"
            name="fullname" 
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
          />
          {errors.fullname && <span style={{ color: 'red' }}>{errors.fullname}</span>}

          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}

          <button type="submit" >Sign up</button>
          <span>Already have an account? <Link to="/signin">Sign in</Link></span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
