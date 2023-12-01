import React, { useState, Component } from 'react';
import Navbar from "./Navbar.jsx";
import Profile from "./Profile.jsx";
import Listing from "./DashboardListing.jsx";
import "./Dashboard.css"
//import anything else we need in dashboard

const Dashboard=()=>{
//add search bar
const [querystr, setQuerystr] = useState('');
const [searchResults, setSearchResults] = useState([]);


const handleSearch = async(e)=>{
    e.preventDefault();
    // Make a request to the server with the search query
    try {
        const response = await fetch(`http://localhost:3000/dashboard/tools/search`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: querystr })
        });
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
        <div>
            <Navbar/>
        <div className="dashboard">
            <div className="searchbar">
                <input
                type="text"
                value={querystr}
                onChange={(e) => setQuerystr(e.target.value)}
                placeholder="Search for tools..."
                 />
                <button onClick={(e)=>handleSearch(e)}>Search</button>
            </div>
            <Listing classname="listings" searchResults={searchResults}></Listing>
        </div>
        </div>
    )
}

export default Dashboard;