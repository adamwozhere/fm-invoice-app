import { db, COLLECTION_NAME } from '@/firebase/firebaseConfig';
import { collection, onSnapshot, query } from 'firebase/firestore';

export const addItem = async (data: unknown) => {};

export const updateItem = async (data: unknown) => {};

export const deleteItem = async (data: unknown) => {};

export const streamCollection = (col = COLLECTION_NAME) => {
  const q = query(collection(db, col));
  const newData = onSnapshot(q, (querySnapshot) =>
    querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  );
  return newData;
};

export const streamCollectionSnapshot = (
  col = COLLECTION_NAME,
  storeCollection: any
) => {
  const q = query(collection(db, col));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    storeCollection(newData);
  });
  return unsubscribe;
};
