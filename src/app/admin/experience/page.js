'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: '', role: '', duration: '', description: '', techStack: '' });

  const load = async () => {
    try {
      const { data } = await api.get('/experience');
      setExperiences(data.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ company: '', role: '', duration: '', description: '', techStack: '' });
    setShowModal(true);
  };

  const openEdit = (exp) => {
    setEditing(exp._id);
    setForm({
      company: exp.company, role: exp.role, duration: exp.duration,
      description: exp.description || '', techStack: (exp.techStack || []).join(', '),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editing) {
        await api.put(`/experience/${editing}`, payload);
        toast.success('Experience updated');
      } else {
        await api.post('/experience', payload);
        toast.success('Experience created');
      }
      setShowModal(false);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/experience/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark-text-primary">Experience</h2>
          <p className="text-dark-text-muted text-sm mt-1">Manage your work experience</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">
          <FiPlus size={18} /> Add Experience
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}

      {!loading && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id} className="p-5 rounded-2xl bg-dark-surface-alt border border-dark-border hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-dark-text-primary">{exp.role}</h3>
                  <p className="text-sm text-primary font-medium">{exp.company}</p>
                  <span className="inline-block text-xs text-dark-text-muted mt-1 px-2 py-0.5 rounded bg-dark-surface-raised">{exp.duration}</span>
                  <p className="text-sm text-dark-text-secondary mt-3">{exp.description}</p>
                  {exp.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.techStack.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <button onClick={() => openEdit(exp)} className="p-2 rounded-lg text-dark-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(exp._id)} className="p-2 rounded-lg text-dark-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && <p className="p-10 text-center text-dark-text-muted text-sm">No experience entries yet</p>}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-dark-surface border border-dark-border shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text-primary">{editing ? 'Edit' : 'Add'} Experience</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-dark-text-muted hover:text-dark-text-primary hover:bg-dark-surface-alt transition-colors"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {[
                { name: 'company', label: 'Company', required: true },
                { name: 'role', label: 'Role', required: true },
                { name: 'duration', label: 'Duration', placeholder: '2023 - Present' },
              ].map(({ name, label, placeholder, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-1">{label}</label>
                  <input required={required} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Tech Stack (comma-separated)</label>
                <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="React, Node.js" />
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
