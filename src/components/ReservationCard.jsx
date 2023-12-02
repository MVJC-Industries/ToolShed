import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";

// setup real data from database later
const dummyData = {
  title: "Milwaukee Hammer Drill M18",
  location: 32601,
  qty: 3,
  pick_up_date: dayjs().toString(),
  drop_off_date: dayjs().toString(),
};

const edit = () => {};

const submit = () => {};

const ReservationCard = (
  image,
  title,
  location,
  qty,
  pickupDate,
  dropoffDate
) => {
  return (
    <div className="flex flex-row w-2/5 bg-sky-100 border-2 rounded-md border-slate-500">
      <div className="flex flex-col pt-4 pl-6 pr-12">
        <img
          className=" w-64 border-black border-2 rounded-2xl"
          src="https://images.thdstatic.com/productImages/d7b41ac4-7a1f-4283-baf6-e85ac5e92aad/svn/milwaukee-hammer-drills-2904-20-64_1000.jpg"
        ></img>
        <title className="flex w-64 pl-6 pt-2 font-bold ">
          {dummyData.title}
        </title>
        <div className="italic flex w-64 pl-6 pt-1 pb-4">
          <p>located in {dummyData.location}</p>
          <p className="pl-12">qty:{dummyData.qty}</p>
        </div>
      </div>
      <div className="flex flex-col w-full   justify-center space-y-20 pb-8 text-2xl">
        <div className="flex flex-col">
          Picked up at: <div>{dummyData.pick_up_date}</div>
        </div>
        <div className="flex flex-col">
          Return by: <div>{dummyData.drop_off_date}</div>
        </div>
      </div>
      {/* <button>Edit</button>
      <button>Delete</button> */}
    </div>
  );
};

export default ReservationCard;
