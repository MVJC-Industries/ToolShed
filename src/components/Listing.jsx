import React, { Component } from 'react';

const Listing = ({searchResults})=>{

<div className="searchResults">
    {searchResults.map((result) => (
        <div key={result.id}>
            <h3>{result.toolName}</h3>
            <p>{result.description}</p>
            <p>Price: ${result.price} per hour</p>
        </div>
    ))}
</div>
}

export default Listing;