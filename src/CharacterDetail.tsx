import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { RelationValue } from "./types";
import { GET_CHARACTER } from "./constants";

export function CharacterDetail() {
  const { characterId } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: {
      id: characterId,
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
        Character can not be fetched!
      </Alert>
    );
  const { character } = data;
  return (
    <Table responsive>
      <tbody>
        {Object.keys(character).map((fieldName: string) => {
          let value = character[fieldName];
          if (fieldName.includes("_")) return null;
          if (fieldName === "origin" || fieldName === "location") {
            value = <a href={`/locations/${value.id}`}>{value.name}</a>;
          } else if (fieldName === "episode") {
            const items = value.map(
              (subValue: RelationValue, index: number) => (
                <li key={`episode-${index}`}>
                  <a href={`/episodes/${subValue.id}`}>{subValue.name}</a>
                </li>
              )
            );
            value = <ul>{items}</ul>;
          } else if (fieldName === "image") {
            value = <img src={value} alt={value} />;
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
