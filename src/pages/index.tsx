import Head from 'next/head';
import Image from 'next/image';

// import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

// const inter = Inter({ subsets: ['latin'] });

import Link from 'next/link';
import useInvoice from '@/context/InvoiceContext';
import InvoiceList from '@/components/InvoiceList';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PlusCircleIcon from '@/components/icons/PlusCircleIcon';
import RouteModal from '@/components/RouteModal';
import { useRouter } from 'next/router';
import NewInvoice from '@/components/forms/NewInvoice';

export default function Home() {
  const { invoices, isLoading } = useInvoice();
  console.log('invoicesContext: ', invoices);

  const router = useRouter();
  // NOTES:
  /**
   *
   * don't console log state from inside the useEffect as it causes exaustive-deps warning
   * for useState<***>([]) use <DocumentData[]> or your schema (if they are both compatible)
   *
   */

  return (
    <>
      <Head>
        <title>Invoice App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header num={invoices.length} />
      <Link href={'/?new=invoice'} as={'/new'}>
        Test Modal
      </Link>
      <button
        onClick={() => router.push('/?new=invoice', '/new', { shallow: true })}
        className="text-3xl font-bold underline"
      >
        test shallow modal
      </button>
      <RouteModal active={!!router.query.new}>
        <NewInvoice />
      </RouteModal>

      <div className="invoices-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <InvoiceList />
          </div>
        )}
      </div>
    </>
  );
}
