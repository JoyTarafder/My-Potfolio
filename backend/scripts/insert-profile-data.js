import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../models/Profile.js';

dotenv.config();

const updateProfile = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(MONGODB_URI, {
      tlsInsecure: true
    });
    console.log('Connected to MongoDB');

    await Profile.deleteMany({});
    
    await Profile.create({
      name: 'Joy Tarafder',
      title: 'Frontend Developer',
      bio: 'Motivated and detail-oriented Computer Science Engineering graduate with hands-on experience in modern frontend development. Skilled in building responsive, optimized, and user-friendly web interfaces using HTML, CSS, Tailwind, and JavaScript. Seeking an opportunity to contribute to a professional development team while advancing my technical growth.',
      aboutText: 'Integrating design thinking with deep technical knowledge, I build modern web applications that are beautiful, fast, and accessible.',
      profileImage: '',
      resumeUrl: '',
      socialLinks: {
        github: 'https://github.com/JoyTarafder',
        linkedin: 'https://www.linkedin.com/in/joy-tarafder/',
        twitter: ''
      }
    });

    console.log('Profile successfully populated with real CV details!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating profile:', error);
    process.exit(1);
  }
};

updateProfile();
