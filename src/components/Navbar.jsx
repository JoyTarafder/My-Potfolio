'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Awards', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500`}
    >
      <nav
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-surface/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-border dark:border-dark-border shadow-[var(--shadow-soft)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="text-xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary">
          Joy<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-text-secondary dark:text-dark-text-secondary
                           hover:text-primary hover:bg-primary/5 transition-all duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full bg-surface-raised dark:bg-dark-surface-raised text-text-secondary dark:text-dark-text-secondary
                       hover:text-primary hover:scale-105 transition-all duration-300"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-full bg-surface-raised dark:bg-dark-surface-raised
                       text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[120%] left-4 right-4 md:hidden bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-2xl rounded-3xl border border-border dark:border-dark-border shadow-[var(--shadow-hover)] overflow-hidden"
          >
            <ul className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3.5 rounded-2xl text-text-secondary dark:text-dark-text-secondary
                               hover:text-primary hover:bg-primary/5 transition-all font-medium text-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
