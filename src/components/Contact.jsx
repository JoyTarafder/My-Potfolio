'use client';

import { motion } from 'framer-motion';
import { FiSend, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 px-6 bg-surface dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-text-primary dark:text-dark-text-primary tracking-tight">
            Start a Conversation
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* Info Side Bento Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 p-8 lg:p-10 rounded-[2rem] bg-surface-alt dark:bg-dark-surface-alt
                       border border-border/50 dark:border-dark-border/50 shadow-[var(--shadow-soft)] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                Let's talk.
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-10 font-[family-name:var(--font-dm-sans)]">
                Got a project in mind, an opportunity, or just want to say hi? I'm currently available for new opportunities.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: FiMail, label: 'Email', value: 'joytarafder3@gmail.com' },
                { icon: FiMapPin, label: 'Location', value: 'Nikunja 2, Khilkhet, Dhaka' },
                { icon: FiPhone, label: 'Phone', value: '+8801714890199' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-5 group cursor-default">
                  <div className="p-3.5 rounded-2xl bg-surface dark:bg-dark-surface text-primary border border-border/50 dark:border-dark-border/50 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm">
                    <Icon size={20} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-0.5">{label}</p>
                    <p className="text-base font-medium text-text-primary dark:text-dark-text-primary">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 p-8 lg:p-10 rounded-[2rem] bg-surface dark:bg-dark-surface
                       border border-border/50 dark:border-dark-border/50 shadow-[var(--shadow-soft)] space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-surface-alt dark:bg-dark-surface-alt
                             border-none text-text-primary dark:text-dark-text-primary
                             focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-[var(--shadow-glow)]
                             transition-all duration-300 placeholder:text-text-muted/60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-surface-alt dark:bg-dark-surface-alt
                             border-none text-text-primary dark:text-dark-text-primary
                             focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-[var(--shadow-glow)]
                             transition-all duration-300 placeholder:text-text-muted/60"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-surface-alt dark:bg-dark-surface-alt
                           border-none text-text-primary dark:text-dark-text-primary
                           focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-[var(--shadow-glow)]
                           transition-all duration-300 placeholder:text-text-muted/60"
                placeholder="How can I help you?"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-surface-alt dark:bg-dark-surface-alt
                           border-none text-text-primary dark:text-dark-text-primary
                           focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-[var(--shadow-glow)]
                           transition-all duration-300 resize-none placeholder:text-text-muted/60"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full px-8 py-4 mt-2 rounded-full bg-text-primary hover:bg-black dark:bg-primary dark:hover:bg-primary-light text-surface dark:text-white font-semibold
                         shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
                         transition-all duration-300 hover:-translate-y-1 active:translate-y-0
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-surface/50 border-t-surface rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
