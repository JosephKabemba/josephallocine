import React, { useState, useEffect } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { cleApi } from "./config.js";
import Entete from "./Entete";
import PiedDePage from "./PiedDePage";
import Films from "./Films";
import Pages from "./pages";
import "../App.scss";
import axios from "axios";

const FilmsListe = () => {
  const [films, setFilms] = useState([]);
  const [filmRecherche, setFilmRecherche] = useState("Avengers");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageCourante, modifierPageCourante] = useState(1);
  const [nbreFilmsParPage] = useState(12);

  const handleBtnRechercherClick = (e) => {
    e.preventDefault();

    const filmsParMotcle = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${cleApi}&query=${filmRecherche}`
      );
      setFilms(res.data.results);
    };

    filmsParMotcle();
  };

  const handleChangementInput = (e) => {
    setFilmRecherche(e.target.value);
  };

  const selectionGenre = (codegenre) => {
    const filmsParGenre = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${cleApi}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${codegenre}`
      );

      setFilms(res.data.results);
    };

    filmsParGenre();
  };

  useEffect(() => {
    const rechercheFilms = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${cleApi}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageCourante}`
      );
      setFilms(res.data.results);
      console.log(cleApi);
      setLoading(false);
    };

    rechercheFilms();
  }, [pageCourante]);

  const indiceDernierFilm = pageCourante * nbreFilmsParPage;
  const indicePremierFilm = indiceDernierFilm - nbreFilmsParPage;
  const filmsPageActive = films.slice(indicePremierFilm, indiceDernierFilm);

  const pageSelectionnee = (numPage) => modifierPageCourante(numPage);

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
        <Button onClick={handleBtnRechercherClick}>
          <Icon name="search" />
        </Button>
      </form>

      <Button.Group className="listebtnGenres">
        <Button.Or text="" />
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
          className="hide"
        >
          Comédie
        </Button>
        <Button.Or text="" className="hide" />
        <Button
          color="facebook"
          onClick={() => {
            setGenre("Histoire");
            selectionGenre(36);
          }}
          className="hide"
        >
          Histoire
        </Button>
        <Button.Or text="" />
      </Button.Group>

      <Films films={filmsPageActive} enChargement={loading} /><PiedDePage/>
      <Pages
        filmsParPage={nbreFilmsParPage}
        totalFilms={films.length}
        allerVersPage={pageSelectionnee}
      />
      
    </div>
  );
};

export default FilmsListe;
