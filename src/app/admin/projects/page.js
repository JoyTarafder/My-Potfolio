'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiX } from 'react-icons/fi';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', techStack: '', image: '', liveLink: '', githubLink: '', featured: false, status: 'published',
  });

  const load = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', description: '', techStack: '', image: '', liveLink: '', githubLink: '', featured: false, status: 'published' });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      title: p.title, description: p.description, techStack: (p.techStack || []).join(', '),
      image: p.image || '', liveLink: p.liveLink || '', githubLink: p.githubLink || '',
      featured: p.featured, status: p.status || 'published',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editing) {
        await api.put(`/projects/${editing}`, payload);
        toast.success('Project updated');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created');
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      load();
    } catch { toast.error('Failed to delete'); }
  };

  const toggleFeatured = async (p) => {
    try {
      await api.put(`/projects/${p._id}`, { featured: !p.featured });
      load();
    } catch { toast.error('Failed'); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, image: data.data.url }));
      toast.success('Image uploaded');
    } catch {
      toast.error('Image upload failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark-text-primary">Projects</h2>
          <p className="text-dark-text-muted text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">
          <FiPlus size={18} /> Add Project
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}

      {!loading && (
        <div className="rounded-2xl bg-dark-surface-alt border border-dark-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border text-left">
                <th className="px-5 py-4 text-xs font-semibold text-dark-text-muted uppercase tracking-wider">Project</th>
                <th className="px-5 py-4 text-xs font-semibold text-dark-text-muted uppercase tracking-wider hidden md:table-cell">Tech Stack</th>
                <th className="px-5 py-4 text-xs font-semibold text-dark-text-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-4 text-xs font-semibold text-dark-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-dark-surface-raised/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">📁</div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-dark-text-primary">{p.title}</p>
                        <p className="text-xs text-dark-text-muted truncate max-w-[200px]">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(p.techStack || []).slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-dark-surface-raised text-dark-text-muted">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      p.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleFeatured(p)} title="Toggle Featured"
                        className={`p-2 rounded-lg transition-colors ${p.featured ? 'text-amber-400 bg-amber-400/10' : 'text-dark-text-muted hover:text-amber-400 hover:bg-amber-400/10'}`}>
                        <FiStar size={16} />
                      </button>
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-dark-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg text-dark-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && <p className="p-10 text-center text-dark-text-muted text-sm">No projects yet</p>}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-dark-surface border border-dark-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text-primary">{editing ? 'Edit' : 'Add'} Project</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-dark-text-muted hover:text-dark-text-primary hover:bg-dark-surface-alt transition-colors">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Tech Stack (comma-separated)</label>
                <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="React, Next.js, Tailwind" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-1">Live Link</label>
                  <input value={form.liveLink} onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-1">GitHub Link</label>
                  <input value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-surface-alt border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-1">Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload}
                  className="w-full text-sm text-dark-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium file:cursor-pointer" />
                {form.image && <img src={form.image} alt="Preview" className="mt-2 h-24 rounded-lg object-cover" />}
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-border text-primary focus:ring-primary" />
                  <span className="text-sm text-dark-text-secondary">Featured</span>
                </label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-dark-surface-alt border border-dark-border text-dark-text-primary text-sm outline-none">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-dark-border text-dark-text-secondary hover:bg-dark-surface-alt transition-all">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
