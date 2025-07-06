import React, { useState } from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import { useEffect } from 'react';
import axios from "axios";

function Header() {
  const[LoginUser, setLoginUser] = useState();
  const navigate = useNavigate();
  const token = Cookies.get('token');
  function handleSignin() {
    navigate('/signin');
  }
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const response = await axios.get(`http://localhost:3000/user/profile/${userId}`)
        console.log("response: ", response);
        setLoginUser(response.data.data.username)
        // setPosts(response.data.res);
        // setFollowers(response.data.followCount);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  return (
    <div>
      <div className='header'>
        <div>
          {/* Render "Sign In" only if cookies.token is not set */}
        
          {userId ?
               <b className='loguser'>{LoginUser}</b> :
              <p className='sign' onClick={handleSignin}>
                Sign In
              </p>
          }
        </div>
      </div>
    </div>
  ); 
}

export default Header;
