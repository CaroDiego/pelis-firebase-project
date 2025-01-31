import React from "react";
import { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
import "./FilmList.css";
import { getAllDocuments } from "../firebase/firestore";

function FilmList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmsArr = await getAllDocuments("films");
        setFilms(filmsArr);
      } catch (e) {
        console.error("Error fetching films:", e);
      }
    };
    fetchFilms();
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
