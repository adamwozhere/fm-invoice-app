import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import InvoiceCard from './InvoiceCard';
import Link from 'next/link';

interface InvoiceListProps {
  invoices: InvoiceSchema[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <ul>
      {invoices.map((data, i) => (
        <li key={`invoice-${i}`}>
          <Link href={`/invoice/${data.id}`}>{InvoiceCard(data)}</Link>
        </li>
      ))}
    </ul>
  );
}
