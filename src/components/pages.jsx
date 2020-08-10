import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Pages = ({ filmsParPage, totalFilms, allerVersPage }) => {
  const nbrePages = [];

  for (let i = 1; i <= Math.ceil(totalFilms / filmsParPage); ++i) {
    nbrePages.push(i);
  }
  return (
    <nav>
      <Button.Group>
        {nbrePages.map((nombre) => (
          <Button key={nombre}>
            <Link onClick={() => allerVersPage(nombre)} to="#!">
              {nombre}
            </Link>
          </Button>
        ))}
      </Button.Group>
    </nav>
  );
};
export default Pages;
