import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
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
    console.error("Error fetching documents from Firestore: ", e);
    throw e;
  }
};

/**
 *
 * @param {string} collectionName - Collection name
 * @param {Object} document  - Document to add
 */
//?Hacer un setDoc con Id personalizada (ej:nameyear)
export const addDocument = async (collectionName, document) => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, document);
  } catch (e) {
    console.error("Error adding document to Firestore: ", e);
    throw e;
  }
};
/**
 *
 * @param {string} collectionName - Collection Name
 * @param {Object} document  - Document to delete
 */
export const delDocument = async (collectionName, document) => {
  try {
    const docRef = doc(db, collectionName, document.id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document from Firestore: ", e);
  }
};

export const updateDocument = async (collectionName, document) => {
  try {
    const docRef = doc(db, collectionName, document.id);
    await updateDoc(docRef, {
      year: 2020,
      director: "Clint Eastwood",
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
