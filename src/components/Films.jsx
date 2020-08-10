import React from "react";
import { Card, Image } from "semantic-ui-react";
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
        {/* <IndicateurDeChargement /> */}
      </Card.Group>
    </div>
  );
};

export default Films;
// import React from "react";
// import { Card, Icon, Image } from "semantic-ui-react";
// import { Link } from "react-router-dom";
// import "../App.css";

// const Film = ({ titre, poster, description, dateSortie }) => (
//   <Card className="film-card" style={{ maxWidth: "200px" }}>
//     <Image src={poster} />
//     <Card.Content>
//       <Card.Header>{titre}</Card.Header>
//       <Card.Meta>
//         <span className="date">{dateSortie}</span>
//       </Card.Meta>
//       <Card.Description>{description}</Card.Description>
//     </Card.Content>
//     <Card.Content extra style={{ backgroundColor: "orangered" }}>
//       <Link to="/details" style={{ color: "white", fontWeight: "bold" }}>
//         Plus de détails
//       </Link>
//     </Card.Content>
//   </Card>
// );

// export default Film;
