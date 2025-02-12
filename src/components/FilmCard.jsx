import { useContext } from "react";
import "./FilmCard.css";
import { useState } from "react";
import { delDocument } from "../firebase/firestore";
import { Link } from "react-router-dom";
import { Favorite, MoreHoriz } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddToList from "./AddToList";
import { FilmContext } from "../context/film.context";

function FilmCard(props) {
  const { changeLiked, changeWatched } = useContext(FilmContext);
  const { film } = props;

  const [like, setLike] = useState(film.liked);
  const [watch, setWatch] = useState(film.watched);

  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
    if (!seen) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }

  const handleLikeChange = async () => {
    await changeLiked(film.id, like);
    setLike(!like);
  };

  const handleWatchChange = async () => {
    await changeWatched(film.id, watch);
    setWatch(!watch);
  };

  const deleteFilm = async () => {
    try {
      await delDocument("films", film.id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return film.id ? (
    <div className="film-container">
      <Link to={`/film/${film.id}`} className="film-link">
        <img src={film.poster} alt={film.name} className="film-poster" />
      </Link>
      <div className="film-menu">
        <button onClick={handleWatchChange} className={watch ? "watched" : ""}>
          <VisibilityIcon />
        </button>
        <button onClick={handleLikeChange} className={like ? "liked" : ""}>
          <Favorite />
        </button>
        <div className="more-tooltip">
          <button>
            <MoreHoriz />
          </button>
          <div className="tooltip-content">
            <ul className="tooltip-list">
              <li onClick={togglePop}>Add to list</li>
              <li>Edit</li>
              <li onClick={deleteFilm}>Delete</li>
            </ul>
          </div>
        </div>
      </div>
      {seen ? <AddToList film={film} toggle={togglePop}></AddToList> : null}
    </div>
  ) : (
    <p className="loading">Loading...</p>
  );
}

export default FilmCard;
