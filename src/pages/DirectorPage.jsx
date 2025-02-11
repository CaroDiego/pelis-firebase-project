import { useParams } from "react-router-dom";
import FilmList from "../components/FilmList";

//TODO hacer si busca una url que no existe
function DirectorPage() {
  const { director } = useParams();

  return (
    <div>
      <FilmList action={["director", director]}></FilmList>
    </div>
  );
}

export default DirectorPage;
