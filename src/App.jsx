import React, { useState, useEffect } from "react";
import "./styles.css";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ReservationForm from "./components/ReservationForm.jsx";
import ImageUpload from "./ui-components/ImageUpload.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/upload" element={<ImageUpload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
