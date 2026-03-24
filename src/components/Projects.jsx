'use client';

import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'AI Analytics Dashboard',
    description:
      'A comprehensive AI-powered dashboard for visualizing data analytics with real-time charts, interactive filters, and intelligent insights. Built with modern React patterns and optimized rendering.',
    tech: ['React', 'Chart.js', 'REST API', 'CSS Modules'],
    image: null,
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Microservices Frontend',
    description:
      'Scalable frontend architecture connecting multiple microservices through a unified, performant UI layer.',
    tech: ['React', 'Docker', 'REST APIs', 'Tailwind'],
    image: null,
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'E-Commerce UI Kit',
    description:
      'A premium e-commerce component library with responsive product grids, cart system, and checkout flow.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: null,
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Task Management App',
    description:
      'Kanban-style task management application with drag-and-drop, real-time updates, and team collaboration.',
    tech: ['React', 'JavaScript', 'CSS Grid'],
    image: null,
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
];

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={`${styles.projects} section`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Selected <span className={styles.highlight}>Work</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of projects that showcase my skills and passion for building great products.
          </p>
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            className={styles.featured}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <div className={styles.featuredImage}>
              <div className={styles.featuredPlaceholder}>
                <span>🚀</span>
                <p>Featured Project</p>
              </div>
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.featuredBadge}>⭐ Featured</span>
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <div className={styles.techStack}>
                {featured.tech.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <div className={styles.featuredLinks}>
                <a href={featured.liveUrl} className="btn btn-primary">
                  Live Demo <FiExternalLink />
                </a>
                <a href={featured.githubUrl} className="btn btn-outline">
                  <FiGithub /> Source Code
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects */}
        <div className={styles.grid}>
          {others.map((project, i) => (
            <motion.div
              key={project.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 + (i * 0.1) }}
            >
              <div className={styles.cardImage}>
                <div className={styles.cardPlaceholder}>
                  <span>💻</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.techStack}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.cardLinks}>
                  <a href={project.liveUrl} className={styles.iconLink} aria-label="Live demo">
                    <FiExternalLink size={18} />
                  </a>
                  <a href={project.githubUrl} className={styles.iconLink} aria-label="GitHub">
                    <FiGithub size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
