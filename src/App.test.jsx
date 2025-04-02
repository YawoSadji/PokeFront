import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  getByText,
  waitFor,
} from "@testing-library/react";
import App from "./App";

test("App should render", () => {
  render(<App />);
  expect(screen.getByText("PokeFront")).toBeInTheDocument();
});
