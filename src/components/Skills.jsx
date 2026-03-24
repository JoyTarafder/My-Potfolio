'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
  design: 'Design',
  other: 'Other',
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/skills`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setSkills(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(skills.map((s) => s.category))];
  const filtered = activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 bg-surface dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
            Tools & Craft
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-text-primary text-surface dark:bg-primary dark:text-white shadow-[var(--shadow-soft)]'
                  : 'bg-surface-raised dark:bg-dark-surface-raised text-text-secondary dark:text-dark-text-secondary hover:bg-border dark:hover:bg-dark-border hover:text-text-primary'
              }`}
            >
              {cat === 'all' ? 'All Skills' : CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Skills grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill._id || i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group p-6 rounded-[2rem] text-center
                           bg-surface-alt dark:bg-dark-surface-alt
                           border border-border/50 dark:border-dark-border/50
                           shadow-sm hover:shadow-[var(--shadow-hover)]
                           transition-all duration-300 flex flex-col items-center justify-center cursor-default"
              >
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-110">
                  {skill.icon || '⚡'}
                </div>
                <p className="text-sm font-bold text-text-primary dark:text-dark-text-primary mb-3 tracking-wide">
                  {skill.name}
                </p>
                {/* Proficiency bar */}
                <div className="w-full h-1.5 rounded-full bg-border dark:bg-dark-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency || 80}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent opacity-80 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
