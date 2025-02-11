import { useParams } from "react-router-dom";
import FilmList from "../components/FilmList";

//TODO hacer si busca una url que no existe
function GenrePage() {
  const { genre } = useParams();
  return (
    <div>
      <FilmList action={["genre", genre]}></FilmList>
    </div>
  );
}

export default GenrePage;
