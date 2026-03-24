'use client';

import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/achievements`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setAchievements(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 px-6 bg-surface dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Recognition</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary dark:text-dark-text-primary tracking-tight">
            Awards & Honors
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex flex-col p-8 rounded-[2rem]
                           bg-surface-alt dark:bg-dark-surface-alt
                           border border-border/50 dark:border-dark-border/50
                           shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
                           transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-surface dark:bg-dark-surface text-primary border border-border/50 dark:border-dark-border/50 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-sm">
                    <FiAward size={20} className="stroke-[1.5]" />
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase text-text-muted dark:text-dark-text-muted">
                    {ach.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2 leading-tight">
                  {ach.title}
                </h3>
                <p className="text-sm font-semibold text-primary">{ach.organization}</p>
                {ach.description && (
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed font-[family-name:var(--font-dm-sans)] mt-4 border-t border-border/50 dark:border-dark-border/50 pt-4">
                    {ach.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
