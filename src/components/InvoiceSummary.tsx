import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import Image from 'next/image';
import ArrowRightIcon from './icons/ArrowRightIcon';

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
        <span className="text-lilac"> {'01 Oct 2022'}</span>
      </span>
      <span className="name text-shsm text-raincloud">{data.clientName}</span>
      <span className="total text-right text-hsm">£ {data.total}</span>
      <span className="tag list-item w-[104px] list-inside list-disc justify-self-end rounded-sm bg-pumpkin/[0.06] px-4 pb-3 pt-3.5 text-center text-hsmv capitalize text-pumpkin">
        {data.status}
      </span>
      <span>
        <ArrowRightIcon />
      </span>
    </div>
  );
}
