import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
// for rendering the calendar
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
};

export default App;
