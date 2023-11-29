import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
const Navbar = ({username})=>{
const navigate= useNavigate();

//placeholder for handleLogout
const handleLogout=()=>{
    //clear any cookies/sessions here
    navigate("/")
}

    return(
        <div className='Navbar'>
            <span className="dashboardNav" onClick={()=>{navigate("/dashboard")}}>Tool Wall</span>
            <span className="Yourshed" onClick={()=>{navigate("/profile")}}>Your Shed</span>
            <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;