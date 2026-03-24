'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setProjects(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-surface dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
            Selected Works
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Projects grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <motion.article
                key={project._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col rounded-[2rem] overflow-hidden
                           bg-surface-alt dark:bg-dark-surface-alt
                           border border-border/50 dark:border-dark-border/50
                           shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
                           transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 lg:h-72 overflow-hidden bg-surface-raised dark:bg-dark-surface-raised">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl opacity-20">✦</span>
                    </div>
                  )}

                  {/* Featured badge */}
                  {project.featured && (
                    <span className="absolute top-5 right-5 px-4 py-1.5 rounded-full bg-surface dark:bg-dark-surface
                                     text-primary dark:text-primary-light text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
                      Featured
                    </span>
                  )}

                  {/* Overlay links */}
                  <div className="absolute inset-0 bg-text-primary/10 opacity-0 group-hover:opacity-100
                                  flex items-center justify-center gap-4 transition-all duration-300 backdrop-blur-sm">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary hover:text-primary hover:scale-110 shadow-lg transition-all"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary hover:text-primary hover:scale-110 shadow-lg transition-all"
                        aria-label="Source Code"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-base text-text-secondary dark:text-dark-text-secondary mb-6 line-clamp-2 font-[family-name:var(--font-dm-sans)]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold
                                   bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary
                                   border border-border dark:border-dark-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-text-muted dark:text-dark-text-muted py-10 font-medium">
            No projects to display right now.
          </p>
        )}
      </div>
    </section>
  );
}
