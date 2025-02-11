import { useState } from "react";
import FilmList from "../components/FilmList";
import GetForm from "../components/GetForm";
import "./FilmsPage.css";

function FilmsPage() {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
    if (!seen) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }

  return (
    <>
      <div className="addFilm-button-container">
        <button className="addFilm-button" onClick={togglePop}>
          Add Film
        </button>
      </div>
      {seen ? <GetForm toggle={togglePop}></GetForm> : null}
      <FilmList action={["all", "All Films"]}></FilmList>
    </>
  );
}

export default FilmsPage;
