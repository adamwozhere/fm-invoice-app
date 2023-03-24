import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import Image from 'next/image';

export default function InvoiceSummary(data: InvoiceSchema) {
  return (
    <div className="invoice-summary">
      <span className="id">{data.id}</span>
      <span className="date">
        Due <span>19 Aug 2021</span>
      </span>
      <span className="name">{data.clientName}</span>
      <span className="total">£ {data.total}</span>
      <span className="tag">{data.status}</span>
      <span>
        <Image
          src="/assets/icon-arrow-right.svg"
          alt=""
          width="7"
          height="11"
        />
      </span>
    </div>
  );
}
