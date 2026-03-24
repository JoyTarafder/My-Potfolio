'use client';

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-surface-alt dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface dark:bg-dark-surface-alt p-8 rounded-[2rem] shadow-[var(--shadow-soft)] border border-border/50 dark:border-dark-border/50">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
              Joy<span className="text-primary">.</span>
            </a>
            <p className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary mt-2">
              Designing the future of the web.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: FiGithub, href: 'https://github.com/joytarafder', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/joytarafder', label: 'LinkedIn' },
              { icon: FiTwitter, href: 'https://twitter.com/joytarafder', label: 'Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3.5 rounded-full bg-surface-alt dark:bg-dark-surface
                           text-text-secondary dark:text-dark-text-secondary border border-transparent
                           hover:text-primary hover:border-border dark:hover:border-dark-border hover:shadow-sm
                           hover:scale-110 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-text-muted dark:text-dark-text-muted flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} Joy Tarafder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
