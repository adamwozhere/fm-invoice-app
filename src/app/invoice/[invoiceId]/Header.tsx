'use client';

import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { InvoiceSchema } from '@/schemas/InvoiceSchema';

export default function Header({
  invoiceStatus,
}: {
  invoiceStatus: InvoiceSchema['status'];
}) {
  return (
    <header className="flex items-center justify-between gap-2 rounded-md bg-white p-4 px-[32px] py-[20px] shadow-base">
      <div className="flex items-baseline gap-5">
        <span className="text-shsm text-raincloud">Status</span>
        <Tag status={invoiceStatus} />
      </div>
      <div className="flex items-center gap-2">
        <Button label="Edit" variant="secondary" />
        <Button label="Delete" variant="warning" />
        <Button label="Mark as Paid" variant="primary" />
      </div>
    </header>
  );
}
