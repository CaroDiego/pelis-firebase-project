import React from "react";
import "./FilmCard.css";
import { useState, useEffect } from "react";
import { delDocument, updateDocument } from "../firebase/firestore";
import { Link } from "react-router-dom";
import { Favorite, MoreHoriz } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function FilmCard(props) {
  const { film } = props;

  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");

  const [like, setLike] = useState(film.liked);
  const [watch, setWatch] = useState(film.watched);

  const changeLiked = async () => {
    try {
      const newLike = !like;
      setLike(newLike);
      await updateDocument("films", film.id, { liked: newLike });
    } catch (error) {
      console.error("Error updating document:", error);
      setLike((prev) => !prev);
    }
  };

  const changeWatched = async () => {
    try {
      const newWatch = !watch;
      setWatch(newWatch);
      await updateDocument("films", film.id, { watched: newWatch });
    } catch (error) {
      console.error("Error updating document:", error);
      setWatch((prev) => !prev);
    }
  };

  const deleteFilm = async () => {
    try {
      await delDocument("films", film);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const updateFilm = async () => {
    try {
      await updateDocument("films", film);
    } catch (e) {
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
    <div className="film-container">
      {/* <h2 className="film-name">{film.name}</h2> */}
      <Link to={`/film/${film.id}`} className="film-link">
        <img src={film.poster} alt={film.name} className="film-poster" />
      </Link>
      <div className="film-menu">
        <button onClick={changeWatched} className={watch ? "watched" : ""}>
          <VisibilityIcon />
        </button>
        <button onClick={changeLiked} className={like ? "liked" : ""}>
          <Favorite />
        </button>
        <div className="more-tooltip">
          <button>
            <MoreHoriz />
          </button>
          <div className="tooltip-content">
            <ul className="tooltip-list">
              <li>Hola</li>
              <li>Edit</li>
              <li>Hola</li>
              <li onClick={deleteFilm}>Delete</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <h3 className="film-director">{director}</h3>
      <h3 className="film-genre">{genre}</h3>
      <h3 className="film-year">{film.year}</h3>
      <button className="edit-button" onClick={updateFilm}>
        Edit
      </button>
      <span> </span>
      <button className="delete-button" onClick={deleteFilm}>
        Delete
      </button> */}
    </div>
  ) : (
    <p className="loading">Loading...</p>
  );
}

export default FilmCard;
