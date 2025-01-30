import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocument } from "../firebase/firestore";

function FilmPage() {

    const { id } = useParams();
    const [film, setFilm] = useState();
    const [error, serError] = useState();

    useEffect(() => {
      getFilm(id);
    }, [id]);

    const getFilm = async (id) => {
      try {
        const film = await getDocument("films", id);
        setFilm(film.data());
      } catch (error) {
        serError(error);
      }
    };
  return (
    <section id="film-page">
      {error ? (
        <div>ERROR!!!</div>
      ) : (
        <div>
          <h1>{film?.name}</h1>
          <img src={film?.poster} alt={film?.name} />
          <h2>{film?.year}</h2>
          <h3>{film?.genre}</h3>
          <h3>{film?.director}</h3>
        </div>
      )
    }

    </section>
  )
}

export default FilmPage