import React, {useState, useEffect} from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";

const App=()=>{

    return (
      <div>
        <BrowserRouter>
        <h1>Hello world!</h1>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )


}

export default App;