import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  //placeholder for handleLogout
  const handleLogout = () => {
    //clear any cookies/sessions here
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("SessionInfo")) setLoggedIn(true);
  }, [loggedIn]);

  return loggedIn ? (
    <div className="flex justify-around items-center m-3 padding-5 background-grey color-white">
      <span
        className="dashboardNav"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Tool Wall
      </span>
      <span
        className="Yourshed"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Your Shed
      </span>{" "}
      <button
        className="justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex justify-around items-center m-3 padding-5 background-grey color-white">
      <span
        className="dashboardNav"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Tool Wall
      </span>
      <span
        className="Yourshed"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Your Shed
      </span>{" "}
      <button
        className="justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          navigate("/");
        }}
      >
        Log in
      </button>
    </div>
  );
};

export default Navbar;
