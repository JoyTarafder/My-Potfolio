'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DashboardHeader({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <header className="h-[72px] bg-[#0B0F19]/80 backdrop-blur-xl border-b border-[#1F2937] sticky top-0 z-30 px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 -ml-2 text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]/50 rounded-xl transition-colors"
        >
          <FiMenu size={20} />
        </button>

        {/* Global Search Bar (Visual Only) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#111827] border border-[#1F2937] rounded-lg w-64 text-[#9CA3AF] transition-colors focus-within:border-[#2F8F9D]/50 focus-within:ring-1 focus-within:ring-[#2F8F9D]/50">
          <FiSearch size={16} />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="bg-transparent border-none outline-none text-sm w-full text-[#E5E7EB] placeholder-[#9CA3AF]"
          />
          <div className="flex shrink-0 items-center justify-center w-5 h-5 rounded bg-[#1F2937] text-[10px] font-bold">
            /
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Notifications */}
        <button className="relative p-2 text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]/50 rounded-xl transition-colors">
          <FiBell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#1F2937]" />

        {/* Profile Dropdown Area */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-[#E5E7EB]">Administrator</span>
            <span className="text-xs text-[#9CA3AF]">{user?.email || 'admin@joytarafder.dev'}</span>
          </div>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2F8F9D] to-[#8E8FFA] flex items-center justify-center text-white shadow-lg overflow-hidden border border-[#2F8F9D]/30 border-white/10 relative group">
             <span className="text-sm font-bold tracking-widest pl-0.5">JT</span>
             
             {/* Hover Overlay */}
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handleLogout} title="Logout">
               <FiLogOut size={16} />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
