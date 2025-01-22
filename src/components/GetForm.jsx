import { useState } from "react";
import { addDocument } from "../firebase/firestore";
function GetForm() {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");//TODO array
  const [director, setDirector] = useState(""); //TODO array

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
    // TODO: Concatenate the genres in an array if separate by commas
    setGenre(e.target.value);
  };

  const directorChange = (e) => {
    // TODO: Concatenate the directors in an array if separate by commas

    setDirector(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const film = {
      name: name,
      poster: poster,
      year: year,
      genre: genre,
      director: director,
    };
    try {
      await addDocument("films", film);
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
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="name-film">Film Name: </label>
        <input type="text" id="name-film" value={name} onChange={nameChange} />
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
        <input type="text" id="year-film" value={year} onChange={yearChange} />
      </fieldset>
      <fieldset>
        <label htmlFor="genre-film">Genre: </label>
        <input
          type="text"
          id="genre-film"
          value={genre}
          onChange={genreChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="director-film">Director: </label>
        <input
          type="text"
          id="director-film"
          value={director}
          onChange={directorChange}
        />
      </fieldset>
      {fieldsComplete && <button>Submit</button>}
    </form>
  );
}

export default GetForm;
