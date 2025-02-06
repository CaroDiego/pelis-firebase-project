import { useContext, useEffect, useState } from "react";
import "./FilmDetail.css";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { FilmContext } from "../context/film.context";

function FilmDetail(props) {
  const { changeLiked, changeWatched } = useContext(FilmContext);

  const { film } = props;

  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);

  const [like, setLike] = useState(false);
  const [watch, setWatch] = useState(false);

  useEffect(() => {
    if (film) {
      filmGenres();
      filmDirectors();
      setLike(film.liked);
      setWatch(film.watched);
    }
  }, [film]);

  const filmGenres = () => {
    if (film && Array.isArray(film.genre)) {
      setGenres(film.genre);
    } else if (film && film.genre) {
      setGenres([film.genre]);
    } else {
      setGenres([]);
    }
  };

  const filmDirectors = () => {
    if (film && Array.isArray(film.director)) {
      setDirectors(film.director);
    } else if (film && film.director) {
      setDirectors([film.director]);
    } else {
      setDirectors([]);
    }
  };

  const handleLikeChange = async () => {
    console.log(film.id, like);
    await changeLiked(film.id, like);
    setLike(!like);
  };

  const handleWatchChange = async () => {
    await changeWatched(film.id, watch);
    setWatch(!watch);
  };

  if (!film) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="film-details">
      {/* Imagen a la izquierda */}
      <img
        src={
          film?.poster || "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={film?.name}
        className="film-detail-poster"
      />

      {/* Información en el centro */}
      <div className="film-info">
        <h1 className="film-title">{film?.name}</h1>
        <h2 className="film-year">{film?.year}</h2>
        <div className="film-genres">
          {genres.map((genre) => (
            <span className="film-genre" key={genre}>
              {genre}
            </span>
          ))}
        </div>
        <div className="film-directors">
          {directors.map((director) => (
            <span className="film-director" key={director}>
              {director}
            </span>
          ))}
        </div>
      </div>

      {/* Estado y botón a la derecha */}
      <div className="film-actions">
        <button onClick={handleWatchChange} className={watch ? "watched" : ""}>
          <VisibilityIcon />
        </button>
        <button onClick={handleLikeChange} className={like ? "liked" : ""}>
          <Favorite />
        </button>
        <span className="film-watched">
          {film?.watched ? "✅ Vista" : "❌ No vista"}
        </span>
        <span className="film-liked">
          {film?.liked ? "❤️ Me gustó" : "💔 No me gustó"}
        </span>
        <button className="add-to-list-btn">➕ Añadir a lista</button>
      </div>
    </div>
  );
}

export default FilmDetail;
