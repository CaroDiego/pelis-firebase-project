import { createContext, useState } from "react";
import {
  getAllDocuments,
  setDocument,
  updateDocument,
} from "../firebase/firestore";

const FilmContext = createContext();

function FilmProviderWrapper(props) {
  const [films, setFilms] = useState([]); // Array of films

  /**
   * Adds a new film to the collection.
   *
   * @param {string} id - The unique identifier for the film.
   * @param {Object} newFilm - The film data to be added.
   * @returns {Promise<void>} A promise that resolves when the film is added.
   * @throws Will throw an error if there is an issue adding the film.
   */
  const addFilm = async (id, newFilm) => {
    try {
      await setDocument("films", id, newFilm);
    } catch (e) {
      console.error("Error adding film:", e);
    }
  };

  /**
   * Fetches all film documents from the "films" collection and updates the state with the retrieved films.
   *
   * @async
   * @function getFilms
   * @returns {Promise<void>} A promise that resolves when the films have been fetched and the state has been updated.
   * @throws Will log an error message to the console if fetching films fails.
   */
  const getFilms = async () => {
    try {
      const filmArr = await getAllDocuments("films");
      setFilms(filmArr);
    } catch (e) {
      console.error("Error fetching films:", e);
    }
  };

  /**
   * Manage the 'liked' status of a film and updates the state and database.
   *
   * @param {string} id - The ID of the film to update.
   * @param {boolean} currentLike - The current 'liked' status of the film.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   * @throws {Error} - If there is an error updating the document.
   */
  const changeLiked = async (id, currentLike) => {
    try {
      const newLike = !currentLike;
      await updateDocument("films", id, { liked: newLike });
      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film.id === id ? { ...film, liked: newLike } : film
        )
      );
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  /**
   * Toggles the watched status of a film and updates the state and database.
   *
   * @param {string} id - The ID of the film to update.
   * @param {boolean} currentWatched - The current watched status of the film.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   * @throws {Error} - Throws an error if the document update fails.
   */
  const changeWatched = async (id, currentWatched) => {
    try {
      const newWatched = !currentWatched;
      await updateDocument("films", id, { watched: newWatched });
      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film.id === id ? { ...film, watched: newWatched } : film
        )
      );
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <FilmContext.Provider
      value={{ films, addFilm, getFilms, changeLiked, changeWatched }}
    >
      {props.children}
    </FilmContext.Provider>
  );
}

export { FilmContext, FilmProviderWrapper };
