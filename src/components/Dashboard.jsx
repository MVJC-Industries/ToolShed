import React, { useState, Component } from "react";
import Navbar from "./Navbar.jsx";
import Profile from "./Profile.jsx";
import Listing from "./DashboardListing.jsx";
//import anything else we need in dashboard

const Dashboard = () => {
  //add search bar
  const [querystr, setQuerystr] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Make a request to the server with the search query
    try {
      const response = await fetch(
        `http://localhost:3000/dashboard/tools/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: querystr }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
      // Handle the response data
    } catch (error) {
      // Handle errors
      console.error("Error fetching search results:", error);
    }
  };
  //display listings
  return (
    <>
      <Navbar />
      <div className="">
        <div className="bg-gray-100 flex items-center justify-start flex-col mx-2 pb-6">
          <p className="m-5">What are you looking for?</p>

          <div>
            <input
              className="border-2 rounded-md py-1 px-3 mx-3 "
              type="text"
              value={querystr}
              onChange={(e) => setQuerystr(e.target.value)}
              placeholder="Search for tools..."
            />
            <button
              className="justify-center rounded-md bg-gray-600 py-1.5 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleSearch(e)}
            >
              Search
            </button>
          </div>
        </div>
        <div class="flex justify-center mx-auto max-w-2xl px-4 py-4 sm:px-6  lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 ">
            Tools for Rent
          </h2>
        </div>
        <div class="group-relative px-6 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-max xl:gap-x-8">
          <Listing searchResults={searchResults}></Listing>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
