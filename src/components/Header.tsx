import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

interface Props {
  num: number;
}

export default function Header({ num }: Props) {
  return (
    <header className="main-header">
      <div className="title">
        <h1>Invoices</h1>
        <p>There are {num} total invoices</p>
      </div>

      <div className="filter">
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
        <Button variant="primary-plus" label="New Invoice" />
        {/* <Link href="/new">
          <span className="icon">
                    <Image
                      src="/assets/icon-plus.svg"
                      alt=""
                      width="10"
                      height="10"
                    />
                  </span>
          <span className="button" data-icon="plus">
            New Invoice
          </span>
        </Link> */}
      </div>
    </header>
  );
}
