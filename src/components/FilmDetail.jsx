import { useContext, useEffect, useRef, useState } from "react";
import "./FilmDetail.css";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { FilmContext } from "../context/film.context";
import AddToList from "./AddToList";

function FilmDetail(props) {
  const { changeLiked, changeWatched } = useContext(FilmContext);

  const { film } = props;

  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);

  const [like, setLike] = useState(false);
  const [watch, setWatch] = useState(false);
  const [seen, setSeen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const synopsisRef = useRef(null);

  useEffect(() => {
    if (film) {
      filmGenres();
      filmDirectors();
      setLike(film.liked);
      setWatch(film.watched);
    }
  }, [film]);

  useEffect(() => {
    if (synopsisRef.current) {
      const element = synopsisRef.current;
      const needsExpand = element.scrollHeight > element.clientHeight;
      setShowExpandButton(needsExpand);
    }
  }, [film?.overview]);

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

  function togglePop() {
    setSeen(!seen);
    if (!seen) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }

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
      <div className="film-content">
        <div className="film-info-actions">
          <div className="film-info">
            <span className="film-title-year">
              <h1 className="film-title">{film?.name}</h1>
              <h2 className="film-year">{film?.year}</h2>
            </span>
            <div className="film-directors">
              {directors.map((director) => (
                <span className="film-director" key={director}>
                  {director}
                </span>
              ))}
            </div>
            <div className="film-genres">
              {genres.map((genre) => (
                <span className="film-genre" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="film-actions">
            <span className="film-actions-icons">
              <button
                onClick={handleWatchChange}
                className={watch ? "watched" : ""}
              >
                <VisibilityIcon />
              </button>
              <button
                onClick={handleLikeChange}
                className={like ? "liked" : ""}
              >
                <Favorite />
              </button>
            </span>

            <button className="add-to-list-btn" onClick={togglePop}>
              ➕ Añadir a lista
            </button>
          </div>
        </div>

        {/* Sinopsis debajo de la información y acciones */}
        <div className="film-synopsis">
          <h3>{film?.tagLine}</h3>
          <p ref={synopsisRef} className={isExpanded ? "expanded" : ""}>
            {" "}
            {film?.overview}{" "}
          </p>
          {showExpandButton && (
            <button
              className="expand-button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              
            </button>
          )}
        </div>
      </div>

      {seen ? <AddToList film={film} toggle={togglePop}></AddToList> : null}
    </div>
  );
}

export default FilmDetail;
