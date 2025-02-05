import CloseIcon from "@mui/icons-material/Close";
import "./GetForm.css";
import "./AddToList.css";
import ListOption from "./ListOption";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../context/list.context";

function AddToList(props) {
  const { film } = props;
  const {
    lists,
    getLists,
    addList,
    selectedLists,
    setSelectedLists,
    addFilmToList,
  } = useContext(ListContext);
  const [listName, setListName] = useState("");

  const listNameChange = (e) => {
    setListName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = listName.toLowerCase().replace(/\s+/g, "-");
    const list = {
      name: listName,
      films: [],
    };
    addList(id, list);
    setSelectedLists([...selectedLists, id]);
    setListName("");
  };

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props]);

  const handleClose = () => {
    props.toggle();
    setSelectedLists([]);
  };

  const listOptions = lists.map((list) => (
    // <li key={list.id} className="list-item">
    //   {list.name}
    // </li>
    <ListOption key={list.id} list={list} film={film}></ListOption>
  ));

  const handleAddFilm = () => {
    addFilmToList(film.id);
    console.log("Listas Seleccionas ", selectedLists);
    handleClose();
  };

  return (
    <div className="popup-overlay active">
      <div className="form-container">
        <button className="close-button" onClick={handleClose}>
          <CloseIcon />
        </button>
        <p className="title">Add To list</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            id="list-name"
            placeholder="List Name"
            value={listName}
            onChange={listNameChange}
          ></input>
          <button className="submit-list" type="submit" disabled={!listName}>
            Add List
          </button>
        </form>
        <ul className="list-options">{listOptions}</ul>
        <button className="submit-film" onClick={handleAddFilm}>
          Add To List
        </button>
      </div>
    </div>
  );
}

export default AddToList;
