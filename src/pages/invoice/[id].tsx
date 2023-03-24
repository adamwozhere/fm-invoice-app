import Link from 'next/link';
import { useRouter } from 'next/router';

import useInvoice from '@/context/InvoiceContext';

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
    <div className="flex-column">
      <h1>Invoice (hidden)</h1>
      <nav>
        <Link href="/">Go back</Link>
      </nav>
      <header className="card flex-row">
        <span>Status</span>
        <span className="tag repel-right">{data?.status}</span>
        <button type="button" className="button">
          Edit
        </button>
        <button type="button" className="button" onClick={onDelete}>
          Delete
        </button>
        <button type="button" className="button">
          Mark as Paid
        </button>
      </header>
      <div className="card invoice-card flex-column">
        <div className="flex-row justify-left">
          <div>
            <h3 className="txt-heading-sm invoice-id">{data?.id}</h3>
            <p>Graphic Design</p>
          </div>
          <p>{data?.senderAddress.street}</p>
        </div>
        <table className="invoice-items-table txt-heading-sm">
          <thead>
            <tr>
              <th scope="col" className="txt-body">
                Item Name
              </th>
              <th scope="col" className="txt-center txt-body">
                QTY.
              </th>
              <th scope="col" className="txt-right txt-body">
                Price
              </th>
              <th scope="col" className="txt-right txt-body">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Banner Design</td>
              <td className="txt-center">1</td>
              <td className="txt-right">£ 156.00</td>
              <td className="txt-right">£ 156.00</td>
            </tr>
            <tr>
              <td>Email Design</td>
              <td className="txt-center">2</td>
              <td className="txt-right">£ 200.0</td>
              <td className="txt-right">£ 400.0</td>
            </tr>
            <tr className="total">
              <th scope="row" colSpan={3} className="txt-body">
                Amount Due
              </th>
              <td className="txt-right">£ 556.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div>
        invoice: {id} {JSON.stringify(router.query)}
      </div> */}
      {/* <pre>{JSON.stringify(data)}</pre> */}

      {/* <Link href={`/invoice/${id}/edit`}>Edit</Link> */}
    </div>
  );
}
