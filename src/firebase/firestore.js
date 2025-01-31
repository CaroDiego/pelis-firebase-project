import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
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
 * Obtains a document from a given collection by id
 * @param {string } collectionName - Collection name
 * @param {string} id - Id of the document to search
 */
export const getDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (e) {
    console.error("Error fetching document from Firestore: ", e);
    throw e;
  }
};

/**
 * Set a document with a costum id
 * @param {string} collectionName - Collection name
 * @param {string} id - Id of the document (name-year)
 * @param {Object} document  - Document to add
 */
export const setDocument = async (collectionName, id, document) => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, document);
  } catch (e) {
    console.error("Error adding document to Firestore: ", e);
    throw e;
  }
};

/**
 * Delete a document by id
 * @param {string} collectionName - Collection Name
 * @param {string} id  - id of the document to delete
 */
export const delDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document from Firestore: ", e);
  }
};

/**
 * 
 * @param {string} collectionName - Collection Name
 * @param {string} id - id of the document to update
 * @param {Object} updates - Changes to be updated 
 */
export const updateDocument = async (collectionName, id, updates) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updates);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
