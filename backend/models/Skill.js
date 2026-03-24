import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Skill name is required'] },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'tools', 'design', 'other'],
      default: 'frontend',
    },
    icon: { type: String, default: '' },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
