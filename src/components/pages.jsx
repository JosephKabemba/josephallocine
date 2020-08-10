import React from "react";
import { Button } from "semantic-ui-react";

const Pages = ({ filmsParPage, totalFilms }) => {
  const nbrePages = [];

  for (let i = 1; i < Math.ceil(totalFilms / filmsParPage); ++i) {
    nbrePages.push(i);
  }
  return (
    <nav>
      <Button.Group>
        {nbrePages.map((nombre) => {
          return (
            <>
              <Button>{nombre}</Button>

              {/* <li key={nombre} className="page-item">
                <a href="!#" className="page-link">
                  {nombre}
                </a>
              </li> */}
            </>
          );
        })}
      </Button.Group>
    </nav>
  );
};
export default Pages;
