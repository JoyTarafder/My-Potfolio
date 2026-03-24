import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});

    // Create admin user
    await User.create({
      email: 'admin@joytarafder.dev',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Admin user created (admin@joytarafder.dev / admin123)');

    // Create profile
    await Profile.create({
      name: 'Joy Tarafder',
      title: 'Frontend Developer',
      bio: 'Passionate frontend developer with a strong focus on creating clean, responsive, and user-friendly web interfaces. Specialized in React, Next.js, and modern JavaScript.',
      aboutText:
        'I am a frontend developer with 3+ years of experience building modern web applications. I love turning complex problems into simple, beautiful, and intuitive designs. My focus is on writing clean, maintainable code and creating seamless user experiences.',
      email: 'joy@joytarafder.dev',
      location: 'Dhaka, Bangladesh',
      socialLinks: {
        github: 'https://github.com/joytarafder',
        linkedin: 'https://linkedin.com/in/joytarafder',
        twitter: 'https://twitter.com/joytarafder',
        facebook: 'https://facebook.com/joytarafder',
      },
    });
    console.log('✅ Profile created');

    // Create projects
    await Project.insertMany([
      {
        title: 'E-Commerce Dashboard',
        description:
          'A full-featured e-commerce admin dashboard built with React and Node.js. Features include product management, order tracking, analytics, and real-time notifications.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Chart.js'],
        liveLink: 'https://example.com/ecommerce',
        githubLink: 'https://github.com/joytarafder/ecommerce-dashboard',
        featured: true,
        status: 'published',
        order: 1,
      },
      {
        title: 'Task Management App',
        description:
          'A collaborative task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
        techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
        liveLink: 'https://example.com/tasks',
        githubLink: 'https://github.com/joytarafder/task-manager',
        featured: true,
        status: 'published',
        order: 2,
      },
      {
        title: 'Weather Forecast App',
        description:
          'A beautiful weather application that provides real-time weather data, forecasts, and interactive maps using the OpenWeatherMap API.',
        techStack: ['React', 'OpenWeatherMap API', 'CSS3', 'Framer Motion'],
        liveLink: 'https://example.com/weather',
        githubLink: 'https://github.com/joytarafder/weather-app',
        featured: false,
        status: 'published',
        order: 3,
      },
      {
        title: 'Portfolio Website',
        description:
          'A modern portfolio website built with Next.js featuring smooth animations, dark mode, and a contact form with email notifications.',
        techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Nodemailer'],
        liveLink: 'https://joytarafder.dev',
        githubLink: 'https://github.com/joytarafder/portfolio',
        featured: true,
        status: 'published',
        order: 4,
      },
    ]);
    console.log('✅ Projects created');

    // Create experiences
    await Experience.insertMany([
      {
        company: 'Tech Solutions Ltd',
        role: 'Frontend Developer',
        duration: '2023 - Present',
        description:
          'Developing and maintaining modern web applications using React and Next.js. Collaborating with the design team to implement pixel-perfect UI components.',
        techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        order: 1,
      },
      {
        company: 'Digital Agency Co',
        role: 'Junior Web Developer',
        duration: '2022 - 2023',
        description:
          'Built responsive websites and landing pages for various clients. Worked with the team to deliver projects on time and within budget.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
        order: 2,
      },
      {
        company: 'Freelance',
        role: 'Web Developer',
        duration: '2021 - 2022',
        description:
          'Worked as a freelance web developer, building custom websites and web applications for small businesses and startups.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Firebase'],
        order: 3,
      },
    ]);
    console.log('✅ Experiences created');

    // Create skills
    await Skill.insertMany([
      { name: 'React', category: 'frontend', proficiency: 90 },
      { name: 'Next.js', category: 'frontend', proficiency: 85 },
      { name: 'JavaScript', category: 'frontend', proficiency: 90 },
      { name: 'TypeScript', category: 'frontend', proficiency: 80 },
      { name: 'HTML5', category: 'frontend', proficiency: 95 },
      { name: 'CSS3', category: 'frontend', proficiency: 90 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 88 },
      { name: 'Framer Motion', category: 'frontend', proficiency: 75 },
      { name: 'Node.js', category: 'backend', proficiency: 70 },
      { name: 'Express.js', category: 'backend', proficiency: 70 },
      { name: 'MongoDB', category: 'backend', proficiency: 65 },
      { name: 'Git', category: 'tools', proficiency: 85 },
      { name: 'VS Code', category: 'tools', proficiency: 90 },
      { name: 'Figma', category: 'design', proficiency: 75 },
    ]);
    console.log('✅ Skills created');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
