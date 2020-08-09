import React, { useState, useEffect } from "react";
import { Card, Input, Button, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Film from "./Film";
import times from "lodash.times";
import "../App.css";
import poster from "../images/poster.png";
import axios from "axios";

const FilmsListe = () => {
  const [films, setFilms] = useState([]);
  const [filmRecherche, setFilmRecherche] = useState("Anne");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const TOTAL_PAR_PAGE = 10;
  const handDetailsButton = (film) => {
    sessionStorage.setItem(
      "filmDetail",
      JSON.stringify({
        id: film.id,
        titre: film.title,
      })
    );
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=963b7435377e0921bfa89573f3501e4a&query=${filmRecherche}`
      )
      .then((res) => {
        setFilms(res.data.results);
        setTotalPages(Math.ceil(res.data.length / TOTAL_PAR_PAGE));
      })
      .catch((err) => console.log(err));
  }, [filmRecherche]);

  const startIndex = page * TOTAL_PAR_PAGE;

  let mapage = page;
  return (
    <div className="App">
      <h1>Allocine Clone</h1>
      <Input
        placeholder="Rechercher un film"
        onChange={(e) => setFilmRecherche(e.target.value)}
      />
      <Button content="Rechercher" />
      {/* <h2>{filmRecherche}</h2> */}
      {/* <Menu pagination>
        {page !== 0 && (
          <Menu.Item as="a" icon onClick={() => setPage(--mapage)}>
            <Icon name="left chevron" />
          </Menu.Item>
        )}
        {times(totalPages, (n) => (
          <Menu.Item
            as="a"
            key={n}
            active={n === page}
            onClick={() => setPage(n)}
          >
            {n + 1}
          </Menu.Item>
        ))}
        {page !== totalPages - 1 && (
          <Menu.Item as="a" icon onClick={() => setPage(++mapage)}>
            <Icon name="right chevron" />
          </Menu.Item>
        )}
      </Menu> */}
      <Card.Group id="film-container">
        {films./*slice(startIndex, startIndex + TOTAL_PAR_PAGE).*/ map(
          (film, i) => {
            return (
              <>
                <Film
                  key={i}
                  titre={film.title}
                  poster={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/original${film.poster_path}`
                      : poster
                  }
                  description={film.overview.slice(0, 15).concat("...")}
                  dateSortie={film.release_date}
                  onClick={handDetailsButton}
                />
              </>
            );
          }
        )}
      </Card.Group>
    </div>
  );
};

export default FilmsListe;
