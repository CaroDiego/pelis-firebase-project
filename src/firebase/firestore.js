import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "./config";

/**
 * Obtains all the documents from a given collection
 * @param {string} collectionName - Collection name
 * @returns {Promise<Array>} - Array of the data
 */
export const getAllDocuments = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Error fetching documents from Firestore:", e);
    throw e;
  }
};

export const addDocument = async (collectionName, document) => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, document);
  } catch (e) {
    console.error("Error adding document to Firestore", e);
    throw e;
  }
};
