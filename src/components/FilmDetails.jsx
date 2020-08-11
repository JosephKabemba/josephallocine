import React from "react";
import { Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import poster from "../images/poster.png";
import "../App.scss";

const FilmDetails = () => {
  const detail = JSON.parse(localStorage.getItem("filmDetails"));

  return (
    <>
      <div
        id="detail-container"
        style={{
          backgroundImage: `url("${
            detail.poster
              ? `https://image.tmdb.org/t/p/original${detail.poster}`
              : poster
          }")`,
        }}
      >
        <div id="autre-details">
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
            <h2 className="hide">{detail.titre}</h2>
            <p>
              <strong className="annee">
                {new Date(detail.dateSortie).getFullYear()}
              </strong>
            </p>
            <p>
              <strong className="hide">{detail.genre}</strong>
            </p>
            <p>
              <Button
                color="red"
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
              <Link to="/">
                <Button id="btnRetour" color="rgba(2, 54, 75, 0.9)">
                  Retour
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmDetails;
