'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiUser } from 'react-icons/fi';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <header className="h-16 bg-dark-surface/50 backdrop-blur-xl border-b border-dark-border
                       flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-dark-text-primary">Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <FiUser size={14} />
          </div>
          {user?.email}
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-dark-text-muted hover:text-red-400 hover:bg-red-400/10
                     transition-all duration-200"
          aria-label="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  );
}
