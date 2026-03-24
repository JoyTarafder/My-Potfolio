'use client';

import { motion } from 'framer-motion';
import { FiCode, FiLayout, FiSmartphone, FiZap } from 'react-icons/fi';

const SERVICES = [
  {
    icon: FiCode,
    title: 'Web Engineering',
    description: 'Building robust, scalable applications with React, Next.js, and modern TypeScript architectures.',
  },
  {
    icon: FiLayout,
    title: 'Interaction Design',
    description: 'Translating complex requirements into intuitive, fluid, and beautiful user interfaces.',
  },
  {
    icon: FiSmartphone,
    title: 'Responsive Layouts',
    description: 'Crafting pixel-perfect experiences that effortlessly adapt to any screen size or device type.',
  },
  {
    icon: FiZap,
    title: 'Performance Tuning',
    description: 'Optimizing web vitals and overall architecture for lightning-fast speeds and high SEO scores.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-surface-alt dark:bg-dark-surface-alt">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
            Specialized in
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-3xl
                         bg-surface dark:bg-dark-surface
                         shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)]
                         border border-border/50 dark:border-dark-border/50
                         transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface-raised dark:bg-dark-surface-raised text-text-primary dark:text-dark-text-primary flex items-center justify-center
                              group-hover:bg-primary group-hover:text-surface group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 mb-6 shadow-sm">
                <service.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-base text-text-secondary dark:text-dark-text-secondary leading-relaxed font-[family-name:var(--font-dm-sans)]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
