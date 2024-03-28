import React from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Paginator } from "./Paginator";
import { GET_CHARACTERS } from "./constants";

interface CharacterOverview {
  id: string;
  name: string;
  species: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export function CharacterList() {
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
    },
  });

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error)
    return (
      <Alert key="danger" variant="danger">
        Characters can not be fetched!
      </Alert>
    );
  const { characters } = data;
  const { results, info } = characters;
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Origin</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((character: CharacterOverview) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>{character.species}</td>
              <td>{character.origin.name}</td>
              <td>{character.location.name}</td>
              <td>
                <Button
                  variant="outline-success"
                  href={`/characters/${character.id}`}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginator
        limit={results.length}
        count={info.count}
        nextPage={info.next}
        prevPage={info.prev}
        onPageChange={(page: number) => {
          fetchMore({
            variables: {
              page: page,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return fetchMoreResult;
            },
          });
        }}
      />
    </div>
  );
}
