import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

const mocks: MockedResponse[] = [];

test("renders boilerplate", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const header = screen.getByRole("heading", {
    name: /full stack web engineer/i,
  });
  expect(header).toBeInTheDocument();
});
