import Link from 'next/link';
import { useRouter } from 'next/router';

import useInvoice from '@/context/InvoiceContext';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import Tag from '@/components/Tag';
import Button from '@/components/Button';

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;

  const { invoices, dispatch } = useInvoice();
  const data = invoices.find((inv) => inv.id === id);

  const onDelete = () => {
    dispatch({ type: 'DELETE', id: id as string });
    router.push('/');
  };

  return (
    <div className="invoice-page pt-16">
      <h1 className="sr-only">Invoice (hidden)</h1>
      <nav>
        <Link
          href="/"
          className="mb-8 flex items-baseline gap-6 text-hsmv text-onyx"
        >
          <ArrowLeftIcon />
          Go back
        </Link>
      </nav>
      <header className="invoice-header flex items-center justify-between gap-2 rounded-md bg-white p-4 px-[32px] py-[20px] shadow-base">
        <div className="flex items-baseline gap-5">
          <span className="status text-shsm">Status</span>
          <Tag status={data?.status} />
        </div>
        <div className="flex items-baseline gap-2">
          <Button label="Edit" variant="secondary" />
          <Button label="Delete" onClick={onDelete} variant="warning" />
          <Button label="Mark as Paid" variant="primary" />
        </div>
      </header>
      <div className="invoice-main mt-6 rounded-md bg-white p-12 shadow-base">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="invoice-id text-hsm text-onyx before:text-raincloud before:content-['#']">
              {data?.id}
            </h3>
            <p className="description mt-[7px] text-shsm text-lilac">
              Graphic Design
            </p>
          </div>
          <p className="addres text-right text-sm text-lilac">
            19 Union Terrace
            <br /> London
            <br /> E1 3EZ
            <br /> United Kingdom
          </p>
        </div>
        <div className="dates-row mt-[21px] flex">
          <div className="basis-1/3">
            <p className="title text-shsm text-lilac">Invoice Date</p>
            <p className="bold mt-3 text-hsm text-onyx">21 Aug 2021</p>
            <p className="title mt-8 text-shsm text-lilac">Payment Due</p>
            <p className="bold mt-3 text-hsm text-onyx">20 Sep 2021</p>
          </div>
          <div className="basis-1/3">
            <p className="title text-shsm text-lilac">Bill To</p>
            <address className="address text-sm not-italic text-lilac">
              <p className="bold mt-3 text-hsm text-onyx">Alex Grim</p>
              <p className="mt-[7px]">
                84 Church Way
                <br />
                Bradford
                <br />
                BD1 9PB
                <br />
                United Kingdom
              </p>
            </address>
          </div>
          <div className="basis-1/2">
            <p className="title text-shsm text-lilac">Sent To</p>
            <address className="bold mt-3 text-hsm not-italic text-onyx">
              alexgrim@mail.com
            </address>
          </div>
        </div>
        <table className="invoice-items-table txt-heading-sm mt-[44px] w-full overflow-hidden rounded-t-lg bg-frost">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-[45%] px-8 pt-8 text-left text-sm text-lilac"
              >
                Item Name
              </th>
              <th scope="col" className="w-[10%] px-8 pt-8 text-sm text-lilac">
                QTY.
              </th>
              <th
                scope="col"
                className="w-[21%] px-8 pt-8 text-right text-sm text-lilac"
              >
                Price
              </th>
              <th
                scope="col"
                className="w-[24%] px-8 pt-8 text-right text-sm text-lilac"
              >
                Total
              </th>
            </tr>
          </thead>
          {/* Take bottom (amount due) part out of table as col widths etc don't work together 
            ALSO: take of vertical padding on rows and use a TR row gap instead now ! */}
          <tbody>
            <tr className="group">
              <td className="px-8 pt-8 text-hsmv group-last:pb-8">
                Banner Design
              </td>
              <td className="px-8 pt-8 text-center text-hsmv text-lilac group-last:pb-8">
                1
              </td>
              <td className="px-8 pt-8 text-right text-hsmv text-lilac group-last:pb-8">
                £ 156.00
              </td>
              <td className=" px-8 pt-8 text-right text-hsmv group-last:pb-8">
                £ 156.00
              </td>
            </tr>
            <tr className="group">
              <td className="px-8 pt-8 text-hsmv group-last:pb-8">
                Email Design
              </td>
              <td className="px-8 pt-8 text-center text-hsmv text-lilac group-last:pb-8">
                2
              </td>
              <td className="px-8 pt-8 text-right text-hsmv text-lilac group-last:pb-8">
                £ 200.0
              </td>
              <td className="px-8 pt-8 text-right text-hsmv group-last:pb-8">
                £ 400.0
              </td>
            </tr>
          </tbody>
        </table>
        <div
          className="flex items-center
         justify-between rounded-b-lg bg-gunpowder px-8 pb-[21px] pt-[27px]"
        >
          <span className="text-left text-sm text-white">Amount Due</span>
          <span className="text-right text-hmdv text-white before:content-['£_']">
            556.00
          </span>
        </div>
      </div>
      {/* <div>
        invoice: {id} {JSON.stringify(router.query)}
      </div> */}
      {/* <pre>{JSON.stringify(data)}</pre> */}

      {/* <Link href={`/invoice/${id}/edit`}>Edit</Link> */}
    </div>
  );
}
