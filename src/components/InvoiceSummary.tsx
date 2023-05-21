import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import { formatDate } from '@/utils/formatDate';
import ArrowRightIcon from './icons/ArrowRightIcon';
import Tag from '@/components/Tag';

type Props = {
  data: InvoiceSchema;
};

export default function InvoiceSummary({ data }: Props) {
  return (
    <div className="grid grid-cols-summary items-baseline gap-4 rounded-lg border border-white bg-white  p-4 pl-8 pr-5 text-onyx shadow-base transition-colors hover:border hover:border-violet">
      <span className="id text-hsmv before:text-lilac before:content-['#']">
        {data.id}
      </span>
      <span className="date text-shsm text-raincloud">
        Due
        <span className="text-lilac"> {formatDate(data.paymentDue)}</span>
      </span>
      <span className="name text-shsm text-raincloud">{data.clientName}</span>
      <span className="total text-right text-hsm">£ {data.total}</span>
      <Tag status={data.status} />
      <span>
        <ArrowRightIcon />
      </span>
    </div>
  );
}
