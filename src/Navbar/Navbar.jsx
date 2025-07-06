import React, { useState } from 'react'
import Home from './Home'
import Explore from './Explore'
import CreatePost from './CreatePost'
import Profile from './Profile'
import Logout from './Logout'
import { useEffect } from 'react';
import './Navbar.css'
import Search from './Search'
import Message from './Message'
import Notification from './Notification'
import { TiSocialAtCircular } from "react-icons/ti";
import Header from './Header'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const[userName, setuserName] = useState('profile');
  const navigate =  useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"))
  if(!userId){
    navigate('/signin')
  }
  useEffect(()=>{
      axios.get(`http://localhost:3000/user/userPosts/${userId}`)
        .then((response)=>{
          console.log("response: ",response.data.postData)
          setuserName(response.data.postData.fullname)
          console.log(userName)
          // setFollowers(response.data.followCount)
        })
})
  const handleProfile = async()=>{
    const userId = JSON.parse(localStorage.getItem("userId"))
    console.log(userId)
    
    try{
      const response =  await axios.get(`http://localhost:3000/user/profile/${userId}`)
    console.log("resProfile: ",response)
    const userData = {
    view: 'profile',
    resProfile: response.data,
    };

    navigate('/home', {state:userData})
      }catch(err){
        console.error("Error to get profile:", err);
        alert("Error to get profile");
      }

  }

  // const userId = JSON.parse(localStorage.getItem("userId"))
  //       if(!userId){
  //         navigate('/signin')
  //       }
  return (
    
    <div className='Navbar'>
    
    <div className='Nav'>
    <div><TiSocialAtCircular className='logo-icons' /><span className='soical_media'>Instagram</span></div>
    
      <Home></Home>
      {/* <Search></Search> */}
      <Explore></Explore>
      {/* <Message></Message> */}
      {/* <Notification></Notification> */}
      <CreatePost></CreatePost>
      {/* <Profile></Profile> */}
      <Logout></Logout>
    <label onClick={handleProfile}>
      <CgProfile className="profileIcon" />
      <br />
      {userId ? <span>{userName}</span> : "kkh"}
    </label>
      </div>
    </div>
  )
}

export default Navbar
