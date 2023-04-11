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
    <div className="invoice-page">
      <h1>Invoice (hidden)</h1>
      <nav>
        <Link href="/">Go back</Link>
      </nav>
      <header className="invoice-header">
        <span className="status">Status</span>
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
      <div className="invoice-main">
        <div className="flex-row">
          <div>
            <h3 className="invoice-id">{data?.id}</h3>
            <p className="description">Graphic Design</p>
          </div>
          <p className="address">
            19 Union Terrace
            <br /> London
            <br /> E1 3EZ
            <br /> United Kingdom
          </p>
        </div>
        <div className="flex-row dates-row">
          <div>
            <p className="title">Invoice Date</p>
            <p className="bold">21 Aug 2021</p>
            <p className="title">Payment Due</p>
            <p className="bold">20 Sep 2021</p>
          </div>
          <div>
            <p className="title">Bill To</p>
            <address className="address">
              <p className="bold">Alex Grim</p>
              84 Church Way
              <br />
              Bradford
              <br />
              BD1 9PB
              <br />
              United Kingdom
            </address>
          </div>
          <div>
            <p className="title">Sent To</p>
            <address className="bold">alexgrim@mail.com</address>
          </div>
        </div>
        <table className="invoice-items-table txt-heading-sm">
          <thead>
            <tr>
              <th scope="col" className="left">
                Item Name
              </th>
              <th scope="col" className="center">
                QTY.
              </th>
              <th scope="col" className="right">
                Price
              </th>
              <th scope="col" className="right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Banner Design</td>
              <td className="center lilac">1</td>
              <td className="right lilac">£ 156.00</td>
              <td className="right">£ 156.00</td>
            </tr>
            <tr>
              <td>Email Design</td>
              <td className="center lilac">2</td>
              <td className="right lilac">£ 200.0</td>
              <td className="right">£ 400.0</td>
            </tr>
            <tr className="gunpowder">
              <th scope="row" colSpan={3} className="left white">
                Amount Due
              </th>
              <td className="right total">£ 556.00</td>
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
