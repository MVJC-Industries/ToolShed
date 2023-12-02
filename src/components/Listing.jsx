import React, { Component } from 'react';

const Listing = ({ tool_title, description, price, published_at, updated_at }) => {
    return (
      <div className="bg-tea_green/60 rounded-lg pb-5 px-10 mt-10 mx-auto w-full max-w-sm">
        <h3 className="text-center text-2xl font-bold underline">{tool_title}</h3>
        <p className="text-center italic">{description}</p>
        <p className="text-center">Price: ${price}</p>
        <div className="flex justify-center space-x-3">
            <button className="rounded-md bg-coffee text-tea_green px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-coffee/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green">Edit</button>
            <button className="rounded-md bg-coffee text-tea_green px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-coffee/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green">Delete</button>
        </div>
      </div>
    );
  };

export default Listing;