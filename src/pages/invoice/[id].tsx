import Link from 'next/link';
import { useRouter } from 'next/router';

import useInvoice from '@/context/InvoiceContext';

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;

  const { invoices, dispatch } = useInvoice();
  const data = invoices.find((inv) => inv.id === id);

  const onDelete = () => {
    dispatch({ type: 'DELETE', id: id as string });
    router.push('/');
  };

  return (
    <>
      <div>
        invoice: {id} {JSON.stringify(router.query)}
      </div>
      <pre>{JSON.stringify(data)}</pre>
      <Link href="/">Back</Link>

      <Link href={`/invoice/${id}/edit`}>Edit</Link>
      <button onClick={onDelete}>DELETE</button>
    </>
  );
}
