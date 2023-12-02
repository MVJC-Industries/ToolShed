import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../src/App.jsx";
import "@testing-library/jest-dom";

describe("Landing page", () => {
  test("renders login component heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Sign into YourShed/i);
    expect(headingElement).toBeInTheDocument();
  });
});
