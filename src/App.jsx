import React, { useState, useEffect } from "react";
import "./styles.css";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
