import React, { useState, Component } from 'react';
import Navbar from "./Navbar.jsx";
import Profile from "./Profile.jsx";
import Listing from "./Listing.jsx";
//import anything else we need in dashboard

const Dashboard=()=>{
//add search bar
const [querystr, setQuerystr] = useState('');
const [searchResults, setSearchResults] = useState([]);


const handleSearch = async(e)=>{
    e.preventDefault();
    // Make a request to the server with the search query
    try {
        const response = await fetch(`http://localhost:3000/dashboard/tools/search?query=${querystr}`);
        const data = await response.json();
        setSearchResults(data);
        // Handle the response data
      } catch (error) {
        // Handle errors
        console.error("Error fetching search results:", error);
      }
}
//display listings
    return(
        <div className="dasboard">
            <Navbar/>
            <div className="searchbar">
                <input
                type="text"
                value={querystr}
                onChange={(e) => setQuerystr(e.target.value)}
                placeholder="Search for tools..."
                 />
                <button onClick={(e)=>handleSearch(e)}>Search</button>
            </div>
            <Listing searchResults={searchResults}></Listing>
        </div>
    )
}

export default Dashboard;