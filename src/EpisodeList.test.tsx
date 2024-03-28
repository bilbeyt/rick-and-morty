import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { GET_EPISODES } from "./constants";

const mocks: MockedResponse[] = [
  {
    delay: 5,
    request: {
      query: GET_EPISODES,
      variables: { page: 1 },
    },
    result: {
      data: {
        episodes: {
          results: [
            {
              id: 1,
              name: "Pilot",
              air_date: "December 2, 2013",
              episode: "S01E01",
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
      query: GET_EPISODES,
      variables: { page: 2 },
    },
    result: {
      data: {
        episodes: {
          results: [
            {
              id: 1,
              name: "Pilot 2",
              air_date: "December 2, 2013",
              episode: "S01E01",
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
      query: GET_EPISODES,
      variables: { page: 1 },
    },
    error: new Error("No network"),
  },
];

test("renders episodes and simulates next btn click", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/episodes"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("Pilot")).toBeInTheDocument();
  expect(screen.queryByText("Previous")).not.toBeInTheDocument();
  expect(screen.queryByText("Next")).toBeInTheDocument();
  fireEvent.click(await screen.findByText("Next"));
  expect(await screen.findByText("Pilot 2")).toBeInTheDocument();
  expect(screen.queryByText("Previous")).toBeInTheDocument();
});

test("renders episodes with error", async () => {
  render(
    <MockedProvider mocks={[mocks[2]]} addTypename={false}>
      <MemoryRouter initialEntries={["/episodes"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.findByText("Episodes can not be fetched"));
});
