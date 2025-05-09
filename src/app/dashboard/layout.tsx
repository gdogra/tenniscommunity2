import Sidebar from '@/components/Sidebar';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        {children}
      </main>
    </div>
  );
}

