'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';
import { FiAward, FiCode, FiLayout, FiZap } from 'react-icons/fi';

const highlights = [
  { icon: <FiCode size={24} />, label: 'Clean Code', desc: 'Maintainable & scalable' },
  { icon: <FiLayout size={24} />, label: 'UI/UX Focus', desc: 'User-centric design' },
  { icon: <FiZap size={24} />, label: 'Performance', desc: 'Optimized & fast' },
  { icon: <FiAward size={24} />, label: 'Leadership', desc: 'Best Monitor Award' },
];

export default function About() {
  return (
    <section id="about" className={`${styles.about} section`}>
      <div className={`${styles.container} container`}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Passionate about crafting{' '}
            <span className={styles.highlight}>exceptional</span> digital
            experiences
          </h2>
          <p className={styles.text}>
            I&apos;m a motivated <strong>Frontend Developer</strong> with a deep
            focus on building interfaces that are not only visually stunning but
            also accessible and performant. With experience in modern frameworks
            like <strong>React</strong> and tools like{' '}
            <strong>Tailwind CSS</strong>, I bring designs to life with precision
            and care.
          </p>
          <p className={styles.text}>
            Beyond coding, I&apos;ve demonstrated strong leadership abilities —
            earning the <strong>Best Monitor Award</strong> at the IUB LFE
            Program. I believe in continuous learning and creating impact
            through clean, purposeful code.
          </p>

          <div className={styles.grid}>
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className={styles.cardIcon}>{item.icon}</div>
                <h4 className={styles.cardTitle}>{item.label}</h4>
                <p className={styles.cardDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot} style={{ background: '#ff5f57' }} />
              <span className={styles.codeDot} style={{ background: '#febc2e' }} />
              <span className={styles.codeDot} style={{ background: '#28c840' }} />
              <span className={styles.codeTitle}>about-joy.js</span>
            </div>
            <pre className={styles.codeContent}>
{`const joy = {
  name: "Joy Tarafder",
  role: "Frontend Developer",
  skills: [
    "React", "JavaScript",
    "Tailwind CSS", "HTML/CSS"
  ],
  passion: "Building beautiful UIs",
  motto: "Code with purpose",
  available: true
};`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
