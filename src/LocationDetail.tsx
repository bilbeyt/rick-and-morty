import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { RelationValue } from "./types";
import { GET_LOCATION } from "./constants";

export function LocationDetail() {
  const { locationId } = useParams();
  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: {
      id: locationId,
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
        Location can not be fetched!
      </Alert>
    );
  const { location } = data;
  return (
    <Table responsive>
      <tbody>
        {Object.keys(location).map((fieldName: string) => {
          let value = location[fieldName];
          if (fieldName.includes("_")) return null;
          if (fieldName === "residents") {
            const items = value.map(
              (subValue: RelationValue, index: number) => (
                <li key={`character-${index}`}>
                  <a href={`/characters/${subValue.id}`}>{subValue.name}</a>
                </li>
              )
            );
            value = <ul>{items}</ul>;
          }
          return (
            <tr key={fieldName}>
              <th>{fieldName}</th>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
