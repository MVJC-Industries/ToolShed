import React, { Component } from "react";
import ReservationForm from "./ReservationForm.jsx";
import ReservationCard from "./ReservationCard.jsx";

const Login = () => {
  return (
    <div>
      <p className="text-3xl font-bold underline border-2 h-full ">
        This is our login page
      </p>
      <ReservationCard />
    </div>
  );
};

export default Login;
