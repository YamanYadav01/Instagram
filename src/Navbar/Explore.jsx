import React from 'react'
import { MdOutlineExplore } from "react-icons/md";
import axios from 'axios';
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import Main_Section from '../Main/Main_Section';
function Explore() {
    const navigate =  useNavigate();
    const handlePOST = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/Posts");
        
        const userData = {
          view: 'posts',
          res: response.data
        };
  
        navigate('/explore', { state: userData });
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Error uploading your post");
      }
    };
    
  return (
    <div class="logout-container">
    <label onClick={handlePOST} className='icons' ><MdOutlineExplore  />&nbsp;  <span >Explore</span></label>
    </div>
  )
}

export default Explore
