import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import PlusIcon from './icons/PlusIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';

interface Props {
  num: number;
}

export default function Header({ num }: Props) {
  const router = useRouter();

  return (
    <header className="main-header mb-16 flex items-center gap-10 pt-[4.8125rem] ">
      <div className="title mr-auto">
        <h1 className="text-xl text-onyx">Invoices</h1>
        <p className="mt-1.5 text-shsm text-raincloud">
          There are {num} total invoices
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
            router.push('/?new=invoice', '/new', { shallow: true })
          }
        />

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
      {/* <button
        onClick={() => router.push('/test', undefined, { shallow: true })}
      >
        test shallow route
      </button> */}
    </header>
  );
}
