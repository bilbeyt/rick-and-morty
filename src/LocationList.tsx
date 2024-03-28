import React from "react";
import { useQuery, gql } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Paginator } from "./Paginator";
import { GET_LOCATIONS } from "./constants";

interface LocationOverview {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export function LocationList() {
  const { loading, error, data, fetchMore } = useQuery(GET_LOCATIONS, {
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
        Locations can not be fetched!
      </Alert>
    );
  const { locations } = data;
  const { results, info } = locations;
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Dimension</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((location: LocationOverview) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
              <td>
                <Button
                  variant="outline-success"
                  href={`/locations/${location.id}`}
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
