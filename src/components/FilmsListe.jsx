import React, { useState, useEffect } from "react";
import { Card, Input, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.scss";
import poster from "../images/poster.png";
import Entete from "./Entete";
import Genres from "./FilmGenres";
import axios from "axios";

const FilmsListe = () => {
  const [films, setFilms] = useState([]);
  const [filmRecherche, setFilmRecherche] = useState("Avengers");
  const [genres, setGenres] = useState([]);

  const TOTAL_PAR_PAGE = 10;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=963b7435377e0921bfa89573f3501e4a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
      // axios
      //   .get(
      //     `https://api.themoviedb.org/3/search/movie?api_key=963b7435377e0921bfa89573f3501e4a&query=${filmRecherche}`
      //   )
      .then((res) => {
        setFilms(res.data.results);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=963b7435377e0921bfa89573f3501e4a`
      )
      .then((res) => setGenres(res.data.genres));
  }, [filmRecherche]);

  return (
    <div className="App">
      <Entete />
      <h1>Allocine Clone</h1>
      <Input
        placeholder="Rechercher un film"
        onChange={(e) => setFilmRecherche(e.target.value)}
        style={{ width: "500px", marginRight: "3%" }}
      />
      <Button content="Rechercher" />
      {/* <Genres /> */}

      <Card.Group id="film-container">
        {films.map((film, i) => {
          return (
            <>
              <Card key={i} className="film-card" style={{ maxWidth: "200px" }}>
                <Image
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/original${film.poster_path}`
                      : poster
                  }
                />
                <Card.Content>
                  <Card.Header>{film.title}</Card.Header>
                </Card.Content>
                <Card.Content extra style={{ backgroundColor: "orangered" }}>
                  <Link
                    to="/details"
                    style={{ color: "white", fontWeight: "bold" }}
                    onClick={() => {
                      localStorage.setItem(
                        "filmDetails",
                        JSON.stringify({
                          id: film.id,
                          titre: film.title,
                          dateSortie: film.release_date,
                          description: film.overview,
                          poster: film.poster_path,
                          vote: film.vote_count,
                          genre: film.genre_ids[0],
                        })
                      );
                    }}
                  >
                    Plus de détails
                  </Link>
                </Card.Content>
              </Card>
       
            </>
          );
        })}
      </Card.Group>
    </div>
  );
};

export default FilmsListe;
