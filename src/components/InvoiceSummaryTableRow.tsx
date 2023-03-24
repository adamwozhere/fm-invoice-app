import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import Image from 'next/image';

export default function InvoiceSummaryTableRow(
  data: InvoiceSchema,
  index: number
) {
  return (
    <tr className="" key={`invoice-${index}`}>
      <td className="id">{data.id}</td>
      <td className="date">
        Due <span>19 Aug 2021</span>
      </td>
      <td className="name">{data.clientName}</td>
      <td className="total">£ {data.total}</td>
      <td className="tag">{data.status}</td>
      <td>
        <span>
          <Image
            src="/assets/icon-arrow-right.svg"
            alt=""
            width="7"
            height="11"
          />
        </span>
      </td>
    </tr>
  );
}
