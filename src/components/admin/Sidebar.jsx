'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiFolder,
  FiBriefcase,
  FiZap,
  FiUser,
  FiMessageSquare,
  FiArrowLeft,
  FiAward,
} from 'react-icons/fi';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: FiHome },
  { label: 'Projects', href: '/admin/projects', icon: FiFolder },
  { label: 'Experience', href: '/admin/experience', icon: FiBriefcase },
  { label: 'Skills', href: '/admin/skills', icon: FiZap },
  { label: 'Achievements', href: '/admin/achievements', icon: FiAward },
  { label: 'Profile', href: '/admin/profile', icon: FiUser },
  { label: 'Messages', href: '/admin/messages', icon: FiMessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-surface border-r border-dark-border
                      flex flex-col z-40">
      {/* Logo area */}
      <div className="p-6 border-b border-dark-border">
        <h2 className="text-xl font-bold text-gradient">Joy Admin</h2>
        <p className="text-xs text-dark-text-muted mt-0.5">Portfolio Manager</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-surface-alt'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to site */}
      <div className="p-4 border-t border-dark-border">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                     text-dark-text-muted hover:text-dark-text-primary hover:bg-dark-surface-alt
                     transition-all duration-200"
        >
          <FiArrowLeft size={18} />
          Back to Site
        </a>
      </div>
    </aside>
  );
}
