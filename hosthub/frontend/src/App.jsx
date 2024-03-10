// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// const logo = require('../HostHub2.png');

import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import HostInfo from "./pages/HostInfo.jsx"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hostpage/:id" element={<HostInfo />} />
        </Route>
    </Routes>
 
 
  )
}

export default App
