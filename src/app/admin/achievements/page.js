'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', organization: '', date: '', description: '', order: 0 });

  const load = async () => {
    try {
      const { data } = await api.get('/achievements');
      setAchievements(data.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', organization: '', date: '', description: '', order: achievements.length + 1 });
    setShowModal(true);
  };

  const openEdit = (ach) => {
    setEditing(ach._id);
    setForm({
      title: ach.title,
      organization: ach.organization,
      date: ach.date,
      description: ach.description || '',
      order: ach.order || 0
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    try {
      if (editing) {
        await api.put(`/achievements/${editing}`, payload);
        toast.success('Achievement updated');
      } else {
        await api.post('/achievements', payload);
        toast.success('Achievement created');
      }
      setShowModal(false);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await api.delete(`/achievements/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark-text-primary">Achievements</h2>
          <p className="text-dark-text-muted text-sm mt-1">Manage your awards and honors</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">
          <FiPlus size={18} /> Add Achievement
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}

      {!loading && (
        <div className="space-y-4">
          {achievements.map((ach) => (
            <div key={ach._id} className="p-5 rounded-2xl bg-dark-surface-alt border border-dark-border hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-dark-text-primary">{ach.title}</h3>
                  <p className="text-sm text-primary font-medium">{ach.organization}</p>
                  <span className="inline-block text-xs text-dark-text-muted mt-1 px-2 py-0.5 rounded bg-dark-surface-raised">{ach.date}</span>
                  {ach.description && <p className="text-sm text-dark-text-secondary mt-3">{ach.description}</p>}
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <button onClick={() => openEdit(ach)} className="p-2 rounded-lg text-dark-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(ach._id)} className="p-2 rounded-lg text-dark-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {achievements.length === 0 && <p className="p-10 text-center text-dark-text-muted text-sm">No achievement entries yet</p>}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-dark-surface border border-dark-border shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text-primary">{editing ? 'Edit' : 'Add'} Achievement</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-dark-text-muted hover:text-dark-text-primary hover:bg-dark-surface-alt transition-colors"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {[
                { name: 'title', label: 'Award Title', required: true, placeholder: 'Best Monitor Award' },
                { name: 'organization', label: 'Organization/Event', required: true, placeholder: 'Independent University' },
                { name: 'date', label: 'Date/Term', required: true, placeholder: 'Autumn 2024' },
              ].map(({ name, label, placeholder, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
                  <input required={required} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Description (Optional)</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Display Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-dark-border text-dark-text-secondary hover:bg-dark-surface-alt transition-all">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
