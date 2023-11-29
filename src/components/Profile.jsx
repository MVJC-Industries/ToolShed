import React, { Component, useEffect, useState } from 'react';
import Navbar from './Navbar.jsx'
import Listing from './Listing.jsx'

const Profile = ()=>{
    const [listings, setListings] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [rentals, setRentals] = useState([]);
    //this userID is temporary in liu of not having database access currently (11/28)
    const userID = 1;

    useEffect(() => {
        //function to get users listing and set user listing state
        const fetchUserListings = async () => {
            try {
                const response = await fetch(`/listing/${userID}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch user listings');
                }

                const userListings = await response.json();
                setListings(userListings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user listings: ', error);
                setLoading(false);
            }
        };

        //function to get user rentals and set user rental state
        const fetchUserRentals = async () => {
            try {
                const response = await fetch(`/rentals/${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user rentals');
                }
                const userRentals = await response.json();
                setRentals(userRentals);
            } catch (error) {
                console.error('Error fetching user rentals: ', error);
            }
        }

        //call fetch User Listings
        fetchUserListings();

        //call fetch User Rentals
        fetchUserRentals();
        console.log('tried to get stuff');
    }, []);

    return(
        <div>
            <Navbar/>
            <div>
                <h1>My Shed</h1>
            </div>
            <div>
                <button onClick={() => handleClick('button1')}>Button 1</button>
                <button onClick={() => handleClick('button2')}>Button 2</button>
            </div>
            <div>
                <Listing/>
                <Listing/>
                <Listing/>
            </div>
        </div>
    )
}

export default Profile;