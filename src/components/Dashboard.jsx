import React, { useState, Component, useEffect } from "react";
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
      <div className="flex flex-col bg-coffee/20 items-center justify-center py-6">
        <section className="relative z-0 mb-6 group w-3/5">
          <input
            type="text"
            value={querystr}
            onChange={(e) => setQuerystr(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-coffee bg-transparent border-0 border-b-2 border-coffee appearance-none  focus:border-muted_green focus:outline-none focus:ring-0 focus:border-muted_green peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="text"
            className="absolute text-sm text-coffee duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-muted-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
          >
            What are you looking for?
          </label>
        </section>
        <button
          className="rounded-md bg-coffee text-tea_green px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-coffee/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex justify-center mx-auto max-w-2xl px-4 py-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-coffee ">
          Tools for Rent
        </h2>
      </div>
      <div>
        <Listing searchResults={searchResults}></Listing>
      </div>
    </>
  );
};

export default Dashboard;
