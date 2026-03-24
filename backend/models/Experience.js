import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: [true, 'Company is required'] },
    role: { type: String, required: [true, 'Role is required'] },
    duration: { type: String, required: [true, 'Duration is required'] },
    description: { type: String, default: '' },
    techStack: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
