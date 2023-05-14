import '@/globals.css';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-league-spartan',
});

export const metadata: Metadata = {
  title: 'Invoice App',
  description: 'FrontEnd Mentor Invoice app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} font-sans`}>
      <body className="min-h-screen bg-snow">
        <div className="grid h-screen grid-cols-layout">
          <Sidebar />
          <main className="container mx-auto max-w-3xl px-5 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
