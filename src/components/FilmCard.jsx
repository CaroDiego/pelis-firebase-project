import React from "react";
import "./FilmCard.css";
function FilmCard(props) {
  const { film } = props;

  return film.id ? (
    <ul className="film-card">
      <h2 className="film-name">{film.name}</h2>
      <img src={film.poster} alt={film.name} className="film-poster" />
      <h3 className="film-director">{film.director}</h3>
      <h3 className="film-year">{film.year}</h3>
    </ul>
  ) : (
    <p className="loading">Loading...</p>
  );
}

export default FilmCard;
