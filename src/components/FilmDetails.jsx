import React from "react";

const FilmDetails = () => {
  const detail = JSON.parse(sessionStorage.getItem("filmDetail"));

  return <div>{detail.titre}</div>;
};

export default FilmDetails;
