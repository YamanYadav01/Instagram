import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Main.css';
import axios from 'axios';
import Explore from '../Navbar/Explore';
import Posts from './Posts';
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from '../Navbar/Profile';
import image from './image.png';

function Main_Section() {
  const [users, setUsers] = useState([]); // Ensure it's an array
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const { view, res, resProfile } = state || {};
  const colors = ['#e0f7fa', '#fce4ec', '#f3e5f5', '#fff9c4', '#dcedc8', '#ffecb3'];

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (!userId) {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/users`);
        console.log("users: ", response.data);

        // Check if response is an array or an object with array inside
        if (Array.isArray(response.data.res)) {
          setUsers(response.data.res);
        } else if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.warn("Unexpected response format:", response.data);
          setUsers([]);
        }

      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='Main-section'>
      <Navbar />
      <div className='main-content'>
        {view === 'posts' && <Posts res={res} />}
        {view === 'profile' && <Profile res={resProfile} />}
        {!view && (
          <div className="welcome-container">
            <h2>Users</h2>
            <ul className='ul'>
              {Array.isArray(users) && users.map((userdata, index) => (
                <li key={index} className='userlist' style={{ backgroundColor: colors[index % colors.length] }}><b>{userdata.username}</b></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main_Section;
