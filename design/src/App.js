import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./components/Style/Style.css"
import Navbar from './components/Navbar/Navbar';
import UserEntry from './components/User-Components/UserEntery'
import  UserDetails from './components/User-Components/UserDetails'
import UserDetailPage from './components/User-Components/UserDetailPage'
import UserData from './components/User-Components/UserData'



function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <div>
        
          
          <Routes>
            <Route path="/" element={<UserEntry />} />
            <Route path="/UserDetails" element={<UserDetails />} />
            <Route path="/user/:userId" element={<UserDetailPage/>} />
            <Route path="/UserData" element={<UserData />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;