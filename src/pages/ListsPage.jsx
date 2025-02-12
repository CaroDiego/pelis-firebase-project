import { useContext, useEffect } from "react";
import { ListContext } from "../context/list.context";
import ListCarousel from "../components/ListCarousel";

function ListsPage() {
  const { lists, getLists } = useContext(ListContext);

  useEffect(() => {
    getLists();
  }, [lists, getLists]);

  const listCarrousel = lists.map((list) => (
    <ListCarousel key={list.id} list={list} />
  ));

  return (
    <div>
      <h3>Listas</h3>
      <ul>{listCarrousel}</ul>
    </div>
  );
}

export default ListsPage;
