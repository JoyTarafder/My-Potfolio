import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an achievement title'],
    trim: true,
  },
  organization: {
    type: String,
    required: [true, 'Please provide the organization name'],
    trim: true,
  },
  date: {
    type: String, // e.g., 'Autumn 2024'
    required: [true, 'Please provide a date or time period'],
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
