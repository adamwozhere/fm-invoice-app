import { db, COLLECTION_NAME } from '@/firebase/firebaseConfig';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { Dispatch } from 'react';

// TODO: tidy up generics, change all to recieve same generic dispatch action type e.g. { type, payload }

export const createDocument = async <T extends { id: string }>(data: T) => {
  await setDoc(doc(db, COLLECTION_NAME, data.id), data);
};

export const updateDocument = async <T extends { id: string; data: {} }>(
  data: T
) => {
  await updateDoc(doc(db, COLLECTION_NAME, data.id), data.data);
};

export const deleteDocument = async (data: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, data));
};

// listens for changes to collection and sets them to InvoiceContext using SET dispatch
export const addCollectionListener = <T>(dispatch: Dispatch<T>) => {
  const q = query(collection(db, COLLECTION_NAME));
  onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    dispatch({ type: 'SET', invoices: data } as T);
  });
};
