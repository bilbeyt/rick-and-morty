import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { RelationValue } from "./types";
import { GET_EPISODE } from "./constants";

export function EpisodeDetail() {
  const { episodeId } = useParams();
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: {
      id: episodeId,
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
        Episode can not be fetched!
      </Alert>
    );
  const { episode } = data;
  return (
    <Table responsive>
      <tbody>
        {Object.keys(episode).map((fieldName: string) => {
          let value = episode[fieldName];
          if (fieldName.includes("__")) return null;
          if (fieldName === "characters") {
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
