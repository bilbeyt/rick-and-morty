import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { GET_CHARACTERS } from "./constants";

const mocks: MockedResponse[] = [
  {
    delay: 5,
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              species: "Human",
              origin: {
                id: 1,
                name: "Earth (C-137)",
              },
              location: {
                id: 1,
                name: "Citadel of Ricks",
              },
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
      query: GET_CHARACTERS,
      variables: { page: 2 },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: 2,
              name: "Rick Sanchez 2",
              species: "Human",
              origin: {
                id: 1,
                name: "Earth (C-137)",
              },
              location: {
                id: 1,
                name: "Citadel of Ricks",
              },
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
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    error: new Error("No network"),
  },
];

test("renders characters and simulates next btn click", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
  expect(screen.queryByText("Previous")).not.toBeInTheDocument();
  expect(screen.queryByText("Next")).toBeInTheDocument();
  fireEvent.click(await screen.findByText("Next"));
  expect(await screen.findByText("Rick Sanchez 2")).toBeInTheDocument();
  expect(screen.queryByText("Previous")).toBeInTheDocument();
});

test("renders characters with error", async () => {
  render(
    <MockedProvider mocks={[mocks[2]]} addTypename={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.findByText("Characters can not be fetched"));
});
