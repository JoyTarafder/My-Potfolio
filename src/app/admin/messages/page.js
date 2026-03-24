'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiTrash2, FiMail, FiSearch, FiClock, FiX, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/contact');
      // Sort by newest first
      const sorted = (data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMessages(sorted);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await api.put(`/contact/${msg._id}/read`);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, read: true } : m));
      } catch {}
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      if (selected?._id === id) setSelected(null);
      setMessages(prev => prev.filter(m => m._id !== id));
    } catch { toast.error('Failed to delete message'); }
  };

  const markAllRead = async () => {
    const unreadIds = messages.filter(m => !m.read).map(m => m._id);
    if (unreadIds.length === 0) return;
    
    try {
      await Promise.all(unreadIds.map(id => api.put(`/contact/${id}/read`)));
      toast.success('All messages marked as read');
      setMessages(prev => prev.map(m => ({ ...m, read: true })));
    } catch { toast.error('Failed to update messages'); }
  };

  const unreadCount = messages.filter((m) => !m.read).length;
  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString, full = false) => {
    const d = new Date(dateString);
    if (full) return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0"
      >
        <div>
          <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight flex items-center gap-3">
            Inbox 
            {unreadCount > 0 && (
              <span className="text-xs font-bold bg-[#8E8FFA] text-[#0B0F19] px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(142,143,250,0.5)]">
                {unreadCount} new
              </span>
            )}
          </h2>
          <p className="text-[#9CA3AF] text-sm mt-1 font-[family-name:var(--font-dm-sans)]">Read and respond to incoming queries.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] border border-[#1F2937] text-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#8E8FFA]/50 focus:border-[#8E8FFA] outline-none transition-all placeholder:text-[#4B5563] shadow-sm"
            />
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="p-2.5 rounded-xl bg-[#111827] border border-[#1F2937] text-[#9CA3AF] hover:text-[#8E8FFA] hover:border-[#8E8FFA]/30 transition-all shadow-sm group"
              title="Mark all as read"
            >
              <FiCheckCircle size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Messages List (Left column or full width if no selection on mobile) */}
        <div className={`w-full lg:w-5/12 xl:w-1/3 flex flex-col bg-[#111827] border border-[#1F2937] rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] overflow-hidden ${selected ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#1F2937] bg-[#111827]/50 flex items-center justify-between shrink-0">
            <span className="text-sm font-semibold text-[#E5E7EB]">All Messages</span>
            <span className="text-xs font-semibold text-[#9CA3AF]">{filteredMessages.length} total</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {loading ? (
              <div className="space-y-2 p-2">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-24 rounded-2xl bg-[#1F2937]/50 animate-pulse" />)}
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#9CA3AF] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center mb-3">
                  <FiMail size={24} className="text-[#374151]" />
                </div>
                <p className="font-semibold text-[#E5E7EB] mb-1">No messages found</p>
                <p className="text-sm text-[#9CA3AF]">Your inbox is empty.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <AnimatePresence>
                  {filteredMessages.map((msg, i) => (
                    <motion.div 
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => openMessage(msg)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        selected?._id === msg._id 
                          ? 'bg-gradient-to-r from-[#8E8FFA]/10 to-transparent border-[#8E8FFA]/30 shadow-inner' 
                          : msg.read 
                            ? 'bg-transparent border-transparent hover:bg-[#1F2937]/40 text-[#9CA3AF]' 
                            : 'bg-[#0F172A] border-[#1F2937] hover:border-[#8E8FFA]/30 text-[#E5E7EB] shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0 pr-3">
                          {!msg.read && <div className="w-2 h-2 rounded-full bg-[#8E8FFA] shadow-[0_0_8px_rgba(142,143,250,0.8)] shrink-0" />}
                          <p className={`text-sm truncate ${selected?._id === msg._id ? 'text-[#8E8FFA] font-bold' : msg.read ? 'font-medium' : 'font-bold'}`}>
                            {msg.name}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold whitespace-nowrap shrink-0 opacity-70">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                      <p className={`text-xs truncate mb-1.5 ${msg.read ? 'text-[#6B7280]' : 'text-[#8E8FFA]/80 font-medium'}`}>
                        {msg.subject || 'No Subject'}
                      </p>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${msg.read ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                        {msg.message}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Message Reading Pane (Right column) */}
        <div className={`flex-1 flex flex-col bg-[#111827] border border-[#1F2937] rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] overflow-hidden ${!selected ? 'hidden lg:flex' : 'flex'}`}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-[#9CA3AF] p-8 text-center bg-gradient-to-b from-transparent to-[#0B0F19]/50">
               <div className="w-24 h-24 rounded-[2rem] bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center mb-6 shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8E8FFA]/20 to-transparent opacity-50" />
                  <FiMail size={32} className="text-[#4B5563] relative z-10" />
               </div>
               <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">No Message Selected</h3>
               <p className="text-sm max-w-xs">Select a message from the list to read its contents and reply.</p>
            </div>
          ) : (
            <motion.div 
              key={selected._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full"
            >
              {/* Message Header */}
              <div className="p-6 md:p-8 border-b border-[#1F2937] bg-gradient-to-b from-[#1F2937]/20 to-transparent shrink-0">
                <div className="flex items-start justify-between gap-4 mb-6">
                   <div className="flex items-center gap-4">
                     <button onClick={() => setSelected(null)} className="lg:hidden p-2 -ml-2 rounded-xl text-[#9CA3AF] hover:bg-[#1F2937] transition-colors">
                       <FiX size={20} />
                     </button>
                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F2937] to-[#0B0F19] border border-[#374151] flex items-center justify-center text-xl font-bold text-[#E5E7EB] shadow-inner shrink-0 leading-none pb-1">
                       {selected.name.charAt(0).toUpperCase()}
                     </div>
                     <div>
                       <h3 className="text-lg font-bold text-[#E5E7EB] leading-tight mb-0.5">{selected.name}</h3>
                       <a href={`mailto:${selected.email}`} className="text-sm font-medium text-[#2F8F9D] hover:text-[#8E8FFA] transition-colors">
                         {selected.email}
                       </a>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-2 shrink-0">
                     <button 
                       onClick={(e) => handleDelete(selected._id, e)}
                       className="p-2.5 rounded-xl text-[#9CA3AF] bg-[#0B0F19] border border-[#1F2937] hover:border-red-500/30 hover:text-red-400 transition-all shadow-sm"
                       title="Delete Message"
                     >
                       <FiTrash2 size={16} />
                     </button>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="text-xl font-bold text-[#E5E7EB] pr-4">{selected.subject || 'No Subject'}</h4>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#9CA3AF] bg-[#0B0F19] px-3 py-1.5 rounded-lg border border-[#1F2937] shrink-0">
                    <FiClock size={12} className="text-[#8E8FFA]" /> {formatDate(selected.createdAt, true)}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-base text-[#D1D5DB] leading-relaxed whitespace-pre-wrap font-[family-name:var(--font-dm-sans)]">
                    {selected.message}
                  </p>
                </div>
              </div>

              {/* Message Footer / Reply */}
              <div className="p-6 md:p-8 border-t border-[#1F2937] bg-[#111827]/80 backdrop-blur-md shrink-0">
                <a 
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your Inquiry'}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] text-white font-bold shadow-[0_4px_14px_rgba(47,143,157,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,157,0.33)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FiMail size={18} /> Reply via Email
                </a>
                <p className="text-xs text-[#6B7280] mt-3 text-center sm:text-left">
                  Replies are sent via your default mail client. In a future update, SMTP integration will allow direct replies from this dashboard.
                </p>
              </div>

            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
