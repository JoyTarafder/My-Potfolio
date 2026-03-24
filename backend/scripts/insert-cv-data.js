import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';

dotenv.config();

const updateData = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(MONGODB_URI, {
      tlsInsecure: true
    });
    console.log('Connected to MongoDB');

    // 1. Clear existing generic data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});

    // 2. Insert Projects
    const projects = [
      {
        title: 'Clothing-Store (E-commerce)',
        description: 'A responsive, modern website for an online clothing store. It features a transparent navbar overlaying a hero image, a light mode theme, and a responsive design for mobile compatibility. Built with a unified design system for an optimal shopping experience.',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        githubLink: 'https://github.com/JoyTarafder',
        liveLink: '',
        featured: true,
        order: 1
      },
      {
        title: 'Expense-Tracker App',
        description: 'A comprehensive and user-friendly software system to organize and manage expenses tracking, offering a reliable solution tailored specifically for tourists visiting Bangladesh.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
        techStack: ['React.js', 'CSS', 'JavaScript'],
        githubLink: 'https://github.com/JoyTarafder',
        liveLink: '',
        featured: true,
        order: 2
      },
      {
        title: 'Travel-Guru',
        description: 'A highly responsive landing page for a modern travel agency. It features sections for exploring travel packages, popular tours, destinations, and deals, showcasing unique benefits and a newsletter signup.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        githubLink: 'https://github.com/JoyTarafder',
        liveLink: '',
        featured: false,
        order: 3
      }
    ];

    await Project.insertMany(projects);
    console.log('Projects created');

    // 3. Insert Experiences
    const experiences = [
      {
        company: 'Digital Flexiload',
        role: 'Engineering Training (Part-Time)',
        duration: 'Jan 2023 – Present',
        description: 'Assisted in daily online mobile recharge operations. Supported promotional offer sales, delivered responsive customer service, and monitored digital service workflows to ensure transaction accuracy and efficiency.',
        techStack: ['Customer Service', 'Operations Management'],
        order: 1
      },
      {
        company: 'Independent University, Bangladesh (IUB)',
        role: 'Lead Monitor, LFE Program — Sreemangal BLC',
        duration: 'Summer 2025',
        description: 'Led academic and logistical operations for 91 students. Supervised and directed the monitor team to ensure smooth execution of activities while maintaining strict safety standards and field communication.',
        techStack: ['Leadership', 'Logistics', 'Team Management'],
        order: 2
      },
      {
        company: 'Independent University, Bangladesh (IUB)',
        role: 'Monitor, LFE Program — Bogura TMSS',
        duration: 'Autumn 2024',
        description: 'Coordinated logistics and provided student support for 114 participants. Ensured safety compliance, conflict resolution, and on-site issue management in collaboration with faculty and local partners.',
        techStack: ['Event Coordination', 'Conflict Resolution'],
        order: 3
      }
    ];

    await Experience.insertMany(experiences);
    console.log('Experiences created');

    // 4. Insert Skills
    const skills = [
      { name: 'JavaScript', category: 'frontend', proficiency: 85, icon: 'JS', order: 1 },
      { name: 'React.js', category: 'frontend', proficiency: 80, icon: '⚛️', order: 2 },
      { name: 'HTML5', category: 'frontend', proficiency: 95, icon: '🌐', order: 3 },
      { name: 'CSS3', category: 'frontend', proficiency: 90, icon: '🎨', order: 4 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, icon: '🌊', order: 5 },
      { name: 'Bootstrap', category: 'frontend', proficiency: 85, icon: '🅱️', order: 6 },
      { name: 'Python', category: 'backend', proficiency: 75, icon: '🐍', order: 7 },
      { name: 'MongoDB', category: 'backend', proficiency: 70, icon: '🍃', order: 8 },
      { name: 'Git & GitHub', category: 'tools', proficiency: 85, icon: '🐙', order: 9 },
      { name: 'Figma', category: 'design', proficiency: 75, icon: '🎨', order: 10 },
      { name: 'VS Code', category: 'tools', proficiency: 90, icon: '💻', order: 11 },
      { name: 'Android Studio', category: 'other', proficiency: 65, icon: '📱', order: 12 },
    ];

    await Skill.insertMany(skills);
    console.log('Skills created');

    console.log('Data successfully populated with real CV details!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating data:', error);
    process.exit(1);
  }
};

updateData();
