import {
  createContext,
  useContext,
  useState,
  useEffect,
  Reducer,
  useReducer,
} from 'react';

import {
  addCollectionListener,
  createDocument,
  deleteDocument,
  updateDocument,
} from '@/firebase/firebaseFunctions';

import { InvoiceSchema } from '@/schemas/InvoiceSchema';

// need to work out how I can add the return functions type to the provider value
//type IInvoiceContext = <ITestSchema[], ReturnType<getInvoice>>;

const InvoiceContext = createContext<{
  isLoading: boolean;
  invoices: InvoiceSchema[];
  dispatch: React.Dispatch<InvoiceAction>;
}>({
  isLoading: false,
  invoices: [],
  dispatch: () => {},
});

// reducer action types
export type InvoiceAction =
  | { type: 'SET'; invoices: InvoiceSchema[] }
  | { type: 'CREATE'; data: InvoiceSchema }
  | { type: 'DELETE'; id: string }
  | { type: 'UPDATE'; id: string; data: Partial<InvoiceSchema> };

// reducer for handling CRUD actions
const invoicesReducer: Reducer<InvoiceSchema[], InvoiceAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET':
      return action.invoices;

    case 'CREATE':
      createDocument(action.data);
      return state;

    case 'DELETE':
      deleteDocument(action.id);
      return state;

    case 'UPDATE':
      updateDocument(action);
      return state;

    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export function InvoiceProvider({ children }: Props) {
  const [invoices, dispatch] = useReducer(invoicesReducer, []);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log('unsubscribe');
    addCollectionListener<InvoiceAction>(dispatch);
    setLoading(false);
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
