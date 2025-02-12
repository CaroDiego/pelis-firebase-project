import FilmList from "../components/FilmList";

function Watched() {
  return (
    <div>
      <FilmList action={["watched", "Watched"]}></FilmList>
    </div>
  );
}

export default Watched;
