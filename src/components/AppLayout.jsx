import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink dark:text-paper">
      <Navbar />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar />
        <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
