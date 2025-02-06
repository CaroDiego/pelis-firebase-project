import { createContext, useState } from "react";
import {
  getAllDocuments,
  getDocument,
  setDocument,
  updateDocument,
} from "../firebase/firestore";

const ListContext = createContext();

function ListsProviderWrapper(props) {
  const [lists, setLists] = useState([]); // Array of lists

  const [selectedLists, setSelectedLists] = useState([]); //Selected lists that are to be added to a film

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
      await setDocument("lists", id, newList);
      setLists([newList, ...lists]);
    } catch (e) {
      console.error("Error adding list:", e);
    }
  };

  const addFilmToList = async (filmId) => {
    for (let i = 0; i < selectedLists.length; i++) {
      const list = await getDocument("lists", selectedLists[i]);
      const listData = list.data();

      if (listData && listData.films) {
        const filmInList = listData.films.includes(filmId);

        if (!filmInList) {
          if (!listData.films || listData.films.length === 0) {
            await updateDocument("lists", selectedLists[i], {
              films: [filmId],
            });
          } else {
            const newList = listData.films.concat(filmId);
            await updateDocument("lists", selectedLists[i], {
              films: newList,
            });
          }
        } else {
          const newList = listData.films.filter((film) => film !== filmId);
          updateDocument("lists", selectedLists[i], {
            films: newList,
          });
        }
      } else {
        console.error(
          `List data or films not found for list: ${selectedLists[i]}`
        );
      }
    }
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        setLists,
        getLists,
        addList,
        selectedLists,
        setSelectedLists,
        addFilmToList,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
}

export { ListContext, ListsProviderWrapper };
