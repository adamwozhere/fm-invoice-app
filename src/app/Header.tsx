'use client';

import Image from 'next/image';
import PlusCircleIcon from '@/components/icons/PlusCircleIcon';
import Button from '@/components/Button';

export default function Header({ totalInvoices }: { totalInvoices: number }) {
  const invoiceLengthMessage = () => {
    if (totalInvoices <= 0) {
      return 'There are no invoices';
    } else if (totalInvoices === 1) {
      return 'There is one invoice';
    } else {
      return `There are ${totalInvoices} invoices`;
    }
  };

  return (
    <header className="main-header mb-16 flex items-center gap-10 pt-[4.8125rem] ">
      <div className="title mr-auto">
        <h1 className="text-xl text-onyx">Invoices</h1>
        <p className="mt-1.5 text-shsm text-raincloud">
          {invoiceLengthMessage()}
        </p>
      </div>

      <div className="inline-flex items-center gap-3.5 text-hsmv text-onyx filter">
        Filter by status
        <span>
          <Image
            src="/assets/icon-arrow-down.svg"
            alt=""
            width="11"
            height="7"
          />
        </span>
      </div>

      <div className="">
        <Button
          variant="primary"
          icon={<PlusCircleIcon />}
          label="New Invoice"
          onClick={() =>
            // router.push('/?new=invoice', '/new', { shallow: true })
            console.log('new')
          }
        />
      </div>
    </header>
  );
}
