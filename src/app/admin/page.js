'use client';

import { useEffect, useState } from 'react';
import { FiFolder, FiMessageSquare, FiZap, FiBriefcase } from 'react-icons/fi';
import api from '@/lib/api';

function StatsCard({ icon: Icon, label, value, color }) {
  return (
    <div className="p-6 rounded-2xl bg-dark-surface-alt border border-dark-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-dark-text-muted">{label}</p>
          <p className="text-3xl font-bold text-dark-text-primary mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, skills: 0, experiences: 0 });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [projects, messages, skills, experiences] = await Promise.all([
          api.get('/projects'),
          api.get('/contact'),
          api.get('/skills'),
          api.get('/experience'),
        ]);
        setStats({
          projects: projects.data?.data?.length || 0,
          messages: messages.data?.data?.length || 0,
          skills: skills.data?.data?.length || 0,
          experiences: experiences.data?.data?.length || 0,
        });
        setRecentMessages((messages.data?.data || []).slice(0, 5));
      } catch {
        // API may not be running
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-dark-text-primary">Dashboard Overview</h2>
        <p className="text-dark-text-muted text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={FiFolder} label="Projects" value={stats.projects} color="bg-primary/10 text-primary" />
        <StatsCard icon={FiMessageSquare} label="Messages" value={stats.messages} color="bg-green-500/10 text-green-400" />
        <StatsCard icon={FiZap} label="Skills" value={stats.skills} color="bg-amber-500/10 text-amber-400" />
        <StatsCard icon={FiBriefcase} label="Experiences" value={stats.experiences} color="bg-cyan-500/10 text-cyan-400" />
      </div>

      {/* Recent messages */}
      <div className="rounded-2xl bg-dark-surface-alt border border-dark-border">
        <div className="p-5 border-b border-dark-border">
          <h3 className="text-lg font-semibold text-dark-text-primary">Recent Messages</h3>
        </div>
        <div className="divide-y divide-dark-border">
          {recentMessages.length === 0 && (
            <p className="p-5 text-dark-text-muted text-sm">No messages yet.</p>
          )}
          {recentMessages.map((msg) => (
            <div key={msg._id} className="p-5 flex items-start justify-between gap-4 hover:bg-dark-surface-raised/50 transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium text-dark-text-primary truncate">{msg.name}</p>
                <p className="text-xs text-dark-text-muted truncate">{msg.email}</p>
                <p className="text-sm text-dark-text-secondary mt-1 line-clamp-1">{msg.message}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {!msg.read && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
                <span className="text-xs text-dark-text-muted whitespace-nowrap">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
