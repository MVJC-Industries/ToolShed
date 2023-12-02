import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const handleError = (wrongOrder, impossibleDates) => {
  if (wrongOrder) return <div>Pickup Date has to be after Dropoff Date</div>;
  if (impossibleDates) return <div>Dates have to be after Today</div>;
};

const submit = async (pickupDate, dropoffDate, message) => {
  const response = await axios.post(
    "http://localhost:3000/reservation/",

    { pickup: pickupDate, dropoff: dropoffDate, message: message }
  );
};

const ReservationForm = () => {
  const [pickup, setPickup] = useState(dayjs());
  const [dropoff, setDropoff] = useState(dayjs());
  const [message, setMessage] = useState("");
  const wrongOrder = pickup.isAfter(dropoff); //check to see if pickup is after dropoff
  const impossibleDates = pickup.isBefore(dayjs()) | dropoff.isBefore(dayjs()); //check to see if either pickup or drop off is after today
  return (
    <div className="font-sans  bg-sky-100 flex flex-col content-center align-center justify-center w-1/3 border-2 rounded-md border-slate-500 shadow-md text-center">
      <h1 className="font-semibold text-2xl pl-8 pb-5 pt-6 text-start padding-x">
        Reserve This Item
      </h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "54ch" },
        }}
        noValidate
        autoComplete="off"
        className="flex justify-center pb-7"
      >
        <TextField
          id="outlined-multiline-static"
          label="Leave a Message"
          multiline
          rows={4}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Box>
      <div className="flex flex-row align-center justify-center space-x-6 pb-4">
        <DateTimePicker
          label="Pickup"
          value={pickup}
          onChange={(newDate) => setPickup(newDate)}
        />
        <DateTimePicker
          label="Dropoff"
          value={dropoff}
          onChange={(newDate) => setDropoff(newDate)}
        />
      </div>
      <div className="text-red-500 pb-4">
        {handleError(wrongOrder, impossibleDates)}
      </div>
      <div className="pb-6">
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          className="w-50 h-12 flex justify-center "
          onClick={() => submit(pickup, dropoff, message)}
        >
          Reserve Now
        </Button>
      </div>
    </div>
  );
};

export default ReservationForm;
