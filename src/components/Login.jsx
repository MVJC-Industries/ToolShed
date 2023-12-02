import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui-components/FormInput.jsx";
import SubmitButton from "../ui-components/FormSubmit.jsx";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/login",
        {
          email: e.target[0].value,
          password: e.target[1].value,
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
          "SessionInfo",
          JSON.stringify({
            id: response.data.user_id,
            token: response.data.sessionToken,
          })
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
            <h1 className="text-mindaro text-4xl m-3">ToolShed</h1>
          </div>
        </Link>
      </div>{" "}
      <div className="grid h-full justify-center md:grid-cols-1 lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute inset-0 bg-[url('https://cdnb.artstation.com/p/assets/images/images/024/322/565/large/skaior-designs-garden-shed-big-publish.jpg?1582042307')] bg-cover bg-right sm:bg-auto sm:bg-top lg:bg-cover " />
        <div className="container relative flex h-full max-w-2xl bg-grey">
          <div className="bg-tea_green/20 sm:bg-tea_green/80 md:bg-tea_green/60 lg:bg-tea_green/30 rounded-lg pb-5 px-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-coffee">
              Sign into YourShed
            </h1>
            <form
              id="login"
              aria-label="form"
              className="space-y-6 border-b border-gray-900/10 "
              onSubmit={handleSubmit}
            >
              <TextInput id="email" text="Email" />
              <TextInput id="password" text="Password" />
              <div>
                <SubmitButton text="Sign in" />
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-tea_green sm:text-coffee/95">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 sm:text-coffee text-coffee/90 hover:text-coffee/70"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
