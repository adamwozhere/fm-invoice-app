import { InvoiceSchema } from '@/schemas/Invoice';

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
      <span>{status}</span>
      <span>arrow icon</span>
    </article>
  );
}
