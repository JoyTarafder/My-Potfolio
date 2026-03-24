'use client';

import styles from './Footer.module.css';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FiMail, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} container`}>
        <div className={styles.left}>
          <a href="#hero" className={styles.logo}>
            <span className={styles.logoAccent}>J</span>oy
            <span className={styles.logoDot}>.</span>
          </a>
          <p className={styles.tagline}>
            Building beautiful, performant web experiences.
          </p>
        </div>

        <div className={styles.center}>
          <div className={styles.links}>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/joytarafder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={styles.socialLink}
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://github.com/joytarafder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={styles.socialLink}
            >
              <FaGithub size={16} />
            </a>
            <a
              href="mailto:joytarafder3@gmail.com"
              aria-label="Email"
              className={styles.socialLink}
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles.bottom} container`}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Joy Tarafder. All rights reserved.
        </p>
        <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
          <FiArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
