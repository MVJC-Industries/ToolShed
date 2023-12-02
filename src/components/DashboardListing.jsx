import React from "react";
// import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Listing = ({ searchResults }) => {
  const navigate = useNavigate();
  return (
    <div className="listings">
      {searchResults.map((tool) => (
        <div className="listing-card" key={tool.id}>
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
