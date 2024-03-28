import React from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Paginator } from "./Paginator";
import { GET_EPISODES } from "./constants";

interface EpisodeOverview {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export function EpisodeList() {
  const { loading, error, data, fetchMore } = useQuery(GET_EPISODES, {
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
  const { episodes } = data;
  const { results, info } = episodes;
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Air Date</th>
            <th>Episode</th>
          </tr>
        </thead>
        <tbody>
          {results.map((episode: EpisodeOverview) => (
            <tr key={episode.id}>
              <td>{episode.name}</td>
              <td>{episode.air_date}</td>
              <td>{episode.episode}</td>
              <td>
                <Button
                  variant="outline-success"
                  href={`/episodes/${episode.id}`}
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
