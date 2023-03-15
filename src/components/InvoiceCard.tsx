import { InvoiceSchema } from '@/schemas/InvoiceSchema';

export default function InvoiceCard({
  id,
  paymentDue,
  clientName,
  total,
  status,
}: InvoiceSchema) {
  return (
    <article>
      <span>{id}</span>
      <span>{paymentDue}</span>
      <span>{clientName}</span>
      <span>{total}</span>
      <span>{status.toString()}</span>
      <span>arrow icon</span>
    </article>
  );
}
