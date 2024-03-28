import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { GET_EPISODE } from "./constants";

const mocks: MockedResponse[] = [
  {
    delay: 5,
    request: {
      query: GET_EPISODE,
      variables: { id: "1" },
    },
    result: {
      data: {
        episode: {
          id: 1,
          name: "Pilot",
          air_date: "December 2, 2013",
          episode: "S01E01",
          characters: [
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
      query: GET_EPISODE,
      variables: { id: "1" },
    },
    error: new Error("no network"),
  },
];

test("renders episode details", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/episodes/1"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(await screen.findByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("Pilot")).toBeInTheDocument();
});

test("renders character details with error", async () => {
  render(
    <MockedProvider mocks={[mocks[1]]} addTypename={false}>
      <MemoryRouter initialEntries={["/episodes/1"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.findByText("Episode can not be fetched"));
});
