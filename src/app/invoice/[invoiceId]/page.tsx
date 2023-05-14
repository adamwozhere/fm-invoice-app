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
  // const parsed = InvoiceValidator.parse(invoice.data());
  // return parsed;
  return invoice.data() as InvoiceSchema;
};

export default async function InvoicePage({ params }: Params) {
  const invoice = await fetchInvoice(params.invoiceId);

  return (
    <>
      <nav className="pt-16">
        <Link
          href="/"
          className="mb-8 flex items-baseline gap-6 text-hsmv text-onyx"
        >
          <ArrowLeftIcon />
          Go back
        </Link>
      </nav>

      <Header invoiceId={invoice.id} />

      <Invoice data={invoice} />
    </>
  );
}
