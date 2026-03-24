'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiX, FiLayers, FiCode, FiTool, FiFeather, FiBox } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'frontend', label: 'Frontend & UI', icon: FiLayers, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  { id: 'backend', label: 'Backend & DB', icon: FiCode, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' },
  { id: 'tools', label: 'Tools & DevOps', icon: FiTool, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  { id: 'design', label: 'Design & UX', icon: FiFeather, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
  { id: 'other', label: 'Other', icon: FiBox, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' }
];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', category: 'frontend', proficiency: 80 });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!form.name.trim()) return;
    setIsSubmitting(true);
    try {
      await api.post('/skills', form);
      toast.success('Skill added to your arsenal');
      setForm({ name: '', category: form.category, proficiency: 80 });
      load();
    } catch (err) { 
      toast.error(err.response?.data?.message || 'Failed to add skill'); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await api.delete(`/skills/${id}`);
      toast.success(`Removed ${name}`);
      setSkills(prev => prev.filter(s => s._id !== id)); // Optimistic UI update
    } catch { toast.error('Failed to remove skill'); }
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = skills.filter((s) => s.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight">Technical Skills</h2>
        <p className="text-[#9CA3AF] text-sm mt-1 font-[family-name:var(--font-dm-sans)]">Manage your tech stack, tools, and proficiencies.</p>
      </motion.div>

      {/* Inline Quick-Add Form */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-1 rounded-2xl bg-gradient-to-r from-[#2F8F9D]/20 to-[#8E8FFA]/20 border border-[#2F8F9D]/30 shadow-lg"
      >
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-[#0B0F19]">
          
          <div className="flex-1 w-full relative">
            <input 
              required 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-5 pr-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] font-medium focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]"
              placeholder="e.g. React, Docker, Figma..." 
            />
          </div>

          <div className="w-full sm:w-48 shrink-0">
            <div className="relative">
              <select 
                value={form.category} 
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full pl-4 pr-10 py-3 appearance-none rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] font-medium focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none transition-all cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF]">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-32 shrink-0 relative group">
            <div className="absolute -top-6 left-0 text-[10px] font-bold text-[#2F8F9D] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Level: {form.proficiency}%</div>
            <input 
              type="number" min={0} max={100} 
              value={form.proficiency} 
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] font-medium focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none transition-all text-center" 
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isSubmitting || !form.name.trim()}
            className="w-full sm:w-auto h-[46px] px-6 rounded-xl bg-[#E5E7EB] hover:bg-white text-[#0B0F19] font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <div className="w-4 h-4 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" /> : <FiPlus size={18} />}
            <span className="sm:hidden">Add Skill</span>
          </motion.button>

        </form>
      </motion.div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-8">
          {[1, 2].map(i => (
             <div key={i} className="p-6 rounded-3xl bg-[#111827] border border-[#1F2937]">
                <div className="w-32 h-6 bg-[#1F2937] rounded mb-6 animate-pulse" />
                <div className="flex gap-3 flex-wrap">
                  {[1,2,3,4].map(j => <div key={j} className="w-24 h-10 bg-[#1F2937]/50 rounded-xl animate-pulse" />)}
                </div>
             </div>
          ))}
        </div>
      )}

      {/* Skills Categories Grid */}
      {!loading && (
        <div className="grid lg:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, index) => {
            const items = grouped[cat.id];
            if (items.length === 0) return null;
            
            return (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] flex flex-col"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${cat.bg} border ${cat.border} ${cat.color} shadow-inner`}>
                    <cat.icon size={18} />
                  </div>
                  <div>
                     <h3 className="text-sm font-bold text-[#E5E7EB] tracking-wide">{cat.label}</h3>
                     <p className="text-xs text-[#9CA3AF] mt-0.5">{items.length} skills</p>
                  </div>
                </div>
                
                {/* Tags UI */}
                <div className="flex flex-wrap gap-2.5">
                  <AnimatePresence>
                    {items.map((skill) => (
                      <motion.div 
                        key={skill._id} 
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="group flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-xl bg-[#0F172A] border border-[#1F2937] hover:border-[#2F8F9D]/50 hover:bg-[#111827] transition-all shadow-sm"
                      >
                        <span className="text-sm font-semibold text-[#E5E7EB]">{skill.name}</span>
                        
                        {/* Dot indicator for proficiency */}
                        <div className="flex items-center gap-1 mx-1 opacity-40 group-hover:opacity-100 transition-opacity" title={`Proficiency: ${skill.proficiency}%`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${skill.proficiency >= 30 ? cat.color.replace('text-', 'bg-') : 'bg-[#374151]'}`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${skill.proficiency >= 60 ? cat.color.replace('text-', 'bg-') : 'bg-[#374151]'}`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${skill.proficiency >= 85 ? cat.color.replace('text-', 'bg-') : 'bg-[#374151]'}`} />
                        </div>

                        <button 
                          onClick={() => handleDelete(skill._id, skill.name)}
                          className="p-1 rounded-md text-[#6B7280] hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          title="Remove skill"
                        >
                          <FiX size={14} className="stroke-[3]" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
