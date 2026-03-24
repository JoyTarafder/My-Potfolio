'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/profile`)
      .then((r) => r.json())
      .then((d) => d.success && setProfile(d.data))
      .catch(() => {});
  }, []);

  const name = profile?.name || 'Joy Tarafder';
  const title = profile?.title || 'Frontend Developer';
  const bio = profile?.bio || 'Crafting minimal, high-end digital experiences.';
  const social = profile?.socialLinks || {};

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background radial soft gradient */}
      <div className="absolute inset-0 pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,var(--color-primary-light)_0,transparent_50%)] before:opacity-[0.05] dark:before:opacity-[0.03]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-10 rounded-full
                     bg-surface dark:bg-dark-surface shadow-[var(--shadow-soft)] border border-border dark:border-dark-border
                     text-text-secondary dark:text-dark-text-secondary text-sm font-medium"
        >
          <span className="relative flex w-2.5 h-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-primary"></span>
          </span>
          Available for new projects
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary mb-6 leading-tight"
        >
          Designing the <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">future of the web</span>.
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-10 font-[family-name:var(--font-dm-sans)]"
        >
          I'm {name}, a {title}. {bio}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-text-primary hover:bg-black dark:bg-primary dark:hover:bg-primary-light text-surface dark:text-white font-medium transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary font-medium transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-6"
        >
          {[
            { icon: FiGithub, href: social.github || '#', label: 'GitHub' },
            { icon: FiLinkedin, href: social.linkedin || '#', label: 'LinkedIn' },
            { icon: FiTwitter, href: social.twitter || '#', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-primary dark:text-dark-text-muted dark:hover:text-primary transition-colors duration-300"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
