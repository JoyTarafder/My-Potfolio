'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const CATEGORIES = ['frontend', 'backend', 'tools', 'design', 'other'];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', category: 'frontend', proficiency: 80 });

  const load = async () => {
    try {
      const { data } = await api.get('/skills');
      setSkills(data.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/skills', form);
      toast.success('Skill added');
      setForm({ name: '', category: 'frontend', proficiency: 80 });
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      toast.success('Skill removed');
      load();
    } catch { toast.error('Failed'); }
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-dark-text-primary">Skills</h2>
        <p className="text-dark-text-muted text-sm mt-1">Manage your skills and technologies</p>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-4 p-5 rounded-2xl bg-dark-surface-alt border border-dark-border">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-dark-text-secondary mb-1">Skill Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            placeholder="React" />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-text-secondary mb-1">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary outline-none transition-all">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-dark-text-secondary mb-1">Level %</label>
          <input type="number" min={0} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-dark-text-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all" />
        </div>
        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">
          <FiPlus size={18} /> Add
        </button>
      </form>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}

      {!loading && CATEGORIES.map((cat) => {
        const items = grouped[cat];
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <h3 className="text-sm font-semibold text-dark-text-muted uppercase tracking-wider mb-3">
              {cat}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((skill) => (
                <div key={skill._id} className="group flex items-center justify-between p-3 rounded-xl bg-dark-surface-alt border border-dark-border hover:border-primary/20 transition-all">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-dark-text-primary truncate">{skill.name}</p>
                    <div className="w-full h-1 rounded-full bg-dark-surface-raised mt-1.5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </div>
                  <button onClick={() => handleDelete(skill._id)}
                    className="ml-2 p-1.5 rounded-lg text-dark-text-muted opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10 transition-all">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
