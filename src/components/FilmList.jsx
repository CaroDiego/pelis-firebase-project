import React from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase.js";
import { useState, useEffect } from "react";
import FilmCard from "./FilmCard";

function FilmList() {
  const [films, setFilms] = useState([]);

  // TODO hacerlo como el viewModel
  useEffect(() => {
    const filmsArr = [];
    const filmsColl = collection(db, "films");
    getDocs(filmsColl).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        filmsArr.push({ id: doc.id, ...doc.data() });
      });
      setFilms(filmsArr);
    });
  }, []);

  const filmCards = films.map((film) => {
    return <FilmCard key={film.id} film={film}></FilmCard>;
  });
  return (
    <div>
      <h1>Films</h1>
      <ul className="films-list">{filmCards}</ul>
    </div>
  );
}

export default FilmList;
