'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight, FiDownload, FiMail } from 'react-icons/fi';
import styles from './Hero.module.css';

const floatingCards = [
  { label: 'React', icon: '⚛️', x: -30, y: 20, delay: 0 },
  { label: 'UI/UX', icon: '🎨', x: 40, y: -30, delay: 0.2 },
  { label: 'Tailwind', icon: '💨', x: -20, y: 80, delay: 0.4 },
];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`${styles.content} container`}>
        <motion.div
           className={styles.left}
           initial={{ opacity: 0, x: -40 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1 }}
         >
           {/* <motion.div
             className={styles.badge}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ type: 'spring', delay: 0.1, stiffness: 200, damping: 20 }}
           >
             <span className={styles.badgeDot} />
             Available for work
           </motion.div> */}
 
           <motion.h1 
             className={styles.heading}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ type: 'spring', delay: 0.2, stiffness: 200, damping: 20 }}
           >
             Hi, I&apos;m <span className={styles.name}>Joy</span> —
             <br />
             <span className={styles.role}>Frontend Developer</span>
           </motion.h1>
 
           <motion.p 
             className={styles.description}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ type: 'spring', delay: 0.3, stiffness: 200, damping: 20 }}
           >
             I build clean, responsive, and user-friendly web interfaces with a
             strong focus on <strong>performance</strong> and{' '}
             <strong>usability</strong>.
           </motion.p>
 
           <motion.div
             className={styles.buttons}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ type: 'spring', delay: 0.4, stiffness: 200, damping: 20 }}
           >
             <a href="#projects" className="btn btn-primary">
               View Projects <FiArrowRight />
             </a>
             <a href="#contact" className="btn btn-outline">
               <FiMail /> Contact Me
             </a>
             <a href="#" className="btn btn-ghost">
               <FiDownload /> Download CV
             </a>
           </motion.div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>5+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>1+</span>
              <span className={styles.statLabel}>Year Exp.</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>10+</span>
              <span className={styles.statLabel}>Technologies</span>
            </div>
          </div>
        </motion.div>

        <motion.div
           className={styles.right}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
         >
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} />
            <div className={styles.imageCard}>
              <Image
                src="/profile.png"
                alt="Joy Tarafder — Frontend Developer"
                width={400}
                height={400}
                priority
                className={styles.profileImg}
              />
            </div>

            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                className={styles.floatingCard}
                style={{ '--fx': `${card.x}px`, '--fy': `${card.y}px` }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: card.delay,
                  ease: 'easeInOut',
                }}
              >
                <span>{card.icon}</span>
                {card.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className={styles.bgGradient} />
      <div className={styles.bgGrid} />
    </section>
  );
}
