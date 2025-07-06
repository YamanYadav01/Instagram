import React, { useEffect, useState } from "react";
import { BiDislike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "./posts.css";

function Posts({ res }) {
  console.log("res1: ",res)
  const [likedPosts, setLikedPosts] = useState({});
  const [state, setState] = useState(false)
  const [followStatus, setFollowStatus] = useState({});
  
   useEffect(()=>{
    const userId = localStorage.getItem("userId");
       if (!userId) return;

       axios.get(`http://localhost:3000/user/likedata/${userId}`)
    .then((response) => {
      console.log("🔹 API Response:", response.data);
      console.log("🔹 API Response Type:", typeof response.data);

      // let updatedLikes = {}; 

      if (
        response.data &&
        typeof response.data === "object" &&
        Array.isArray(response.data.data)
      ) {
        const updatedLikes = {};
      
        response.data.data.forEach((post) => {
          if (post.postId) {  // Ensure postId exists
            updatedLikes[post.postId] = {
              likeCount: post.likeCount || 0,
              liked: post.liked || false,
            };
          } else {
            console.error("🚨 Missing postId in:", post);
          }
        });
      
        console.log("✅ Updated Likes State:", updatedLikes);
        setLikedPosts(updatedLikes);
      } else {
        console.error("🚨 Invalid response format:", response.data);
      } 
    })

     const UserId = localStorage.getItem("userId");;
     axios.get(`http://localhost:3000/user/followdata/${UserId}`)
    .then((response) => {
      const status = {};
      console.log("resfollow: ",response)
      if (Array.isArray(response.data.followedUser)) {
        response.data.followedUser.forEach(follow => {
          status[follow.postId] = true;  // or follow.userId, depending on what you track
        });
      } else if (response.data.followedUser?.followUsers) {
        response.data.followedUser.followUsers.forEach(user => {
          status[user] = true;
        });
      }
  
      setFollowStatus(status);
    })
    .catch(console.error);
   },[])

  const handleLike = async (postId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await axios.put(`http://localhost:3000/user/liked/${postId}/${userId}`);

      // ✅ Update the likedPosts state after API response
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: {
          likeCount: response.data.likeCount,
          liked: !prevLikedPosts[postId]?.liked, // Toggle Like State
        },
      }));
    } catch (error) {
      console.error("Error updating like:", error);
      alert("Error updating like");
    }
  };

  // console.log("Liked Posts Data: ", likedPosts);

  //Follow and UnFollow
  const handleFollow = async (postUserId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  
    try {
      const res = await axios.put(`http://localhost:3000/user/follow/${userId}/${postUserId}`);
      
      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [postUserId]: res.data.Followed, // Assuming API returns true/false
      }));
    } catch (error) {
      console.error("Error in follow/unfollow:", error);
    }
  };
  

  return (
    <div>
      {res?.data?.map((data) => {
        const isLiked = likedPosts[data._id]?.liked || false;
        const likeCount = likedPosts[data._id]?.likeCount ?? data.likeCount ?? 0;
        {/* const  state  =    state[data._id]?.Followd || false; */}
        return (
          <div className="main-area" key={data._id}>
          <h5>{data.username}</h5>
            <div className="image-section">
              <img
                src={`http://localhost:3000/Photos/${data.filename}`}
                alt="Post"
                className="image"
              />
            </div>
            <div>
              <p>{data.thoughts}</p>
            </div>
            <div className="post-actions">
              <label onClick={() => handleLike(data._id)}>
                {isLiked ? (
                  <svg width="22" height="25" viewBox="0 0 24 24" fill="#ff0000">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                )}
                &nbsp;
                <span>{likeCount}</span>
              </label>
              <label>
              
                {
                  followStatus[data.userId]
                    ? <Button variant="secondary" disabled style={{ backgroundColor: 'grey' }}>Following</Button>
                    : <Button variant="primary" onClick={() => handleFollow(data.userId)}>Follow</Button>
                }

              </label>
              <label>
                <GoComment />
              </label>
              <label>
                <IoIosShareAlt />
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
