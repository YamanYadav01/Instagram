import React from 'react'
import { FaMessage } from "react-icons/fa6";
import "./Navbar.css"
function Message() {
  return (
    <div class="logout-container">
      <FaMessage className='icons' />&nbsp;<span>Message</span>
    </div>
  )
}

export default Message
