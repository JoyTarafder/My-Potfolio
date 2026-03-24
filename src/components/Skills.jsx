'use client';

import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import {
  FiCode,
  FiLayout,
  FiGitBranch,
  FiServer,
  FiBox,
  FiTerminal,
} from 'react-icons/fi';

const skillCategories = [
  {
    title: 'Languages',
    icon: <FiCode size={20} />,
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
    ],
  },
  {
    title: 'Frameworks',
    icon: <FiLayout size={20} />,
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Tools',
    icon: <FiTerminal size={20} />,
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'VS Code', level: 95 },
    ],
  },
  {
    title: 'Other',
    icon: <FiServer size={20} />,
    skills: [
      { name: 'REST APIs', level: 82 },
      { name: 'Responsive Design', level: 92 },
      { name: 'Performance', level: 80 },
    ],
  },
];

const techIcons = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js',
  'Tailwind CSS', 'Git', 'Docker', 'REST APIs', 'Framer Motion',
];

export default function Skills() {
  return (
    <section id="skills" className={`${styles.skills} section`}>
      <div className={`${styles.bg}`} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            My <span className={styles.highlight}>Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Tech Cloud */}
        <motion.div
          className={styles.techCloud}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {techIcons.map((tech, i) => (
            <motion.span
              key={tech}
              className={styles.techBubble}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -4 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Skill Bars */}
        <div className={styles.grid}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className={styles.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
            >
              <div className={styles.catHeader}>
                <div className={styles.catIcon}>{cat.icon}</div>
                <h3 className={styles.catTitle}>{cat.title}</h3>
              </div>
              <div className={styles.skillsList}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPercent}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBarBg}>
                      <motion.div
                        className={styles.skillBar}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
