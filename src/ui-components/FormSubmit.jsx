import React, { Component } from "react";

const handleClick = () => {
  console.log("clicked");
};

const SubmitButton = (props) => {
  return (
    <button
      type="submit"
      className="w-full justify-center rounded-md bg-coffee text-tea_green px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-coffee/80 hover:text-tea_green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted_green"
    >
      {props.text}
    </button>
  );
};

export default SubmitButton;
