import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import poster from "../images/poster.png";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

const Films = ({ films, enChargement }) => {
  if (enChargement)
    return (
      <h2>
        <Loader type="ThreeDots" color="tomato" height="100" width="100" />
      </h2>
    );
  return (
    <div>
      <Card.Group id="film-container">
        {films.map((film, i) => {
          return (
            <>
              <Card key={i} className="film-card">
                <Image
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/original${film.poster_path}`
                      : poster
                  }
                  className="image"
                />
                <Card.Content className="milieu">
                  <Link
                    to="/details"
                    className="btnDetails"
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
                    <Button
                      content="Détails"
                      className="text"
                      color="instagram"
                      // style={{ width: "100px" }}
                    />
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

export default Films;
