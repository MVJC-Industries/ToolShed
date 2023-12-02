import React from "react";
import { useNavigate } from "react-router-dom";

const Listing = ({ searchResults }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-between">
      {searchResults.map((tool) => (
        <div
          className="grid grid-rows items-center text-center mx-20 mb-10 p-5 bg-coffee/20 rounded-md text-coffee top-0"
          key={`tool-${tool.tool_id}`}
        >
          {tool.public_link ? (
            <div className="w-full aspect-[4/3]">
              <img
                src={tool.public_link}
                alt={tool.tool_title}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ) : (
            <p>No Image Available</p>
          )}
          <section className="">
            <div className="mt-10">
              <h3 className="font-bold">{tool.tool_title}</h3>
              <p className="italic">{tool.description}</p>
              <p>Price: {tool.price}</p>
            </div>
            <button
              className=" rounded-md bg-muted_green mt-5 px-3 py-1.5 leading-6 text-tea_green shadow-sm hover:bg-muted_green/80"
              onClick={() => navigate("/reservation")}
            >
              Reserve
            </button>
          </section>
        </div>
      ))}
    </div>
  );
};

export default Listing;
