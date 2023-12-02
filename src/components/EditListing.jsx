import React, { Component } from 'react';

const EditListing = ({ tool_title, description, price, published_at, updated_at }) => {
    return (
      <div>
        <h3>{tool_title}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <div>
            <button>Submit</button>
            <button>Cancel</button>
        </div>
      </div>
    );
  };

export default EditListing;