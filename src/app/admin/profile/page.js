'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiSave } from 'react-icons/fi';

export default function AdminProfilePage() {
  const [form, setForm] = useState({
    name: '', title: '', bio: '', aboutText: '', email: '', phone: '', location: '', resumeUrl: '',
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
            resumeUrl: data.data.resumeUrl || '',
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
      toast.success('Profile updated');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    setSaving(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((prev) => ({ ...prev, profileImage: data.data.url }));
      toast.success('Image uploaded');
    } catch { toast.error('Image upload failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-dark-text-primary">Profile Settings</h2>
        <p className="text-dark-text-muted text-sm mt-1">Update your portfolio information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="p-5 rounded-2xl bg-dark-surface-alt border border-dark-border">
          <label className="block text-sm font-medium text-dark-text-secondary mb-3">Profile Image</label>
          <div className="flex items-center gap-4">
            {form.profileImage ? (
              <img src={form.profileImage} alt="" className="w-20 h-20 rounded-xl object-cover border border-dark-border" />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">👤</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload}
              className="text-sm text-dark-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium file:cursor-pointer" />
          </div>
        </div>

        {/* Basic Info */}
        <div className="p-5 rounded-2xl bg-dark-surface-alt border border-dark-border space-y-4">
          <h3 className="text-sm font-semibold text-dark-text-muted uppercase tracking-wider">Basic Info</h3>
          {[
            { name: 'name', label: 'Full Name' },
            { name: 'title', label: 'Title', placeholder: 'Frontend Developer' },
            { name: 'email', label: 'Email' },
            { name: 'phone', label: 'Phone' },
            { name: 'location', label: 'Location' },
            { name: 'resumeUrl', label: 'Resume URL' },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
              <input value={form[name] || ''} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-dark-text-secondary mb-1">Bio (short)</label>
            <textarea rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-text-secondary mb-1">About Text (detailed)</label>
            <textarea rows={4} value={form.aboutText} onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all" />
          </div>
        </div>

        {/* Social Links */}
        <div className="p-5 rounded-2xl bg-dark-surface-alt border border-dark-border space-y-4">
          <h3 className="text-sm font-semibold text-dark-text-muted uppercase tracking-wider">Social Links</h3>
          {Object.keys(form.socialLinks).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-dark-text-secondary mb-1 capitalize">{key}</label>
              <input value={form.socialLinks[key]} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [key]: e.target.value } })}
                placeholder={`https://${key}.com/username`}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" />
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all disabled:opacity-60">
          {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave size={18} />}
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
