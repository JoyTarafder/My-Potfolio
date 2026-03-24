'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: '', role: '', duration: '', description: '', techStack: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save experience'); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience record?')) return;
    try {
      await api.delete(`/experience/${id}`);
      toast.success('Experience deleted');
      load();
    } catch { toast.error('Failed to delete'); }
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
          <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight">Experience</h2>
          <p className="text-[#9CA3AF] text-sm mt-1 font-[family-name:var(--font-dm-sans)]">Manage your professional work history timeline.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white font-semibold shadow-[0_4px_14px_rgba(47,143,157,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,157,0.33)] transition-all"
        >
          <FiPlus size={18} /> Add Experience
        </motion.button>
      </motion.div>

      {/* Main Content Area */}
      {loading ? (
        <div className="space-y-6 pt-6 pl-4 border-l-2 border-[#1F2937]/50 ml-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-3xl bg-[#111827] border border-[#1F2937] animate-pulse relative">
              <div className="absolute -left-[27px] top-6 w-5 h-5 rounded-full bg-[#1F2937]" />
            </div>
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 mt-6 rounded-3xl bg-[#111827] border border-[#1F2937] border-dashed"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center mb-4 text-[#374151]">
            <FiBriefcase size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#E5E7EB] mb-2">No experience added</h3>
          <p className="text-[#9CA3AF] text-sm text-center max-w-sm mb-6">
            Build your professional timeline. Add your past roles, achievements, and technical growth.
          </p>
          <button onClick={openNew} className="text-[#2F8F9D] font-semibold hover:text-[#8E8FFA] transition-colors">
            Add your first role &rarr;
          </button>
        </motion.div>
      ) : (
        <div className="relative mt-8 pl-4 sm:pl-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-px bg-gradient-to-b from-[#2F8F9D]/50 via-[#1F2937] to-transparent" />
          
          <div className="space-y-8">
            <AnimatePresence>
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative group pl-8 sm:pl-10"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full bg-[#0B0F19] border-2 border-[#2F8F9D] ring-4 ring-[#0B0F19] group-hover:bg-[#2F8F9D] group-hover:scale-125 transition-all duration-300 z-10" />
                  
                  {/* Card */}
                  <div className="p-6 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:bg-[#1F2937]/30 hover:border-[#374151] transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="text-xl font-bold text-[#E5E7EB]">{exp.role}</h3>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#374151]" />
                        <span className="text-base font-semibold text-[#8E8FFA]">{exp.company}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1.5 p-1.5 px-3 rounded-lg bg-[#0F172A] border border-[#1F2937]">
                          <FiCalendar size={14} className="text-[#2F8F9D]" /> {exp.duration}
                        </span>
                      </div>

                      <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5 font-[family-name:var(--font-dm-sans)]">
                        {exp.description}
                      </p>

                      {exp.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0F172A] border border-[#1F2937] text-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 shrink-0 pt-4 sm:pt-0 border-t border-[#1F2937] sm:border-0 w-full sm:w-auto">
                      <button 
                        onClick={() => openEdit(exp)} 
                        className="flex-1 sm:flex-none p-2.5 flex items-center justify-center rounded-xl text-[#9CA3AF] bg-[#0F172A] border border-[#1F2937] hover:bg-[#2F8F9D]/10 hover:text-[#2F8F9D] hover:border-[#2F8F9D]/30 transition-all group/btn"
                        title="Edit Experience"
                      >
                        <FiEdit2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleDelete(exp._id)} 
                        className="flex-1 sm:flex-none p-2.5 flex items-center justify-center rounded-xl text-[#9CA3AF] bg-[#0F172A] border border-[#1F2937] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all group/btn"
                        title="Delete Experience"
                      >
                        <FiTrash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
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
                     <h3 className="text-xl font-bold text-[#E5E7EB]">{editing ? 'Edit Experience' : 'New Experience'}</h3>
                     <p className="text-sm text-[#9CA3AF] mt-1 font-[family-name:var(--font-dm-sans)]">Fill in your professional experience details.</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-2 rounded-xl text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-colors">
                    <FiX size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                  <form id="expForm" onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Company *</label>
                        <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="Google" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Role *</label>
                        <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="Senior Frontend Engineer" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Duration *</label>
                      <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="Jan 2023 - Present" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Description</label>
                      <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none resize-none transition-all placeholder:text-[#4B5563]" placeholder="Describe your key responsibilities and achievements..." />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Tech Stack Used</label>
                      <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" placeholder="Next.js, TailwindCSS, TypeScript (Comma separated)" />
                    </div>
                  </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#1F2937] bg-[#111827]/50 rounded-b-3xl flex justify-end gap-3">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-all">
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" form="expForm" disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white shadow-[0_4px_14px_rgba(47,143,157,0.39)] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                    ) : (
                      editing ? 'Save Changes' : 'Add Experience'
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
