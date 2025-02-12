import { useContext, useEffect, useState } from "react";
import { FilmContext } from "../context/film.context";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./ListCarousel.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { delDocument } from "../firebase/firestore";
import { Favorite, MoreHoriz } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddToList from "./AddToList";

function ListCarousel(props) {
  const { list } = props;
  const { fetchFilm, changeLiked, changeWatched } = useContext(FilmContext);
  const [films, setFilms] = useState([]);
  const [like, setLike] = useState(false);
  const [watch, setWatch] = useState(false);
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
    if (!seen) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }

  useEffect(() => {
    const fetchFilms = async () => {
      const fetchedFilms = await Promise.all(
        list.films.map((filmId) => fetchFilm(filmId))
      );
      setFilms(fetchedFilms);
    };

    fetchFilms();
  }, [list.films, fetchFilm]);

  const handleLikeChange = async (filmId) => {
    await changeLiked(filmId, like);
    setLike(!like);
  };

  const handleWatchChange = async (filmId) => {
    await changeWatched(filmId, watch);
    setWatch(!watch);
  };

  const deleteFilm = async (filmId) => {
    try {
      await delDocument("films", filmId);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const card = films.map((film) => (
    <SwiperSlide key={film.id}>
      <div className="film-container">
        <Link to={`/film/${film.id}`} className="film-link">
          <img src={film.poster} alt={film.name} className="film-card" />
        </Link>
        </div>
      
    </SwiperSlide>
  ));

  return (
    <>
      <h3>{list.name}</h3>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {card}
      </Swiper>
    </>
  );
}

export default ListCarousel;
