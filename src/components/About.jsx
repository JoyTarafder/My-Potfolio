'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/profile`)
      .then((r) => r.json())
      .then((d) => d.success && setProfile(d.data))
      .catch(() => {});
  }, []);

  const aboutText =
    profile?.aboutText ||
    'Integrating design thinking with deep technical knowledge, I build modern web applications that are beautiful, fast, and accessible.';

  return (
    <section id="about" className="py-24 px-6 bg-surface dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
              About me
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Bento Area */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative w-full aspect-[4/5] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-[var(--shadow-hover)] bg-surface-alt dark:bg-dark-surface-alt transition-transform duration-500 group-hover:-translate-y-2">
                {(profile?.profileImage || '/profile.png') ? (
                  <img
                    src={profile?.profileImage || '/profile.png'}
                    alt={profile?.name || 'Joy Tarafder'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-7xl opacity-50">✦</span>
                  </div>
                )}
                {/* Overlay soft gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Decorative Accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Text content & Stats Bento */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                Engineering <span className="text-primary italic font-serif">elegant</span> solutions.
              </h3>
              
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed text-lg font-[family-name:var(--font-dm-sans)]">
                {aboutText}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Years Experience', value: '3+' },
                  { label: 'Completed Projects', value: '20+' },
                  { label: 'Happy Clients', value: '15+' },
                  { label: 'Technologies', value: '10+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-surface-alt dark:bg-dark-surface-alt border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300"
                  >
                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-text-muted dark:text-dark-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="/CV_Joy_Tarafder.pdf"
                  download="CV_Joy_Tarafder.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full bg-text-primary hover:bg-black dark:bg-primary dark:hover:bg-primary-light text-surface dark:text-white font-medium transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
