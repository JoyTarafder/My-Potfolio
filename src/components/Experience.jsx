'use client';

import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/experience`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setExperiences(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 px-6 bg-surface-alt dark:bg-dark-surface-alt">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-4" />
        </motion.div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Timeline */}
        {!loading && (
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col md:flex-row gap-6 md:gap-8 p-8 rounded-[2rem]
                           bg-surface dark:bg-dark-surface
                           border border-border/50 dark:border-dark-border/50
                           shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
                           transition-all duration-300"
              >
                {/* Left Side: Role & Duration */}
                <div className="md:w-1/3 shrink-0 text-left">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-surface-raised dark:bg-dark-surface-raised text-primary mb-4">
                    <FiBriefcase size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-1 tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-base font-semibold text-primary mb-2">
                    {exp.company}
                  </p>
                  <span className="inline-block text-xs font-medium text-text-secondary dark:text-dark-text-secondary py-1 px-3 rounded-full bg-surface-raised dark:bg-dark-surface-raised border border-border dark:border-dark-border">
                    {exp.duration}
                  </span>
                </div>

                {/* Right Side: Details */}
                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-border dark:border-dark-border pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                  <p className="text-base text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-6 font-[family-name:var(--font-dm-sans)]">
                    {exp.description}
                  </p>
                  
                  {exp.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium
                                     bg-surface-raised dark:bg-dark-surface-raised text-text-muted dark:text-dark-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && experiences.length === 0 && (
          <p className="text-center text-text-muted py-10">No experience tracking available.</p>
        )}
      </div>
    </section>
  );
}
