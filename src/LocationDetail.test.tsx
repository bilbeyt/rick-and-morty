import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { GET_EPISODE, GET_LOCATION } from "./constants";

const mocks: MockedResponse[] = [
  {
    delay: 5,
    request: {
      query: GET_LOCATION,
      variables: { id: "1" },
    },
    result: {
      data: {
        location: {
          id: 1,
          name: "Earth (C-137)",
          type: "Planet",
          dimension: "Dimension C-137",
          residents: [
            {
              id: 1,
              name: "Rick Sanchez",
            },
          ],
          created: "2017-11-04T18:48:46.250Z",
        },
      },
    },
  },
  {
    delay: 5,
    request: {
      query: GET_LOCATION,
      variables: { id: "1" },
    },
    error: new Error("no network"),
  },
];

test("renders location details", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/locations/1"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(await screen.findByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("Earth (C-137)")).toBeInTheDocument();
});

test("renders location details with error", async () => {
  render(
    <MockedProvider mocks={[mocks[1]]} addTypename={false}>
      <MemoryRouter initialEntries={["/locations/1"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.findByText("Location can not be fetched"));
});
