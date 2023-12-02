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
    <div className="flex flex-row justify-start items-center text-mindaro top-3 bg-reseda_green">
      <h1
        className="text-2xl basis-1/8 m-5 hover:text-mindaro/90 cursor-pointer"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        ToolShed
      </h1>
      <h1
        className="text-2xl basis-1/8 m-5 hover:text-mindaro/90 cursor-pointer"
        onClick={() => {
          navigate("/profile");
        }}
      >
        MyShed
      </h1>

      <button
        className="absolute right-10 rounded-md bg-mindaro px-3 py-1.5 text-sm font-semibold leading-6 text-coffee shadow-sm hover:bg-mindaro/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mindaro/80"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex items-center text-mindaro top-3 p-7 bg-reseda_green">
      <div className="absolute left-5">
        <h1
          className="text-mindaro text-4xl m-3 hover:text-minaro/90 cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          ToolShed
        </h1>
      </div>
      <button
        className="absolute right-10 rounded-md bg-mindaro px-3 py-1.5 text-sm font-semibold leading-6 text-coffee shadow-sm hover:bg-mindaro/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mindaro/80"
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
