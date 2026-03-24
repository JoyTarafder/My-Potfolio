'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, integrate with EmailJS or API route
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <div className={styles.bg} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let&apos;s Work <span className={styles.highlight}>Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Contact Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiMail size={22} />
              </div>
              <div>
                <h4 className={styles.infoLabel}>Email</h4>
                <a href="mailto:joytarafder3@gmail.com" className={styles.infoValue}>
                  joytarafder3@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiPhone size={22} />
              </div>
              <div>
                <h4 className={styles.infoLabel}>Phone</h4>
                <a href="tel:+8801714890199" className={styles.infoValue}>
                  +880 1714 890199
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <FiMapPin size={22} />
              </div>
              <div>
                <h4 className={styles.infoLabel}>Location</h4>
                <p className={styles.infoValue}>Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/joytarafder"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://github.com/joytarafder"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="contact-name" className={styles.label}>
                Your Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-email" className={styles.label}>
                Your Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-message" className={styles.label}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className={styles.textarea}
              />
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              {sent ? (
                <>
                  <FiCheck /> Message Sent!
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
