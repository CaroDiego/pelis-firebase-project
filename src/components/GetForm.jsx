import { useContext, useEffect, useState } from "react";
import { setDocument } from "../firebase/firestore";
import "./GetForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { FilmContext } from "../context/film.context";

function GetForm(props) {
  const { addFilm } = useContext(FilmContext);
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");

  const fieldsComplete = name && poster && year && genre && director;

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const posterChange = (e) => {
    setPoster(e.target.value);
  };

  const yearChange = (e) => {
    setYear(e.target.value);
  };

  const genreChange = (e) => {
    setGenre(e.target.value);
  };

  const directorChange = (e) => {
    setDirector(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + year;
    const film = {
      name: name,
      poster: poster,
      year: year,
      genre: genre.split(",").map((genre) => genre.trim()),
      director: director.split(",").map((director) => director.trim()),
      liked: false,
      watched: false,
    };
    try {
      addFilm(id, film);
      setName("");
      setPoster("");
      setYear("");
      setGenre("");
      setDirector("");
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        props.toggle();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props]);
  return (
    <div className="popup-overlay">
      <div className="form-container">
        <button className="close-button" onClick={props.toggle}>
          <CloseIcon />
        </button>
        <p className="title">Add Film</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="name-film">Film Name</label>
            <input
              type="text"
              id="name-film"
              value={name}
              onChange={nameChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="poster-film">Poster</label>
            <input
              type="url"
              id="poster-film"
              value={poster}
              onChange={posterChange}
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="year-film">Year</label>
            <input
              type="number"
              id="year-film"
              value={year}
              onChange={yearChange}
              min="1800"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="input-group">
            <label htmlFor="genre-film">Genre</label>
            <input
              type="text"
              placeholder="Separate by commas"
              id="genre-film"
              value={genre}
              onChange={genreChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="director-film">Director</label>
            <input
              type="text"
              placeholder="Separate by commas"
              id="director-film"
              value={director}
              onChange={directorChange}
            />
          </div>
          <button
            className="submit-film"
            type="submit"
            disabled={!fieldsComplete}
          >
            Add Film
          </button>
        </form>
      </div>
    </div>
  );
}
export default GetForm;
