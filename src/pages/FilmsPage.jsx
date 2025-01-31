import { useState } from "react";
import FilmList from "../components/FilmList";
import GetForm from "../components/GetForm";
import "./FilmsPage.css";

function FilmsPage() {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }

  return (
    <>
      <div className="addFilm-button-container">
        <button className="addFilm-button" onClick={togglePop}>
          Add Film
        </button>
      </div>
      {seen ? <GetForm toggle={togglePop}></GetForm> : null}
      <FilmList></FilmList>
    </>
  );
}

export default FilmsPage;
