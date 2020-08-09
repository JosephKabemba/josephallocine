import React from "react";
import { Button, Image } from "semantic-ui-react";
import poster from "../images/poster.png";
import "../App.scss";

const FilmDetails = () => {
  const detail = JSON.parse(localStorage.getItem("filmDetails"));

  return (
    <div
      id="detailFilm"
      style={{
        backgroundImage: `url("${
          detail.poster
            ? `https://image.tmdb.org/t/p/original${detail.poster}`
            : poster
        }")`,
      }}
    >
      <Image
        src={
          detail.poster
            ? `https://image.tmdb.org/t/p/original${detail.poster}`
            : poster
        }
        size="medium"
        id="poster"
        rounded
      />
      <div className="details">
        <h2>{detail.titre}</h2>
        <p>
          <strong>{new Date(detail.dateSortie).getFullYear()}</strong>
        </p>
        <p>
          <strong>{detail.genre}</strong>
        </p>
        <p>
          <Button
            color="red"
            // content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: `${detail.vote}`,
            }}
          />
        </p>
        <p>{detail.description}</p>
        <p>
          <Button id="btnRetour" color="rgba(2, 54, 75, 0.9)">
            Retour
          </Button>
        </p>
      </div>
    </div>
  );
};

export default FilmDetails;
