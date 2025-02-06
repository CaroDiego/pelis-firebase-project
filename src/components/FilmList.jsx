import { useEffect, useContext } from "react";
import FilmCard from "./FilmCard";
import "./FilmList.css";
import { FilmContext } from "../context/film.context";

function FilmList() {
  const { films, getFilms } = useContext(FilmContext);

  useEffect(() => {
    getFilms();
  });

  const filmCards = films.map((film) => {
    return <FilmCard key={film.id} film={film}></FilmCard>;
  });
  return (
    <div>
      <ul className="films-list">{filmCards}</ul>
    </div>
  );
}

export default FilmList;
