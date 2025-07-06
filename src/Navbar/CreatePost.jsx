import React from 'react'
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Button from 'react-bootstrap/Button';
// import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'

import "./Navbar.css"
import Example from './Example';
function CreatePost() {
  const [show, setShow] = React.useState(false);

  const handleShow = () => setShow(true);
  return (
    <div class="logout-container">
     <span onClick={handleShow} style={{cursor:'pointer'}}>  <MdOutlineCreateNewFolder className='icons' />
        Create
   </span>

     <Example show={show} setShow={setShow}></Example>

    </div>
  )
}

export default CreatePost
