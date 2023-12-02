import React, { Component } from 'react';

const formatDateString = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

const calculateTotalPrice = (price, pick_up_date, drop_off_date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const pickupDate = new Date(pick_up_date);
    const dropOffDate = new Date(drop_off_date);
    const numberOfDays = Math.round(Math.abs((pickupDate - dropOffDate) / oneDay));
  
    return [price * numberOfDays, numberOfDays];
  };

const Reservation = ({ pick_up_date, drop_off_date, price, tool_description, tool_title }) => {
    const formattedPickupDate = formatDateString(pick_up_date);
    const formattedDropOffDate = formatDateString(drop_off_date);
    const totals = calculateTotalPrice(price, pick_up_date, drop_off_date);

    return (
      <div className="bg-tea_green/60 rounded-lg pb-5 px-10 mt-10 mx-auto w-full max-w-sm">
        <h3 className="text-center text-2xl font-bold underline">{tool_title}</h3>
        <p className="text-center italic">{tool_description}</p>
        <p className="text-center">Total Cost: ${totals[0]} | # of Days: {totals[1]}</p>
        <p className="text-center">Pickup Date: {formattedPickupDate}</p>
        <p className="text-center">Drop-off Date: {formattedDropOffDate}</p>
        <div className="flex justify-center space-x-3">
          <button className="rounded-md bg-coffee text-tea_green px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-coffee/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green">Modify</button>
          <button className="rounded-md bg-coffee text-tea_green px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-coffee/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green">Cancel</button>
        </div>
      </div>
    );
  };

export default Reservation;