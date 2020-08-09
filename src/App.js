import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "semantic-ui-react";
import "./App.css";
import Film from "./components/Film";
import axios from "axios";

function App() {
  const [films, setFilms] = useState([]);
  const [filmRecherche, setFilmRecherche] = useState("Anne");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=963b7435377e0921bfa89573f3501e4a&query=${filmRecherche}`
      )
      .then((res) => setFilms(res.data.results))
      .catch((err) => console.log(err));
  }, [filmRecherche]);

  // useEffect(() => {});
  return (
    <div className="App">
      <h1>Allocine Clone</h1>
      <Input
        placeholder="Rechercher un film"
        onChange={(e) => setFilmRecherche(e.target.value)}
      />
      <Button content="Rechercher" />
      <h2>{filmRecherche}</h2>
      <Card.Group id="film-container">
        {films.map((film, i) => {
          return (
            <Film
              key={i}
              titre={film.title}
              poster={`https://image.tmdb.org/t/p/original${film.poster_path}`}
              description={film.overview.slice(0, 15).concat("...")}
              dateSortie={film.release_date}
            />
          );
        })}
      </Card.Group>
    </div>
  );
}

export default App;
