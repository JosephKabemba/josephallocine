import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.css";

const Film = ({ titre, poster, description, dateSortie }) => (
  <Card className="film-card" style={{ maxWidth: "200px" }}>
    <Image src={poster} />
    <Card.Content>
      <Card.Header>{titre}</Card.Header>
      <Card.Meta>
        <span className="date">{dateSortie}</span>
      </Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra style={{ backgroundColor: "orangered" }}>
      <Link to="/details" style={{ color: "white", fontWeight: "bold" }}>
        Plus de détails
      </Link>
    </Card.Content>
  </Card>
);

export default Film;