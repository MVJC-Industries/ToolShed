import React from "react";
// import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";

const Listing = ({ searchResults }) => {
  const navigate = useNavigate();
  return (
    <div className="flex m-10">
      {searchResults.map((tool) => (
        <div
          className="p-10 bg-tea_green w-full h-full mb-10 rounded-md"
          key={tool.id}
        >
          <h3>{tool.tool_title}</h3>
          <p>{tool.description}</p>
          <p>Price: {tool.price}</p>
          <button onClick={() => navigate("/reservation")}>
            Make Reservation
          </button>
        </div>
      ))}
    </div>
  );
};

export default Listing;
