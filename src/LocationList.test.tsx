import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { GET_LOCATIONS } from "./constants";

const mocks: MockedResponse[] = [
  {
    delay: 5,
    request: {
      query: GET_LOCATIONS,
      variables: { page: 1 },
    },
    result: {
      data: {
        locations: {
          results: [
            {
              id: 1,
              name: "Earth (C-137)",
              type: "Planet",
              dimension: "Dimension C-137",
            },
          ],
          info: {
            next: 2,
            prev: null,
            count: 1,
          },
        },
      },
    },
  },
  {
    delay: 5,
    request: {
      query: GET_LOCATIONS,
      variables: { page: 2 },
    },
    result: {
      data: {
        locations: {
          results: [
            {
              id: 1,
              name: "Earth (C-137) 2",
              type: "Planet",
              dimension: "Dimension C-137",
            },
          ],
          info: {
            next: 3,
            prev: 1,
            count: 1,
          },
        },
      },
    },
  },
  {
    delay: 5,
    request: {
      query: GET_LOCATIONS,
      variables: { page: 1 },
    },
    error: new Error("No network"),
  },
];

test("renders locations and simulates next btn click", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/locations"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("Earth (C-137)")).toBeInTheDocument();
  expect(screen.queryByText("Previous")).not.toBeInTheDocument();
  expect(screen.queryByText("Next")).toBeInTheDocument();
  fireEvent.click(await screen.findByText("Next"));
  expect(await screen.findByText("Earth (C-137) 2")).toBeInTheDocument();
  expect(screen.queryByText("Previous")).toBeInTheDocument();
});

test("renders locations with error", async () => {
  render(
    <MockedProvider mocks={[mocks[2]]} addTypename={false}>
      <MemoryRouter initialEntries={["/locations"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.findByText("Locations can not be fetched"));
});
