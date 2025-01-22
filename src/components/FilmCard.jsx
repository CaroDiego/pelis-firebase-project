import React from "react";
import "./FilmCard.css";
import { delDocument, updateDocument } from "../firebase/firestore";
function FilmCard(props) {
  const { film } = props;

  const deleteFilm = async (e) => {
    try {
      await delDocument("films", film);
    } catch (error) {
      console.error("Error deleting document:", e);
    }
  };
  
  const updateFilm = async (e) => {
    try {
      await updateDocument("films", film);
    } catch (error) {
      console.error("Error updating document:", e);
    }
  };
  return film.id ? (
    <ul className="film-card">
      <h2 className="film-name">{film.name}</h2>
      <img src={film.poster} alt={film.name} className="film-poster" />
      <h3 className="film-director">{film.director}</h3>
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
