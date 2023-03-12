import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ITestSchema } from '@/schemas/TestSchema';
import useInvoice from '@/context/InvoiceContext';

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;

  // const [data, setData] = useState<ITestSchema>();

  // // fetch invoice data
  // useEffect(() => {
  //   const unsubscribe = async () => {
  //     const docRef = doc(db, 'test', id as string);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setData(docSnap.data() as ITestSchema);
  //     } else {
  //       console.log('no such document!');
  //     }
  //   };
  //   unsubscribe();
  // }, [id]);

  const { invoices, dispatch } = useInvoice();
  const data = invoices.find((inv) => inv.id === id);

  return (
    <>
      <div>
        invoice: {id} {JSON.stringify(router.query)}
      </div>
      <pre>{JSON.stringify(data)}</pre>
      <Link href="/">Back</Link>

      <Link href={`/invoice/${id}/edit`}>Edit</Link>
      <button onClick={() => dispatch({ type: 'DELETE', id: id as string })}>
        DELETE
      </button>
    </>
  );
}
