import InvoiceSummary from './InvoiceSummary';
import Link from 'next/link';
import useInvoice from '@/context/InvoiceContext';
import InvoiceSummaryTableRow from './InvoiceSummaryTableRow';
import { InvoiceSchema } from '@/schemas/InvoiceSchema';

// @refresh reset

export default function InvoiceList() {
  const { invoices } = useInvoice();
  return (
    <ul role="list" className="invoice-list-column space-y-4">
      {invoices.map((data, i) => (
        <li key={`invoice-${i}`}>
          <Link href={`/invoice/${data.id}`}>
            <InvoiceSummary data={data} />
          </Link>
        </li>
      ))}
    </ul>
  );
  // return (
  //   <table className="invoice-list-table">
  //     <thead>
  //       <tr>
  //         <th>Invoice Number</th>
  //         <th>Due Date</th>
  //         <th>client name</th>
  //         <th>total amount</th>
  //         <th>status</th>
  //         <th>view icon</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {invoices.map((data, i) => InvoiceSummaryTableRow(data, i))}
  //     </tbody>
  //   </table>
  // );
}
