import React from "react";
import "./FilmCard.css";
import { useState, useEffect } from "react";
import { delDocument, updateDocument } from "../firebase/firestore";

function FilmCard(props) {
  const { film } = props;

  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const deleteFilm = async (e) => {
    try {
      await delDocument("films", film);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const updateFilm = async (e) => {
    try {
      await updateDocument("films", film);
    } catch (error) {
      console.error("Error updating document:", e);
    }
  };

  const filmGenres = () => {
    if (Array.isArray(film.genre)) {
      setGenre(film.genre.join(", "));
    } else {
      setGenre(film.genre);
    }
  };
  const filmDirectors = () => {
    if (Array.isArray(film.director)) {
      setDirector(film.director.join(", "));
    } else {
      setDirector(film.director);
    }
  };

  useEffect(() => {
    if (film) {
      filmGenres();
      filmDirectors();
    }
  }, [film]);

  return film.id ? (
    <ul className="film-card">
      <h2 className="film-name">{film.name}</h2>
      <img src={film.poster} alt={film.name} className="film-poster" />
      <h3 className="film-director">{director}</h3>
      <h3 className="film-genre">{genre}</h3>
      <h3 className="film-year">{film.year}</h3>
      <button className="edit-button" onClick={updateFilm}>
        Edit
      </button>
      <span> </span>
      <button className="delete-button" onClick={deleteFilm}>
        Delete
      </button>
    </ul>
  ) : (
    <p className="loading">Loading...</p>
  );
}

export default FilmCard;
