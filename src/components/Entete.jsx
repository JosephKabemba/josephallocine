import React from "react";
import { Header, Segment } from "semantic-ui-react";
import "../App.scss";

const Entete = () => (
  <div className="entete">
    <Segment clearing>
      <Header as="h2" floated="left">
        Allocine Clone
      </Header>
    </Segment>
  </div>
);

export default Entete;
