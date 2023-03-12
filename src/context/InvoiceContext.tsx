import { db } from '@/firebase/firebaseConfig';
import {
  streamCollection,
  streamCollectionSnapshot,
} from '@/firebase/firebaseFunctions';
import { ITestSchema } from '@/schemas/TestSchema';
import { generateUID } from '@/utils/generateUID';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Reducer,
  useReducer,
} from 'react';

interface Props {
  children: React.ReactNode;
}

// need to work out how I can add the return functions type to the provider value
//type IInvoiceContext = <ITestSchema[], ReturnType<getInvoice>>;

const InvoiceContext = createContext<{
  isLoading: boolean;
  invoices: ITestSchema[];
  dispatch: React.Dispatch<InvoiceAction>;
}>({
  isLoading: false,
  invoices: [],
  dispatch: () => {},
});

type InvoiceAction =
  | { type: 'SET'; invoices: ITestSchema[] }
  | { type: 'CREATE'; data: ITestSchema }
  | { type: 'DELETE'; id: string }
  | { type: 'UPDATE'; id: string; data: Partial<ITestSchema> };

// REDUCER
const invoicesReducer: Reducer<ITestSchema[], InvoiceAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET':
      console.log('dispatch SET');
      return action.invoices;

    case 'CREATE':
      console.log('dispatch CREATE');
      const createItem = async () => {
        const uid = action.data.id as string;
        console.log('with uid:', uid);
        await setDoc(doc(db, 'test', uid), action.data);
      };
      createItem();
      return state;

    // deletes from list (can use for filter func) but does not delete from firebase
    case 'DELETE':
      console.log('dispatch DELETE');
      //return state.filter((invoice) => invoice.id !== action.id);
      // this works, put it in a firebase function
      const deleteItem = async () => {
        await deleteDoc(doc(db, 'test', action.id));
      };
      deleteItem();
      return state;

    // FIX CODE TO COMPARE FIELDS FOR UPDATING!!!!
    case 'UPDATE':
      console.log('dispatch UPDATE');
      const updateItem = async () => {
        const docRef = doc(db, 'test', action.id);
        await updateDoc(docRef, action.data);
      };
      updateItem();

    default:
      return state;
  }
};

export function InvoiceProvider({ children }: Props) {
  const [invoices, dispatch] = useReducer(invoicesReducer, []);
  const [isLoading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'test'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const invoices = snapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as ITestSchema)
      );
      console.log('querying firebase');
      dispatch({ type: 'SET', invoices });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, isLoading, dispatch }}>
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
