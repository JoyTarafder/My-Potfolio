'use client';

import { motion } from 'framer-motion';
import styles from './Education.module.css';
import { FiBookOpen, FiAward } from 'react-icons/fi';

const education = [
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'Independent University, Bangladesh (IUB)',
    period: '2020 — 2025',
    icon: <FiBookOpen size={22} />,
  },
  {
    degree: 'HSC — Science',
    institution: 'Ghatail Cantonment College',
    period: 'Completed',
    icon: <FiBookOpen size={22} />,
  },
];

const certifications = [
  'Web Development',
  'CCNA (Cisco)',
  'Product Management',
  'Digital Marketing',
];

export default function Education() {
  return (
    <section id="education" className={`${styles.education} section`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Education</span>
          <h2 className="section-title">
            Education & <span className={styles.highlight}>Certifications</span>
          </h2>
        </motion.div>

        <div className={styles.content}>
          {/* Education Timeline */}
          <div className={styles.timeline}>
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className={styles.timelineIcon}>{edu.icon}</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <p className={styles.institution}>{edu.institution}</p>
                  <span className={styles.period}>{edu.period}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            className={styles.certs}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={styles.certsTitle}>
              <FiAward size={20} /> Certifications
            </h3>
            <div className={styles.certsList}>
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  className={styles.certItem}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                >
                  <span className={styles.certCheck}>✓</span>
                  {cert}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
