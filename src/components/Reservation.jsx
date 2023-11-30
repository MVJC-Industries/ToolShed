import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Button, TextField, Box } from "@mui/material";

const handleError = (wrongOrder, impossibleDates) => {
  if (wrongOrder) return <div>Pickup Date has to be after Dropoff Date</div>;
  if (impossibleDates) return <div>Dates have to be after Today</div>;
};

const Reservation = () => {
  const [pickup, setPickup] = useState(dayjs());
  const [dropoff, setDropoff] = useState(dayjs());
  const wrongOrder = pickup.isAfter(dropoff); //check to see if pickup is after dropoff
  const impossibleDates = pickup.isBefore(dayjs()) | dropoff.isBefore(dayjs()); //check to see if either pickup or drop off is after today
  return (
    <form>
      <h1>Reservation Form</h1>
      <span>Fill out the form below</span>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "54ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-static"
          label="Leave a Message"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
      </Box>
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
      {handleError(wrongOrder, impossibleDates)}
      <Button variant="contained">Reserve Now</Button>
    </form>
  );
};

export default Reservation;
