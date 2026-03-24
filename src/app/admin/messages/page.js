'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FiTrash2, FiMail, FiEye, FiX } from 'react-icons/fi';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get('/contact');
      setMessages(data.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await api.put(`/contact/${msg._id}/read`);
        load();
      } catch {}
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      setSelected(null);
      load();
    } catch { toast.error('Failed'); }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark-text-primary">Messages</h2>
          <p className="text-dark-text-muted text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}

      {!loading && (
        <div className="rounded-2xl bg-dark-surface-alt border border-dark-border overflow-hidden">
          <div className="divide-y divide-dark-border">
            {messages.length === 0 && <p className="p-10 text-center text-dark-text-muted text-sm">No messages yet</p>}
            {messages.map((msg) => (
              <div key={msg._id}
                onClick={() => openMessage(msg)}
                className={`p-5 cursor-pointer hover:bg-dark-surface-raised/50 transition-colors flex items-start justify-between gap-4 ${!msg.read ? 'bg-primary/5' : ''}`}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    <p className={`text-sm truncate ${!msg.read ? 'font-semibold text-dark-text-primary' : 'text-dark-text-secondary'}`}>{msg.name}</p>
                    <span className="text-xs text-dark-text-muted">&lt;{msg.email}&gt;</span>
                  </div>
                  {msg.subject && <p className="text-sm text-dark-text-primary truncate">{msg.subject}</p>}
                  <p className="text-sm text-dark-text-muted truncate mt-0.5">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-dark-text-muted whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                    className="p-2 rounded-lg text-dark-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-dark-surface border border-dark-border shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-dark-border">
              <div className="flex items-center gap-2">
                <FiMail className="text-primary" size={18} />
                <h3 className="text-lg font-semibold text-dark-text-primary">Message</h3>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-dark-text-muted hover:text-dark-text-primary hover:bg-dark-surface-alt transition-colors">
                <FiX size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-dark-text-muted">From</p>
                  <p className="text-sm font-medium text-dark-text-primary">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-text-muted">Email</p>
                  <p className="text-sm text-primary">{selected.email}</p>
                </div>
              </div>
              {selected.subject && (
                <div>
                  <p className="text-xs text-dark-text-muted">Subject</p>
                  <p className="text-sm font-medium text-dark-text-primary">{selected.subject}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-dark-text-muted mb-1">Message</p>
                <p className="text-sm text-dark-text-secondary leading-relaxed whitespace-pre-wrap p-4 rounded-xl bg-dark-surface-alt border border-dark-border">
                  {selected.message}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-dark-text-muted">
                  {new Date(selected.createdAt).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <a href={`mailto:${selected.email}`}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-all">
                    Reply
                  </a>
                  <button onClick={() => { handleDelete(selected._id); }}
                    className="px-4 py-2 rounded-xl border border-red-400/30 text-red-400 text-sm font-medium hover:bg-red-400/10 transition-all">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
