'use client';

import { motion } from 'framer-motion';
import { FiBook, FiAward } from 'react-icons/fi';

const EDUCATION = [
  {
    degree: 'Bachelor of Science in Computer Science and Engineering',
    institution: 'Independent University, Bangladesh',
    duration: 'Jun 2020 – Jul 2025',
    description: 'Courses: Data Structures, Algorithms, Database Management Systems, Object-Oriented Programming, Finite Automata, Compiler Construction, Mobile Application Development, Web Application.',
  },
  {
    degree: 'Higher Secondary School Certificate',
    institution: 'Ghatail Cantonment College Tangail, Dhaka',
    duration: 'Jul 2017 - Jun 2019',
    description: 'Science group.',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-surface-alt dark:bg-dark-surface-alt">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
            Academic Background
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="flex flex-col p-8 rounded-[2rem]
                         bg-surface dark:bg-dark-surface
                         border border-border/50 dark:border-dark-border/50
                         shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
                         transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {i === 0 ? <FiAward size={24} /> : <FiBook size={24} />}
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-text-secondary dark:text-dark-text-secondary">
                  {edu.duration}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2">
                {edu.degree}
              </h3>
              <p className="text-sm font-semibold text-primary mb-4">{edu.institution}</p>
              <p className="text-base text-text-secondary dark:text-dark-text-secondary leading-relaxed font-[family-name:var(--font-dm-sans)] mt-auto">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
