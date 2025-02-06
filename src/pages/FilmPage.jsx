import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FilmContext } from "../context/film.context";
import "./FilmPage.css";
import FilmDetail from "../components/FilmDetail";

function FilmPage() {
  const { fetchFilm, films, getFilms } = useContext(FilmContext);
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFilm(id);
  }, [id]);

  const getFilm = async (id) => {
    try {
      const film = await fetchFilm(id);
      if (!film) {
        throw new Error("Film  not found");
      }
      setFilm(film);
    } catch (error) {
      setError(error);
      console.error("Error fetching film:", error);
    }
  };

  return (
    <section id="film-page">
      {error ? (
        <div className="error-container">
          <img
            src="https://media1.tenor.com/m/h1jmVbHLV6QAAAAC/vincent.gif"
            alt="Error gif"
            className="error-image"
          />
          <h2 className="error-message">{error.message}</h2>
          <Link to="/" className="back-link">
            Volver a la lista
          </Link>
        </div>
      ) : (
        <FilmDetail film={film}></FilmDetail>
      )}
    </section>
  );
}

export default FilmPage;
