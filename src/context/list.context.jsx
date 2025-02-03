import { createContext, useState } from "react";
import { getAllDocuments, setDocument } from "../firebase/firestore";

const ListContext = createContext();

function ListsProviderWrapper(props) {
  const [lists, setLists] = useState([]);

  const getLists = async () => {
    try {
      const listsArr = await getAllDocuments("lists");
      setLists(listsArr);
    } catch (e) {
      console.error("Error fetching lists:", e);
    }
  };

  const addList = async (id, newList) => {
    try {
      await setDocument("list", id, newList);
      newList.key = id;
      setLists([newList, ...lists]);
    } catch (e) {
      console.error("Error adding list:", e);
    }
  };

  return (
    <ListContext.Provider value={{ lists, setLists, getLists, addList }}>
      {props.children}
    </ListContext.Provider>
  );
}

export { ListContext, ListsProviderWrapper };
