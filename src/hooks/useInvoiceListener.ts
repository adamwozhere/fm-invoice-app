// 'use client';

import { COLLECTION_NAME, db } from '@/lib/firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { InvoiceSchema, InvoiceValidator } from '@/schemas/InvoiceSchema';

export default function useInvoiceListener() {
  const [invoices, setInvoices] = useState<InvoiceSchema[]>([]);

  // attach firestore listener
  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) =>
          InvoiceValidator.parse(doc.data())
        );
        // setInvoices(data as InvoiceSchema[]);
        setInvoices(data);
      },
      (error) => {
        console.error(error);
      }
    );
    // cleanup listener
    return () => unsubscribe();
  }, []);

  const invoiceLengthMessage = () => {
    if (invoices.length <= 0) {
      return 'There are no invoices';
    } else if (invoices.length === 1) {
      return 'There is one invoice';
    } else {
      return `There are ${invoices.length} invoices`;
    }
  };

  return {
    invoices,
    invoiceLengthMessage,
  };
}
