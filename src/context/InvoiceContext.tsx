import { db } from '@/firebase/firebaseConfig';
import {
  streamCollection,
  streamCollectionSnapshot,
} from '@/firebase/firebaseFunctions';
import { ITestSchema } from '@/schemas/TestSchema';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { createContext, useContext, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

// need to work out how I can add the return functions type to the provider value
//type IInvoiceContext = <ITestSchema[], ReturnType<getInvoice>>;

const InvoiceContext = createContext<ITestSchema[] | null>(null);

export function InvoiceProvider({ children }: Props) {
  const [invoices, setInvoices] = useState<ITestSchema[]>([]);

  // useEffect(() => {
  //   const q = query(collection(db, 'test'));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     //setLoading(true);
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log('querying firebase');
  //     setInvoices(newData as ITestSchema[]);
  //     // setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => streamCollectionSnapshot('test', setInvoices), []);

  // confused
  const getData = () => {
    const data = streamCollection('test');
    console.log('getData', data());
  };

  useEffect(() => {
    getData();
  }, []);

  const getInvoice = (id: string) => invoices.find((inv) => inv.id === id);

  const functions = {
    invoices,
  };

  return (
    <InvoiceContext.Provider value={invoices}>
      {children}
    </InvoiceContext.Provider>
  );
}

const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within <InvoiceProvider>');
  }
  return context;
};

export default useInvoice;
