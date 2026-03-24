'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiFolder, FiBriefcase, FiZap,
  FiUser, FiMessageSquare, FiArrowLeft, FiAward,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: FiHome },
  { label: 'Projects', href: '/admin/projects', icon: FiFolder },
  { label: 'Experience', href: '/admin/experience', icon: FiBriefcase },
  { label: 'Skills', href: '/admin/skills', icon: FiZap },
  { label: 'Achievements', href: '/admin/achievements', icon: FiAward },
  { label: 'Messages', href: '/admin/messages', icon: FiMessageSquare },
  { label: 'Profile', href: '/admin/profile', icon: FiUser },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 240 : 80,
          x: isOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -240 : 0)
        }}
        className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-[#111827] lg:bg-[#0B0F19]/50 lg:backdrop-blur-xl border-r border-[#1F2937] shadow-xl lg:shadow-none"
      >
        {/* Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 items-center justify-center bg-[#1F2937] border border-[#374151] rounded-full text-gray-400 hover:text-white transition-colors z-50"
        >
          {isOpen ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
        </button>

        {/* Branding */}
        <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'justify-center'} min-h-[80px]`}>
          {isOpen ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2F8F9D] to-[#8E8FFA] flex items-center justify-center shadow-lg shadow-[#2F8F9D]/20 text-white font-bold text-sm">
                J
              </div>
              <span className="text-lg font-bold text-[#E5E7EB] tracking-tight">Workspace</span>
            </motion.div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2F8F9D] to-[#8E8FFA] flex items-center justify-center shadow-lg shadow-[#2F8F9D]/20 text-white font-bold text-sm">
              J
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
                  } ${!isOpen && 'justify-center'}`}
                >
                  <item.icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-white' : 'text-[#9CA3AF] group-hover:text-[#E5E7EB]'}`} />
                  
                  {isOpen && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>

                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2F8F9D]/20 to-[#8E8FFA]/20 border border-[#2F8F9D]/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity px-3 py-1.5 bg-[#1F2937] text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#1F2937]">
          <a
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]/50 ${!isOpen && 'justify-center'}`}
            title={!isOpen ? 'Back to Site' : undefined}
          >
            <FiArrowLeft size={18} />
            {isOpen && <span>Back to Site</span>}
          </a>
        </div>

      </motion.aside>
    </>
  );
}
