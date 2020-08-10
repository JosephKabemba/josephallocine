import React, { useState, useEffect } from "react";
import { Input, Button } from "semantic-ui-react";
import Entete from "./Entete";
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
  const [nbreFilmsParPage] = useState(4);

  const handleBtnRechercherClick = (e) => {
    e.preventDefault();

    const filmsParMotcle = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=963b7435377e0921bfa89573f3501e4a&query=${filmRecherche}`
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
        `https://api.themoviedb.org/3/discover/movie?api_key=963b7435377e0921bfa89573f3501e4a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${codegenre}`
      );

      setFilms(res.data.results);
    };

    filmsParGenre();
  };

  useEffect(() => {
    const rechercheFilms = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=963b7435377e0921bfa89573f3501e4a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      );
      setFilms(res.data.results);
      setLoading(false);
    };

    rechercheFilms();
  }, []);

  // const startIndex = page * TOTAL_PAR_PAGE;

  // let mapage = page;

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
      <Pages
        filmsParPage={nbreFilmsParPage}
        totalFilms={films.length}
        allerVersPage={pageSelectionnee}
      />
      <Films films={filmsPageActive} enChargement={loading} />

      <div></div>
    </div>
  );
};

export default FilmsListe;
