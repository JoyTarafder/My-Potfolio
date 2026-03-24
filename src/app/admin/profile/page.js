'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiSave, FiUser, FiCamera, FiLink, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminProfilePage() {
  const [form, setForm] = useState({
    name: '', title: '', bio: '', aboutText: '', email: '', phone: '', location: '', resumeUrl: '', profileImage: '',
    socialLinks: { github: '', linkedin: '', twitter: '', facebook: '', instagram: '', website: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/profile');
        if (data.data) {
          setForm({
            name: data.data.name || '', title: data.data.title || '', bio: data.data.bio || '',
            aboutText: data.data.aboutText || '', email: data.data.email || '',
            phone: data.data.phone || '', location: data.data.location || '',
            resumeUrl: data.data.resumeUrl || '', profileImage: data.data.profileImage || '',
            socialLinks: { ...form.socialLinks, ...data.data.socialLinks },
          });
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/profile/update', form);
      toast.success('Profile updated successfully');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update profile'); }
    finally { setSaving(false); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const toastId = toast.loading('Uploading image...');
      const { data } = await api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((prev) => ({ ...prev, profileImage: data.data.url }));
      toast.success('Image uploaded', { id: toastId });
    } catch { toast.error('Image upload failed'); }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 w-full max-w-4xl pt-6">
      <div className="h-64 rounded-3xl bg-[#111827] border border-[#1F2937] animate-pulse" />
      <div className="h-96 rounded-3xl bg-[#111827] border border-[#1F2937] animate-pulse" />
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl pb-10">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight">Profile Settings</h2>
          <p className="text-[#9CA3AF] text-sm mt-1 font-[family-name:var(--font-dm-sans)]">Manage your personal information and online presence.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white font-semibold shadow-[0_4px_14px_rgba(47,143,157,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,157,0.33)] transition-all shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave size={18} />}
          {saving ? 'Saving...' : 'Save Profile'}
        </motion.button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Quick Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Profile Card */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2F8F9D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0B0F19] bg-[#1F2937] shadow-xl relative group/img">
                {form.profileImage ? (
                  <img src={form.profileImage} alt={form.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#9CA3AF]">
                    <FiUser size={32} className="mb-1 opacity-50" />
                  </div>
                )}
                
                {/* Upload Overlay */}
                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                  <FiCamera size={24} className="text-white mb-2" />
                  <span className="text-xs font-semibold text-white">Change Photo</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#2F8F9D] border-[3px] border-[#111827] flex items-center justify-center z-10 pointer-events-none">
                <FiCamera size={12} className="text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#E5E7EB] mb-1">{form.name || 'Your Name'}</h3>
            <p className="text-sm font-medium text-[#2F8F9D] mb-4">{form.title || 'Your Title'}</p>
            
            <div className="w-full pt-4 border-t border-[#1F2937] flex flex-col gap-3 text-left">
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <FiMail className="shrink-0" /> <span className="truncate">{form.email || 'Email missing'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <FiMapPin className="shrink-0" /> <span className="truncate">{form.location || 'Location missing'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <FiLink className="shrink-0" /> <span className="truncate">{form.socialLinks.website || 'No website'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Details Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* General Information */}
          <div className="p-8 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]">
            <h3 className="text-lg font-bold text-[#E5E7EB] mb-6 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-gradient-to-b from-[#2F8F9D] to-[#8E8FFA]" /> 
              General Information
            </h3>
            
            <form className="space-y-6" id="profileForm" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="e.g. Joy Tarafder" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Professional Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="e.g. Frontend Engineer" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Email Address</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="hello@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="+880 1..." />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="Dhaka, Bangladesh" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Resume URL</label>
                  <input value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Short Bio</label>
                <textarea rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none resize-none transition-all placeholder:text-[#4B5563]" placeholder="A quick one-liner about you..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Detailed About Text</label>
                <textarea rows={6} value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none resize-y transition-all placeholder:text-[#4B5563]" placeholder="Share your story, your engineering philosophy..." />
              </div>
            </form>
          </div>

          {/* Social Links */}
          <div className="p-8 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]">
            <h3 className="text-lg font-bold text-[#E5E7EB] mb-6 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-gradient-to-b from-[#8E8FFA] to-[#2F8F9D]" /> 
              Social Profiles
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {['github', 'linkedin', 'twitter', 'website', 'facebook', 'instagram'].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-semibold text-[#E5E7EB] mb-2 capitalize">{platform}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <FiLink size={16} />
                    </div>
                    <input 
                      value={form.socialLinks[platform]} 
                      onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [platform]: e.target.value } })}
                      placeholder={`https://${platform === 'website' ? 'yourdomain' : platform}.com/...`}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
