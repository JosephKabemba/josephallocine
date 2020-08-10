import React, { useState, useEffect } from "react";
import { Card, Input, Button, Image, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Entete from "./Entete";
import IndicateurDeChargement from "./IndicateurDeChargement";
import { trackPromise } from "react-promise-tracker";
import "../App.scss";
import poster from "../images/poster.png";
// import times from "lodash.times";
import axios from "axios";

const FilmsListe = () => {
  const [films, setFilms] = useState([]);
  const [filmRecherche, setFilmRecherche] = useState("Avengers");
  const [genre, setGenre] = useState("");
  // const [page, setPage] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  // const TOTAL_PAR_PAGE = 4;
  const [loading, setLoading] = useState(false);
  const [pageCourante, modifierPageCourante] = useState(1);
  const [nbreFilmsParPage, modifierNbreFilmsParPage] = useState(4);

  const handleBtnRechercherClick = (e) => {
    e.preventDefault();
    trackPromise(
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=963b7435377e0921bfa89573f3501e4a&query=${filmRecherche}`
        )
        .then((res) => {
          setFilms(res.data.results);
          // setTotalPages(Math.ceil(res.data.length / TOTAL_PAR_PAGE));
        })
        .catch((err) => console.log(err))
    );
  };

  const handleChangementInput = (e) => {
    setFilmRecherche(e.target.value);
  };

  const selectionGenre = (codegenre) => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=963b7435377e0921bfa89573f3501e4a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${codegenre}`
      )
      .then((res) => {
        setFilms(res.data.results);
        // setTotalPages(Math.ceil(res.data.length / TOTAL_PAR_PAGE));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=963b7435377e0921bfa89573f3501e4a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
      .then((res) => {
        setFilms(res.data.results);
        // setTotalPages(Math.ceil(res.data.length / TOTAL_PAR_PAGE));
      })
      .catch((err) => console.log(err));
  }, []);

  // const startIndex = page * TOTAL_PAR_PAGE;

  // let mapage = page;

  return (
    <div className="App">
      <Entete />
      <h1>{genre}</h1>

      <form>
        <Input
          placeholder="Rechercher un film"
          onChange={handleChangementInput}
          id="zoneDeRecherche"
        />
        <Button content="Rechercher" onClick={handleBtnRechercherClick} />
      </form>

      <Button.Group style={{ marginTop: "20px" }}>
        <Button
          color="facebook"
          onClick={() => {
            setGenre("Action");
            selectionGenre(28);
          }}
        >
          Action
        </Button>
        <Button.Or text="" />
        <Button
          onClick={() => {
            setGenre("Animation");
            selectionGenre(16);
          }}
        >
          Animation
        </Button>
        <Button.Or text="" />
        <Button
          color="google plus"
          onClick={() => {
            setGenre("Drame");
            selectionGenre(18);
          }}
        >
          Drame
        </Button>
        <Button.Or text="" />
        <Button
          onClick={() => {
            setGenre("Comédie");
            selectionGenre(35);
          }}
        >
          Comédie
        </Button>
        <Button.Or text="" />
        <Button
          color="facebook"
          onClick={() => {
            setGenre("Histoire");
            selectionGenre(36);
          }}
        >
          Histoire
        </Button>
      </Button.Group>
      <Card.Group id="film-container">
        {films /*.slice(startIndex, startIndex + TOTAL_PAR_PAGE)*/
          .map((film, i) => {
            return (
              <>
                <Card key={i} className="film-card">
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
        <IndicateurDeChargement />
      </Card.Group>
      <div>
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
      </div>
    </div>
  );
};

export default FilmsListe;
