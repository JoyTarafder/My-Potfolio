'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const experiences = [
  {
    company: 'CloudCoder Ltd',
    role: 'Frontend Developer Intern',
    period: '2025 — Present',
    location: 'Dhaka, Bangladesh',
    description:
      'Developed responsive UIs using React and Tailwind CSS. Collaborated on microservices-based frontend architecture. Integrated RESTful APIs and containerized workflows with Docker.',
    tech: ['React', 'Tailwind CSS', 'REST APIs', 'Docker', 'Git'],
    current: true,
  },
  {
    company: 'Digital Flexiload',
    role: 'Engineering Training',
    period: '2024',
    location: 'Bangladesh',
    description:
      'Gained hands-on experience in business operations and engineering workflows. Developed understanding of product cycles, technical infrastructure, and cross-functional team dynamics.',
    tech: ['Business Operations', 'Engineering', 'Product Lifecycle'],
    current: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className={`${styles.experience} section`}>
      <div className={`${styles.bg}`} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Where I&apos;ve <span className={styles.highlight}>Worked</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and the impact I&apos;ve made along the way.
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className={styles.card}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {exp.current && <span className={styles.currentBadge}>Current</span>}
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <FiCalendar size={14} /> {exp.period}
                  </span>
                  <span className={styles.metaItem}>
                    <FiMapPin size={14} /> {exp.location}
                  </span>
                </div>
              </div>
              <p className={styles.description}>{exp.description}</p>
              <div className={styles.techStack}>
                {exp.tech.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
