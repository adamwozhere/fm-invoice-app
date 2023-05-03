import { InvoiceSchema } from '@/schemas/InvoiceSchema';

type Props = {
  status: InvoiceSchema['status'];
};

export default function Tag({ status }: Props) {
  const classes = {
    pending: 'bg-pumpkin/[0.06] text-pumpkin before:bg-pumpkin',
    paid: 'bg-apple/[0.06] text-apple before:bg-apple',
    draft: 'bg-gunpowder/[0.06] text-gunpowder before:bg-gunpowder',
  };

  return (
    <span
      className={`${classes[status]}
      w-[104px] justify-self-end rounded-md px-4 pb-3 pt-3.5 text-center text-hsmv capitalize before:relative before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full`}
    >
      {status}
    </span>
  );
}
