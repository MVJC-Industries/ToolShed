import React, { Component } from "react";

const Signup = () => {
  return (
    <div>
      <div>
        <h1>Sign in</h1>
        <form action="/user/signup" method="post">
          <section>
            <label for="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autocomplete="first_name"
              required
              autofocus
            />
          </section>
          <section>
            <label for="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autocomplete="last_name"
              required
              autofocus
            />
          </section>
          <section>
            <label for="phone_number">Phone</label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              autocomplete="phone_number"
              required
            />
          </section>
          <section>
            <label for="zip_code">Zip Code</label>
            <input
              id="zip_code"
              name="zip_code"
              type="text"
              autocomplete="zip_code"
              required
            />
          </section>
          <section>
            <label for="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              autofocus
            />
          </section>
          <section>
            <label for="current-password">Password</label>
            <input
              id="current-password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
            />
          </section>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
