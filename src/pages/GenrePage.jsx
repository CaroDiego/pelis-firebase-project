import React from "react";
import { useParams } from "react-router-dom";
import FilmList from "../components/FilmList";

function GenrePage() {
  const { genre } = useParams();
  return (
    <div>
      <FilmList action={["genre", genre]}></FilmList>
    </div>
  );
}

export default GenrePage;
