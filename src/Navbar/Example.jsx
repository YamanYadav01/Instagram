import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { IoMdPhotos } from "react-icons/io";
import { toast } from "react-toastify";

import "./Navbar.css";

function Example({ show, setShow }) {
  const inputRef = useRef(null);
  const imageRef = useRef();
  const [textarea, setTextarea] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const objectURL = URL.createObjectURL(file);
      imageRef.current.src = objectURL;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !textarea) {
      toast.warn("Please add an image and share your thoughts.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const postData = new FormData();
    postData.append("image", image);
    postData.append("thoughts", textarea);
    postData.append("userId", userId);

    axios
      .post("http://localhost:3000/upload", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
        }
        setShow(false);
        setTextarea("");
        setImage(null);
        if (imageRef.current) imageRef.current.src = "";
      })
      .catch((error) => {
        console.error("Error uploading post:", error);
        toast.error("Error uploading your post");
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="addPhoto" onClick={handleImage}>
              Add Photos &nbsp;
              <IoMdPhotos className="icons" />
            </span>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleChange}
            />
            <br />
            <img ref={imageRef} alt="" style={{ maxWidth: "100%", marginTop: "10px" }} />
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Share Your Thought</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
