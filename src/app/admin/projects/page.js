'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiX, FiGithub, FiExternalLink, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', techStack: '', image: '', liveLink: '', githubLink: '', featured: false, status: 'published',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    const payload = { ...form, techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      if (editing) {
        await api.put(`/projects/${editing}`, payload);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created successfully');
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
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
      toast.success(p.featured ? 'Removed from featured' : 'Marked as featured');
    } catch { toast.error('Failed to update status'); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const toastId = toast.loading('Uploading image...');
      const { data } = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, image: data.data.url }));
      toast.success('Image uploaded', { id: toastId });
    } catch {
      toast.error('Image upload failed');
    }
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
          <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight">Projects</h2>
          <p className="text-[#9CA3AF] text-sm mt-1 font-[family-name:var(--font-dm-sans)]">Manage your portfolio projects and case studies.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white font-semibold shadow-[0_4px_14px_rgba(47,143,157,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,157,0.33)] transition-all"
        >
          <FiPlus size={18} /> New Project
        </motion.button>
      </motion.div>

      {/* Main Content Area */}
      {loading ? (
        <div className="space-y-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-3xl bg-[#111827] border border-[#1F2937] animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 mt-6 rounded-3xl bg-[#111827] border border-[#1F2937] border-dashed"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center mb-4 text-[#374151]">
            <FiFolder size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#E5E7EB] mb-2">No projects found</h3>
          <p className="text-[#9CA3AF] text-sm text-center max-w-sm mb-6">
            You haven't added any projects yet. Create your first project to showcase your work to the world.
          </p>
          <button onClick={openNew} className="text-[#2F8F9D] font-semibold hover:text-[#8E8FFA] transition-colors">
            Create your first project &rarr;
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4 mt-6">
          <AnimatePresence>
            {projects.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:bg-[#1F2937]/30 hover:border-[#374151] transition-all group"
              >
                {/* Thumbnail */}
                <div className="shrink-0 w-full sm:w-32 h-40 sm:h-24 rounded-2xl overflow-hidden bg-[#0B0F19] border border-[#1F2937] relative">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#374151]">
                      <FiImage size={24} className="mb-2" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
                    </div>
                  )}
                  {p.featured && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 p-1.5 rounded-lg shadow-lg">
                      <FiStar size={12} className="fill-current" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-[#E5E7EB] truncate">{p.title}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'published' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#9CA3AF] line-clamp-1 mb-3 font-[family-name:var(--font-dm-sans)]">
                    {p.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {(p.techStack || []).slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#0F172A] border border-[#1F2937] text-gray-300">
                        {tech}
                      </span>
                    ))}
                    {(p.techStack?.length > 4) && (
                      <span className="text-xs text-[#9CA3AF] font-medium px-1">+{p.techStack.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-[#1F2937] sm:border-0">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => toggleFeatured(p)}
                      title={p.featured ? "Unfeature" : "Feature"}
                      className={`flex-1 sm:flex-none p-2.5 flex items-center justify-center rounded-xl transition-colors ${
                        p.featured ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' : 'text-[#9CA3AF] bg-[#0F172A] border border-[#1F2937] hover:bg-[#1F2937] hover:text-[#E5E7EB]'
                      }`}
                    >
                      <FiStar size={16} className={p.featured ? 'fill-current' : ''} />
                    </button>
                    <button 
                      onClick={() => openEdit(p)} 
                      title="Edit"
                      className="flex-1 sm:flex-none p-2.5 flex items-center justify-center rounded-xl text-[#9CA3AF] bg-[#0F172A] border border-[#1F2937] hover:bg-[#2F8F9D]/10 hover:text-[#2F8F9D] hover:border-[#2F8F9D]/30 transition-all"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      title="Delete"
                      className="flex-1 sm:flex-none p-2.5 flex items-center justify-center rounded-xl text-[#9CA3AF] bg-[#0F172A] border border-[#1F2937] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Glassmorphism Modal */}
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
                className="w-full max-w-2xl bg-[#111827] border border-[#1F2937] rounded-3xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
                  <div>
                    <h3 className="text-xl font-bold text-[#E5E7EB]">{editing ? 'Edit Project' : 'New Project'}</h3>
                    <p className="text-sm text-[#9CA3AF] font-[family-name:var(--font-dm-sans)] mt-1">Fill in the project details below.</p>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)} 
                    className="p-2 rounded-xl text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                  <form id="projectForm" onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Project Title *</label>
                      <input 
                        required 
                        value={form.title} 
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                        placeholder="e.g. Modern E-Commerce Platform"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Description *</label>
                      <textarea 
                        required 
                        rows={4} 
                        value={form.description} 
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] outline-none resize-none transition-all placeholder:text-[#4B5563]" 
                        placeholder="Describe the problem, solution, and your role..."
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">
                          <span className="flex items-center gap-1.5"><FiExternalLink /> Live Link</span>
                        </label>
                        <input 
                          value={form.liveLink} 
                          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none transition-all placeholder:text-[#4B5563]" 
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">
                          <span className="flex items-center gap-1.5"><FiGithub /> GitHub Link</span>
                        </label>
                        <input 
                          value={form.githubLink} 
                          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none transition-all placeholder:text-[#4B5563]" 
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Tech Stack</label>
                      <input 
                        value={form.techStack} 
                        onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-2 focus:ring-[#2F8F9D]/50 outline-none transition-all placeholder:text-[#4B5563]"
                        placeholder="React, Next.js, Node.js (Comma separated)" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E5E7EB] mb-2">Cover Image</label>
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="relative group w-full sm:w-48 h-32 rounded-xl bg-[#0F172A] border-2 border-dashed border-[#1F2937] hover:border-[#2F8F9D]/50 flex items-center justify-center overflow-hidden transition-colors cursor-pointer">
                          {form.image ? (
                            <>
                              <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                                Change Image
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-[#9CA3AF] group-hover:text-[#2F8F9D] transition-colors">
                              <FiImage size={24} className="mb-2" />
                              <span className="text-xs font-medium">Upload Image</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                           <p className="text-xs text-[#9CA3AF] leading-relaxed">Recommended size: 1200x800px or 16:9 ratio. Max file size: 5MB.</p>
                           <p className="text-xs text-[#9CA3AF] leading-relaxed">Or paste an image URL directly:</p>
                           <input 
                            value={form.image} 
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F172A] border border-[#1F2937] text-[#E5E7EB] focus:ring-1 focus:ring-[#2F8F9D] outline-none transition-all placeholder:text-[#4B5563]" 
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-4 rounded-xl bg-[#0F172A] border border-[#1F2937]">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={form.featured} 
                            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                            className="peersr-only opacity-0 absolute w-full h-full cursor-pointer z-10" 
                          />
                          <div className={`w-10 h-6 rounded-full transition-colors ${form.featured ? 'bg-[#2F8F9D]' : 'bg-[#1F2937]'}`}>
                             <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${form.featured ? 'left-5' : 'left-1'}`} />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[#E5E7EB] flex items-center gap-1.5"><FiStar className={form.featured ? 'text-amber-400 fill-amber-400' : 'text-[#9CA3AF]'} /> Featured Project</span>
                      </label>

                      <div className="w-px h-6 bg-[#1F2937]" />

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#E5E7EB]">Status:</span>
                        <select 
                          value={form.status} 
                          onChange={(e) => setForm({ ...form, status: e.target.value })}
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1F2937] text-[#E5E7EB] text-sm font-medium outline-none focus:border-[#2F8F9D] transition-colors cursor-pointer"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft (Hidden)</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#1F2937] bg-[#111827]/50 rounded-b-3xl flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937] transition-all"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    form="projectForm"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white shadow-[0_4px_14px_rgba(47,143,157,0.39)] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                    ) : (
                      editing ? 'Save Changes' : 'Create Project'
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
