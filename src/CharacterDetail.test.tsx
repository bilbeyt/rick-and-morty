import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { GET_CHARACTER } from "./constants";

const mocks: MockedResponse[] = [
  {
    delay: 5,
    request: {
      query: GET_CHARACTER,
      variables: { id: "1" },
    },
    result: {
      data: {
        character: {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            id: 1,
            name: "Earth (C-137)",
          },
          location: {
            id: 1,
            name: "Citadel of Ricks",
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: [
            {
              id: 1,
              name: "Pilot",
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
      query: GET_CHARACTER,
      variables: { id: "1" },
    },
    error: new Error("no network"),
  },
];

test("renders character details", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/characters/1"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(await screen.findByRole("status")).toBeInTheDocument();
  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
  expect(await screen.findByText("Pilot")).toBeInTheDocument();
});

test("renders character details with error", async () => {
  render(
    <MockedProvider mocks={[mocks[1]]} addTypename={false}>
      <MemoryRouter initialEntries={["/characters/1"]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.findByText("Character can not be fetched"));
});
