import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper grid h-screen grid-cols-layout bg-snow">
      <Sidebar />
      <main className="main-container container mx-auto max-w-3xl px-5 ">
        {children}
      </main>
    </div>
  );
}
