import { InvoiceSchema } from '@/schemas/InvoiceSchema';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

export default function Invoice({ data }: { data: InvoiceSchema }) {
  // try to get this working directly in zod?
  const AddressKeys = ['street', 'city', 'postCode', 'country'] as const;
  type AddressLine = (typeof AddressKeys)[number];

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
          {AddressKeys.map((key) => (
            <span key={`sender-address-${key}`}>
              {data.senderAddress[key]}
              <br />
            </span>
          ))}
        </address>
      </div>
      <div className="mt-[21px] flex">
        <div className="basis-1/3">
          <span className="block text-shsm text-lilac">Invoice Date</span>
          <span className="bold mt-3 block text-hsm text-onyx">
            {/* {date.format(data.invoiceDate)} */}
            {formatDate(data.invoiceDate)}
          </span>
          <span className="mt-8 block text-shsm text-lilac">Payment Due</span>
          <span className="bold mt-3 block text-hsm text-onyx">
            {/* {date.format(data.paymentDue)} */}
            {formatDate(data.paymentDue)}
          </span>
        </div>
        <div className="basis-1/3">
          <span className="block text-shsm text-lilac">Bill To</span>
          <address className="text-sm not-italic text-lilac">
            <span className="bold mt-3 block text-hsm text-onyx">
              {data.clientName}
            </span>
            <span className="mt-[7px] block">
              {AddressKeys.map((key: AddressLine) => (
                <span key={`client-address-${key}`}>
                  {data.clientAddress[key]}
                  <br />
                </span>
              ))}
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
          {data.items.map((item, i) => (
            <tr key={`item-${i}`} className="group">
              <td className="px-8 pt-8 text-hsmv group-last:pb-8">
                {item.name}
              </td>
              <td className="px-8 pt-8 text-center text-hsmv text-lilac group-last:pb-8">
                {item.quantity}
              </td>
              <td className="px-8 pt-8 text-right text-hsmv text-lilac group-last:pb-8">
                {formatCurrency(item.price)}
              </td>
              <td className="px-8 pt-8 text-right text-hsmv group-last:pb-8">
                {formatCurrency(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px08 flex items-center justify-between rounded-b-lg bg-gunpowder px-8 pb-[21px] pt-[27px]">
        <span className="text-left text-sm text-white">Amount Due</span>
        <span className="text-right text-hmdv text-white">
          {formatCurrency(data.total)}
        </span>
      </div>
    </article>
  );
}
