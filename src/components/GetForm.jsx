import { useState } from "react";
import { setDocument } from "../firebase/firestore";
import "./GetForm.css";
function GetForm() {
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
    };
    try {
      await setDocument("films", id, film);
      //*Do Something
      setName("");
      setPoster("");
      setYear("");
      setGenre("");
      setDirector("");
    } catch (error) {
      console.error("Error adding document:", e);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name-film">Film Name: </label>
          <input
            type="text"
            id="name-film"
            value={name}
            onChange={nameChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="poster-film">Poster: </label>
          <input
            type="text"
            id="poster-film"
            value={poster}
            onChange={posterChange}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="year-film">Year: </label>
          <input
            type="text"
            id="year-film"
            value={year}
            onChange={yearChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="genre-film">Genre: </label>
          <input
            type="text"
            placeholder="Separate by commas"
            id="genre-film"
            value={genre}
            onChange={genreChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="director-film">Director: </label>
          <input
            type="text"
            placeholder="Separate by commas"
            id="director-film"
            value={director}
            onChange={directorChange}
          />
        </fieldset>
        <button
          className="add-film-button"
          type="submit"
          disabled={!fieldsComplete}
        >
          <span className="add-film-button___text">Add Film</span>
          <span className="add-film-button___icon">
            <svg
              className="svg"
              fill="none"
              height={24}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}

export default GetForm;
