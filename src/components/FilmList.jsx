import { useEffect, useContext, useState } from "react";
import FilmCard from "./FilmCard";
import "./FilmList.css";
import { FilmContext } from "../context/film.context";

function FilmList(props) {
  const { action } = props;
  const {
    films,
    getFilms,
    searchFilmsByDirector,
    searchFilmsByGenre,
    searchFilmsByWatched,
    searchFilmsByLiked,
  } = useContext(FilmContext);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchFilms = async () => {
      switch (action[0]) {
        case "director": {
          const standardizedDirector = action[1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          await searchFilmsByDirector(standardizedDirector);
          setTitle(standardizedDirector);
          break;
        }
        case "genre": {
          const standarizedGenre = action[1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          await searchFilmsByGenre(standarizedGenre);
          setTitle(standarizedGenre);
          break;
        }
        case "all":
          await getFilms();
          setTitle(action[1]);
          break;
        case "watched":
          await searchFilmsByWatched();
          setTitle(action[1]);
          break;
        case "liked":
          await searchFilmsByLiked();
          setTitle(action[1]);
          break;
      }
      setLoading(false);
    };

    fetchFilms();
  }, [action, getFilms, searchFilmsByDirector]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  const filmCards = films.map((film) => {
    return <FilmCard key={film.id} film={film}></FilmCard>;
  });

  return (
    <div>
      <h3>{title}</h3>
      <ul className="films-list">{filmCards}</ul>
    </div>
  );
}

export default FilmList;
