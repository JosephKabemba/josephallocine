import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FilmsListe from "./components/FilmsListe";
import FilmDetails from "./components/FilmDetails";

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={FilmsListe} />
        <Route path="/details" component={FilmDetails} />
      </Router>
    </>
  );
};

export default App;
