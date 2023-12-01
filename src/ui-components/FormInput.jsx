import React, { Component } from "react";

const TextInput = (props) => {
  const { id, text } = props;
  return (
    <>
      <section className="relative z-0 mb-6 w-full group">
        {" "}
        <input
          type={id}
          name={id}
          id={id}
          className=" block py-2.5 px-0 w-full text-sm text-coffee bg-transparent border-0 border-b-2 border-coffee appearance-none  focus:border-muted_green focus:outline-none focus:ring-0 focus:border-muted_green peer"
          placeholder=" "
          required
        />
        <label
          htmlFor={id}
          className="absolute text-sm text-coffee duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-muted-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
        >
          {text}
        </label>
      </section>
    </>
  );
};

export default TextInput;
