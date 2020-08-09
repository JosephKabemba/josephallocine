import React from "react";
import { Header, Segment } from "semantic-ui-react";

const Entete = () => (
  <div className="entete">
    <Segment
      clearing
      style={{
        background: "rgba(2, 54, 75, 0.9)",
        color: "white",
        border: "none",
      }}
    >
      <Header as="h2" floated="left" style={{ color: "white" }}>
        Allocine Clone
      </Header>
    </Segment>
  </div>
);

export default Entete;
