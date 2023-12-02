import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App.jsx";
import Login from "../../src/components/Login.jsx";

// window.alert = jest.fn();
describe("Landing page", () => {
  test("renders login component heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Sign into YourShed/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe("renders Login components", () => {
  const mockProps = {
    id: "email",
    text: "Email address",
    button: "Submit",
  };

  let login;
  beforeEach(() => {
    login = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });
  test("Heading text rendered", () => {
    expect(login.getByText(/ToolShed/i)).toBeInTheDocument();
  });

  test("Form section rendered", () => {
    expect(login.getByLabelText("form")).toBeInTheDocument();
  });

  test("FormImput components (email and password) rendered", () => {
    expect(login.getByText(/Email/i)).toBeInTheDocument();
    expect(login.getByText(/Password/i)).toBeInTheDocument();
  });
  test("login route live", () => {});
});

describe("Form submission", () => {
  beforeEach(() => {
    const props = {
      mockHandleSubmit: jest.fn(() => {
        console.log("submit");
      }),
    };
    return render(
      <MemoryRouter>
        <Login {...props} />
      </MemoryRouter>
    );
  });
  test("Form submit button exists", () => {
    // console.log(mockHandleSubmit());
    expect(screen.getByText("Sign in").tagName).toBe("BUTTON");
  });
  test("Form submit click event fires", () => {
    const button = screen.getByRole("button", { name: "Sign in" });
    const clicked = fireEvent.click(button);
    expect(clicked).toEqual(true);
  });
});
