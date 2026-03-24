'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', organization: '', date: '', description: '', order: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/achievements');
      // Sort by order initially
      const sorted = (data.data || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setAchievements(sorted);
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
    setIsSubmitting(true);
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
    } catch (err) { 
       toast.error(err.response?.data?.message || 'Failed to save achievement'); 
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you certain you want to delete this achievement?')) return;
    try {
      await api.delete(`/achievements/${id}`);
      toast.success('Achievement removed');
      load();
    } catch { toast.error('Failed to delete achievement'); }
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight">Achievements</h2>
          <p className="text-[#9CA3AF] text-sm mt-1 font-[family-name:var(--font-dm-sans)]">Manage your awards, certifications, and honors.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white font-semibold shadow-[0_4px_14px_rgba(47,143,157,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,157,0.33)] transition-all shrink-0"
        >
          <FiPlus size={18} /> Add Achievement
        </motion.button>
      </motion.div>

      {/* Main Content Area */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-6 pt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-3xl bg-[#111827] border border-[#1F2937] animate-pulse" />
          ))}
        </div>
      ) : achievements.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 mt-6 rounded-3xl bg-[#111827] border border-[#1F2937] border-dashed"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center mb-4 text-[#374151]">
            <FiAward size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#E5E7EB] mb-2">No achievements found</h3>
          <p className="text-[#9CA3AF] text-sm text-center max-w-sm mb-6">
            Showcase your accomplishments, competition wins, or certifications to stand out.
          </p>
          <button onClick={openNew} className="text-[#8E8FFA] font-semibold hover:text-[#E5E7EB] transition-colors">
            Add your first achievement &rarr;
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <AnimatePresence>
            {achievements.map((ach, i) => (
              <motion.div
                key={ach._id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative p-6 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:bg-[#1F2937]/30 hover:border-[#374151] transition-all overflow-hidden flex flex-col h-full"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8E8FFA]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#0B0F19] border border-[#1F2937] text-[#8E8FFA] shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FiAward size={24} className="stroke-[1.5]" />
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openEdit(ach)} 
                      className="p-2 rounded-xl text-[#9CA3AF] bg-[#0B0F19] border border-[#1F2937] hover:border-[#2F8F9D]/50 hover:text-[#2F8F9D] transition-all"
                      title="Edit Achievement"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(ach._id)} 
                      className="p-2 rounded-xl text-[#9CA3AF] bg-[#0B0F19] border border-[#1F2937] hover:border-red-500/50 hover:text-red-400 transition-all"
                      title="Delete Achievement"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-2 leading-tight pr-4">{ach.title}</h3>
                  <p className="text-sm text-[#2F8F9D] font-medium mb-4">{ach.organization}</p>
                  
                  {ach.description && (
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6 font-[family-name:var(--font-dm-sans)] line-clamp-3">
                      {ach.description}
                    </p>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-[#1F2937] flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9CA3AF] bg-[#0B0F19] px-2.5 py-1.5 rounded-lg border border-[#1F2937]">
                     <FiCalendar size={12} className="text-[#8E8FFA]" /> {ach.date}
                   </div>
                   
                   <div className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest">
                     Order: {ach.order || 0}
                   </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Glassmorphism Modal Form */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="w-full max-w-lg bg-[#111827] border border-[#1F2937] rounded-3xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
                  <div>
                     <h3 className="text-xl font-bold text-[#E5E7EB]">{editing ? 'Edit Achievement' : 'New Achievement'}</h3>
                     <p className="text-sm text-[#9CA3AF] mt-1 font-[family-name:var(--font-dm-sans)]">Fill in your award or honor details.</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-2 rounded-xl text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-colors">
                    <FiX size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                  <form id="achForm" onSubmit={handleSubmit} className="space-y-5">
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Award Title *</label>
                      <input 
                        required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                        placeholder="e.g. 1st Place Hackathon" 
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Organization *</label>
                        <input 
                          required value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                          placeholder="Event or Institution name" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Date / Term *</label>
                        <input 
                          required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                          placeholder="e.g. Autumn 2024" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Description (Optional)</label>
                      <textarea 
                        rows={3} 
                        value={form.description} 
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none resize-none transition-all placeholder:text-[#4B5563]" 
                        placeholder="Describe what you achieved..." 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Display Order (Optional)</label>
                      <input 
                        type="number" 
                        value={form.order} 
                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                      />
                    </div>

                  </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#1F2937] bg-[#111827]/50 rounded-b-3xl flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-all">
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" form="achForm" disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white shadow-[0_4px_14px_rgba(47,143,157,0.39)] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                    ) : (
                      editing ? 'Save Changes' : 'Add Achievement'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
