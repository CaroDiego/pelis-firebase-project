import FilmList from "../components/FilmList";

function Liked() {
  return (
    <div>
      <FilmList action={["liked", "Likes"]}></FilmList>
    </div>
  );
}

export default Liked;
