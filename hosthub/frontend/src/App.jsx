// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// const logo = require('../HostHub2.png');

import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./Layout.jsx";
import HostInfo from "./pages/HostInfo.jsx"
import UserInfoPage from "./pages/UserInfoPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import HostSignUp from "./pages/HostSignup.jsx"
import EditProfile from "./pages/EditProfile.jsx"
import CheckOut from "./pages/checkOut.jsx";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/:subpage" element={<UserInfoPage />} />
            <Route path="/hostpage/:id" element={<HostInfo />} />
            <Route path="/hostSignup" element={<HostSignUp />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/checkOut/:cart_id" element={<CheckOut />} />
          </Route>
      </Routes>
    </UserContextProvider>
 
  )
}

export default App
