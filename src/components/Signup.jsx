import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui-components/FormInput.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/signup",
        {
          first_name: e.target[0].value,
          last_name: e.target[1].value,
          phone_number: e.target[2].value,
          zip_code: e.target[3].value,
          email: e.target[4].value,
          password: e.target[5].value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.sessionToken) {
        sessionStorage.setItem(
          JSON.stringify(response.data.user_id),
          JSON.stringify(response.data.sessionToken)
        );
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        " We are experiencing an internal server error. Please try again later."
      );
    }
  };
  return (
    <>
      <div className="relative z-20 flex items-center top-3 ml-10 text-lg font-medium">
        <Link to="/dashboard">
          <div>
            <p className="text-yellow-500 dark:text-yellow-500">ToolShed</p>
          </div>
        </Link>
      </div>
      <div className="grid h-full justify-center md:grid-cols-1 lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute inset-0 bg-[url('https://cdnb.artstation.com/p/assets/images/images/024/322/565/large/skaior-designs-garden-shed-big-publish.jpg?1582042307')] bg-cover md:bg-auto sm:bg-auto" />
        <div className="container relative w-full h-full max-w-2xl bg-grey">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-800">
              Create an account
            </h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <TextInput id="first_name" text="First Name" />
              <TextInput id="last_name" text="Last Name" />
              <TextInput id="phone_number" text="Phone Number" />
              <TextInput id="zip_code" text="Zip Code" />
              <TextInput id="email" text="Email" />
              <TextInput id="password" text="Password" />
              <button
                className="w-full justify-center rounded-md bg-yellow-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-800 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-100"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
