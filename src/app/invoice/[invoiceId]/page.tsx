import { db, COLLECTION_NAME } from '@/lib/firebase/config';
import { InvoiceSchema, InvoiceValidator } from '@/schemas/InvoiceSchema';
import { doc, getDoc } from 'firebase/firestore';
import Header from './Header';
import Link from 'next/link';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import Invoice from './Invoice';

type Params = {
  params: {
    invoiceId: string;
  };
};

// TODO: refactor to a separate file function
const fetchInvoice = async (invoiceId: string) => {
  const invoice = await getDoc(doc(db, COLLECTION_NAME, invoiceId));
  // return invoice.data() as InvoiceSchema;
  return InvoiceValidator.parse(invoice.data());
};

export default async function InvoicePage({ params }: Params) {
  const invoice = await fetchInvoice(params.invoiceId);

  return (
    <>
      <nav className="pt-16">
        <Link href={`/invoice/${params.invoiceId}/edit`}>test Edit</Link>
        <Link
          href="/"
          className="mb-8 flex items-baseline gap-6 text-hsmv text-onyx"
        >
          <ArrowLeftIcon />
          Go back
        </Link>
      </nav>

      <Header invoiceStatus={invoice.status} />

      <Invoice data={invoice} />
    </>
  );
}
