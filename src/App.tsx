import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterList } from "./CharacterList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CharacterDetail } from "./CharacterDetail";
import { EpisodeList } from "./EpisodeList";
import { EpisodeDetail } from "./EpisodeDetail";
import { LocationDetail } from "./LocationDetail";
import { LocationList } from "./LocationList";

export const App = () => {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="/characters">Brand</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/characters">Characters</Nav.Link>
            <Nav.Link href="/episodes">Episodes</Nav.Link>
            <Nav.Link href="/locations">Locations</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/characters" element={<CharacterList />} />
              <Route
                path="/characters/:characterId"
                element={<CharacterDetail />}
              />
              <Route path="/episodes" element={<EpisodeList />} />
              <Route path="/episodes/:episodeId" element={<EpisodeDetail />} />
              <Route path="/locations" element={<LocationList />} />
              <Route
                path="/locations/:locationId"
                element={<LocationDetail />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
