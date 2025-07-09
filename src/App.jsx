import { useState } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar';
import Main_Section from './Main/Main_Section';
import SignUp from './Authentication/SignUp';
import SignIn from './Authentication/SignIn';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from './Navbar/Explore';
import Profile from './Navbar/Profile';
// import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <SignUp></SignUp> */}
      <BrowserRouter>
      <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/home' element={<Main_Section/>}/>
      <Route path='/' element={<Main_Section/>}/>
      <Route path='/explore' element={<Main_Section></Main_Section>}/>
      {/* <Route path='/' element={<App/>}/> */}
      {/* <SignIn></SignIn> */} 
    </Routes>
   
      {/* <Navbar></Navbar> */}
      
      {/* <Main_Section></Main_Section> */}

    </BrowserRouter>
    </>
  )
}

export default App;
