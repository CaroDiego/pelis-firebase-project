import { useContext, useEffect, useState } from "react";
import { ListContext } from "../context/list.context";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ListOption.css";

function ListOption(props) {
  const { film, list } = props;
  const { selectedLists, setSelectedLists } = useContext(ListContext);

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
      <li
        className={`list-item ${filmInList ? "film-in-list" : ""}`}
        onClick={selectList}
      >
        <span
          className={`list-name ${
            selectedLists.includes(list.id) && filmInList
              ? "text-in-list"
              : selectedLists.includes(list.id) && !filmInList
              ? "text-not-in-list"
              : ""
          }`}
        >
          {list.name}
        </span>
        <span className="icon-container">
          {selectedLists.includes(list.id) && filmInList && (
            <DeleteIcon className="delete-icon" />
          )}
          {selectedLists.includes(list.id) && !filmInList && (
            <AddIcon className="add-icon" />
          )}
        </span>
      </li>
    </div>
  );
}

export default ListOption;
