'use client';

import useInvoiceListener from '@/hooks/useInvoiceListener';
import Header from './Header';
import Link from 'next/link';
import InvoiceSummary from '@/components/InvoiceSummary';

export default function HomePage() {
  const { invoices } = useInvoiceListener();

  return (
    <>
      <Header totalInvoices={invoices.length} />

      <section className="invoices-list">
        <ul role="list" className="invoice-list-column space-y-4">
          {invoices.map((data) => (
            <li key={data.id}>
              <Link href={`/invoice/${data.id}`}>
                <InvoiceSummary data={data} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
