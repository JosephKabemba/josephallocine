import React from "react";
import { Button } from "semantic-ui-react";
import "../App.scss";

const Pages = ({ filmsParPage, totalFilms, allerVersPage }) => {
  const nbrePages = [];

  for (let i = 1; i <= Math.ceil(totalFilms / filmsParPage); i++) {
    nbrePages.push(i);
  }
  return (
    <nav className="pagination">
      <Button.Group>
        {nbrePages.map((nombre) => (
          <Button key={nombre} onClick={() => allerVersPage(nombre)}>
            {nombre}
          </Button>
        ))}
      </Button.Group>
    </nav>
  );
};
export default Pages;
