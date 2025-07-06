import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import "./Navbar.css"
import './profile.css'
import axios from "axios";


// import { useNavigate } from 'react-router-dom';
function Profile({res}) {
  const[Followers, setFollowers] = useState();
  const[posts,setPosts] = useState(0)
   console.log("profile: ",res)
   useEffect(()=>{
     const UserId = localStorage.getItem("userId");
     if (!UserId) return;
    console.log("useeffect")
    axios.get(`http://localhost:3000/user/followdata/${UserId}`)
    .then((response)=>{
      console.log("profile:",response.data.followCount)
      setFollowers(response.data.followCount)
    })

    const userId = localStorage.getItem("userId");
    axios.get(`http://localhost:3000/user/userPosts/${userId}`)
    .then((response)=>{
      console.log("response: ",response.data.res)
      setPosts(response.data.res)
      // setFollowers(response.data.followCount)
    })
   })
  return (
    <div class="profile">
      {/* <label className='icons' onClick={handleProfile}><CgProfile /> &nbsp;<span>Profile</span></label> */}
      <div className='profileHeader'>
        <div className='prfilePicture'></div>
        <div>
        <div className='profileName'><h4>{res.data.fullname}</h4></div>
         <div className='profileFollow'>
          <div><span className='follow'>{posts}</span><span className='follow'>{Followers}</span><span className='follow'>256</span></div>
         <div> <span className='follow'>posts</span><span className='follow'>followers</span><span className='follow'>following</span></div>
          {/* <br></br> */}
         </div>
        </div> 
      </div>
      <p className='username'>@{res.data.username}</p>
      <div className='profileFooter'>
      <Button variant="primary">Edit</Button>
      <Button variant="primary">Share Profile</Button>
      </div>
    </div>
  )
}

export default Profile
