'use client';

import { motion } from 'framer-motion';
import styles from './Services.module.css';
import { FiPenTool, FiCode, FiSmartphone, FiZap } from 'react-icons/fi';

const services = [
  {
    icon: <FiPenTool size={28} />,
    title: 'UI Design',
    description: 'Creating visually stunning and intuitive user interfaces that captivate and engage users from the first interaction.',
    index: '01',
  },
  {
    icon: <FiCode size={28} />,
    title: 'Frontend Development',
    description: 'Building robust, scalable web applications using modern frameworks like React with clean, maintainable code.',
    index: '02',
  },
  {
    icon: <FiSmartphone size={28} />,
    title: 'Responsive Web Design',
    description: 'Crafting fluid layouts that adapt seamlessly across all devices — from mobile phones to large desktop screens.',
    index: '03',
  },
  {
    icon: <FiZap size={28} />,
    title: 'Performance Optimization',
    description: 'Fine-tuning applications for maximum speed, minimal load times, and exceptional Lighthouse scores.',
    index: '04',
  },
];

export default function Services() {
  return (
    <section id="services" className={`${styles.services} section`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">What I Do</span>
          <h2 className="section-title">
            Services I <span className={styles.highlight}>Offer</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive frontend solutions tailored to bring your digital vision to life.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <span className={styles.cardIndex}>{service.index}</span>
              <div className={styles.cardIcon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <div className={styles.cardLine} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
