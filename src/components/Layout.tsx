import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <Sidebar />
      <main className="main-container">{children}</main>
    </div>
  );
}
