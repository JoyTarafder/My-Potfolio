import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Achievement from '../models/Achievement.js';

dotenv.config();

const seedAchievements = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(MONGODB_URI, {
      tlsInsecure: true
    });
    console.log('Connected to MongoDB');

    await Achievement.deleteMany({});
    
    await Achievement.insertMany([
      {
        title: 'Best Monitor Award, LFE Program',
        organization: 'Independent University, Bangladesh',
        date: 'Autumn 2024',
        order: 1
      },
      {
        title: 'Best Monitor Award, LFE Program (Second Time)',
        organization: 'Independent University, Bangladesh',
        date: 'Summer 2025',
        order: 2
      },
      {
        title: 'Tech Fest 2nd Runner-Up, DBMS Project Showcase',
        organization: 'Independent University, Bangladesh',
        date: 'Autumn 2023',
        order: 3
      }
    ]);

    console.log('Achievements successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding achievements:', error);
    process.exit(1);
  }
};

seedAchievements();
