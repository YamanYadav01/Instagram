import React from 'react'
import { MdHome } from "react-icons/md";
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem("userId"))
  console.log("userId",userId)
  if(!userId){
    navigate('/signin')
  }
  const handleHome = ()=>{
        navigate('/home')
  }
  return (
    <div class="logout-container">
      <label onClick={handleHome} className='icons' ><MdHome /><span>&nbsp;Home</span></label>
    </div>
  )
}

export default Home
