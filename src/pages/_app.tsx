// import '@/styles/main.scss';
import '@/globals.css';
import type { AppProps } from 'next/app';
import { InvoiceProvider } from '@/context/InvoiceContext';
import Layout from '@/components/Layout';
import { League_Spartan } from '@next/font/google';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'fallback',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={leagueSpartan.className}>
      <Layout>
        <InvoiceProvider>
          <Component {...pageProps} />
        </InvoiceProvider>
      </Layout>
    </div>
  );
}
