import React from "react";
// import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Listing = ({ searchResults }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_16.666666%)] justify-center">
      {searchResults.map((tool) => (
        <div
          className="flex flex-col col-span-2 justify-center justify-self-center p-5 bg-coffee/20 w-3/5 mb-10 rounded-md mx-10 text-coffee"
          key={tool.id}
        >
          <h3 className="font-bold">{tool.tool_title}</h3>
          <p>{tool.description}</p>
          <p>Price: {tool.price}</p>
          <button
            className="basis-1/4 rounded-md bg-muted_green px-3 py-1.5 mt-10 leading-6 text-tea_green shadow-sm hover:bg-muted_green/80"
            onClick={() => navigate("/reservation")}
          >
            Reserve
          </button>
        </div>
      ))}
    </div>
  );
};

export default Listing;
