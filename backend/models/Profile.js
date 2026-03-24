import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: 'Joy Tarafder' },
    title: { type: String, default: 'Frontend Developer' },
    bio: { type: String, default: '' },
    aboutText: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
