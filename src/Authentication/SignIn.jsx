import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ← Required for styling

function SignIn() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("sign")
    const validationErrors = {};
    if (!formdata.email) validationErrors.email = "Email is required.";
    if (!formdata.password) validationErrors.password = "Password is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/user/signin', formdata, {
        withCredentials: true,
      });
      console.log(res)

      if (res.data.message) {
        console.log(res)
        toast.success(res.data.message || "Login successful!");
        localStorage.setItem("userId", JSON.stringify(res.data.email));
        setFormdata({ email: "", password: "" });

        // Delay navigation to let toast show
        setTimeout(() => {
          navigate('/');
        }, );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='login-container'>
      <div className='container1'>
        <h2>Instagram</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            value={formdata.email}
            onChange={handleChange}
            placeholder='Enter your email'
          /><br />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          
          <input
            type='password'
            name='password'
            value={formdata.password}
            onChange={handleChange}
            placeholder='Enter password'
          /><br />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          
          <button type="submit">Log in</button>
          <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
    </div>
  );
}

export default SignIn;
