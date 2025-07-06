import React from 'react';
import { LuLogOut } from "react-icons/lu";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Navbar.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("logout");
      localStorage.removeItem("userId");

      toast.success("Logout successful!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => {
        navigate('/signin');
      }, 2000);

      // If you're planning to use backend logout:
      // const res = await axios.get('http://localhost:3000/user/logout');
      // if (res.data) toast.success(res.data.msg);
    } 
    catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <>
      <div className="logout-container">
        <LuLogOut className="icons" onClick={handleLogout} />
        <span className="icons">Logout</span>
      </div>
      <ToastContainer />
    </>
  );
}

export default Logout;
