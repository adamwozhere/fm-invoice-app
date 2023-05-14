import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import { Timestamp } from 'firebase/firestore';

const currency = {
  format: function (amount: number) {
    const intl = new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'GBP',
    });
    // insert a space between the '£' sign and the number
    return intl
      .format(amount)
      .replace(/^(\D+)/, '$1 ') // insert space after first non-digit character
      .replace(/\s+/, ' '); // replace double space with single space (some browsers will create a double space)
  },
};

// Hack to get date displaying properly
// Schema thinks it's a Date, but is actually a Timestamp format
// So accept Date OR Timestamp, then assert Timestamp.toDate function is available,
// then format the Timestamp.toDate()
const date = {
  format: function (value: Date | Timestamp) {
    const intl = new Intl.DateTimeFormat('en-UK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    if ('toDate' in value) {
      return intl.format(value.toDate());
    }
  },
};

export default function Invoice({ data }: { data: InvoiceSchema }) {
  const firebaseTimestamp = Timestamp.now();
  return (
    <article className="mt-6 rounded-md bg-white p-12 shadow-base">
      <h1 className="sr-only">Invoice</h1>
      <div className="flex justify-between">
        <div>
          <span className="text-hsm text-onyx">
            <span className="text-raincloud">#</span>
            {data.id}
          </span>
          <span className="mt-[7px] block text-shsm text-lilac">
            {data.description}
          </span>
        </div>
        <address className="text-right text-sm not-italic text-lilac">
          19 Union Terrace <br />
          London <br />
          E1 3EZ <br />
          United Kingdom
        </address>
      </div>
      <div className="mt-[21px] flex">
        <div className="basis-1/3">
          <span className="block text-shsm text-lilac">Invoice Date</span>
          <span className="bold mt-3 block text-hsm text-onyx">
            {date.format(data.invoiceDate)}
            {data.invoiceDate.toString()}
          </span>
          <span className="mt-8 block text-shsm text-lilac">Payment Due</span>
          <span className="bold mt-3 block text-hsm text-onyx">
            {date.format(data.paymentDue)}
          </span>
        </div>
        <div className="basis-1/3">
          <span className="block text-shsm text-lilac">Bill To</span>
          <address className="text-sm not-italic text-lilac">
            <span className="bold mt-3 block text-hsm text-onyx">
              {data.clientName}
            </span>
            <span className="mt-[7px] block">
              84 Church Way <br />
              Bradford <br />
              BD1 9PB <br />
              United Kingdom
            </span>
          </address>
        </div>
        <div className="basis-1/2">
          <span className="block text-shsm text-lilac">Sent To</span>
          <address className="bold mt-3 text-hsm not-italic text-onyx">
            {data.clientEmail}
          </address>
        </div>
      </div>
      <table className="mt-[44px] w-full overflow-hidden rounded-t-lg bg-frost">
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
            <td className="px-8 pt-8 text-right text-hsmv group-last:pb-8">
              £ 156.00
            </td>
          </tr>
        </tbody>
      </table>
      <div className="px08 flex items-center justify-between rounded-b-lg bg-gunpowder px-8 pb-[21px] pt-[27px]">
        <span className="text-left text-sm text-white">Amount Due</span>
        <span className="text-right text-hmdv text-white">
          {currency.format(data.total)}
        </span>
      </div>
    </article>
  );
}
