import { useContext, useEffect, useState } from "react";
import { ListContext } from "../context/list.context";
import CheckIcon from "@mui/icons-material/Check";

function ListOption(props) {
  const { film, list } = props;
  const { selectedLists, setSelectedLists } =
    useContext(ListContext);

  const [filmInList, setFilmInList] = useState(false); // If the film is in the list

  useEffect(() => {
    setFilmInList(list.films.includes(film.id));
  }, [list, film]);

  const selectList = () => {
    if (selectedLists.includes(list.id)) {
      setSelectedLists(selectedLists.filter((id) => id !== list.id)); // Remove list from selectedLists
    } else {
      setSelectedLists([...selectedLists, list.id]); // Add list to selectedLists
    }
  };

  return (
    <div>
      <li className="list-item" onClick={selectList}>
        {list.name}
        {selectedLists.includes(list.id) && <CheckIcon />}
        {filmInList && <CheckIcon />}
      </li>
    </div>
  );
}

export default ListOption;
