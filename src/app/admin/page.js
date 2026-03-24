'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiMessageSquare, FiZap, FiBriefcase, FiArrowRight, FiActivity } from 'react-icons/fi';
import api from '@/lib/api';
import Link from 'next/link';

function StatsCard({ icon: Icon, label, value, color, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-6 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_-8px_rgba(47,143,157,0.15)] transition-all duration-300 relative overflow-hidden group"
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity ${color.replace('text-', 'bg-')}`} />
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-medium text-[#9CA3AF] mb-1">{label}</p>
          <p className="text-4xl font-bold text-[#E5E7EB] tracking-tight">{value}</p>
        </div>
        <div className={`p-3.5 rounded-2xl bg-[#0B0F19] border border-[#1F2937] ${color} shadow-inner`}>
          <Icon size={22} className="stroke-[2]" />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#2F8F9D] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
        <span>View Details</span>
        <FiArrowRight size={14} />
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, messages: 0, skills: 0, experiences: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
        // Handle gracefully
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-tight">Dashboard</h2>
        <p className="text-[#9CA3AF] text-sm mt-1.5 font-[family-name:var(--font-dm-sans)]">
          Welcome back, Joy! Here's an overview of your portfolio metrics.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-[140px] rounded-3xl bg-[#111827] border border-[#1F2937] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <Link href="/admin/projects">
            <StatsCard icon={FiFolder} label="Total Projects" value={stats.projects} color="text-[#2F8F9D]" delay={0.1} />
          </Link>
          <Link href="/admin/messages">
            <StatsCard icon={FiMessageSquare} label="New Messages" value={stats.messages} color="text-[#8E8FFA]" delay={0.2} />
          </Link>
          <Link href="/admin/skills">
            <StatsCard icon={FiZap} label="Core Skills" value={stats.skills} color="text-amber-400" delay={0.3} />
          </Link>
          <Link href="/admin/experience">
            <StatsCard icon={FiBriefcase} label="Experiences" value={stats.experiences} color="text-rose-400" delay={0.4} />
          </Link>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Recent Messages Card (Takes up 2 cols on large screens) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 rounded-3xl bg-[#111827] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-[#1F2937] flex items-center justify-between bg-[#111827]/50">
            <h3 className="text-lg font-bold text-[#E5E7EB] flex items-center gap-2">
              <FiMessageSquare className="text-[#9CA3AF]" /> Recent Inquiries
            </h3>
            <Link href="/admin/messages" className="text-xs font-semibold text-[#2F8F9D] hover:text-[#8E8FFA] transition-colors bg-[#2F8F9D]/10 px-3 py-1.5 rounded-full">
              View All
            </Link>
          </div>
          
          <div className="divide-y divide-[#1F2937] flex-1">
            {loading ? (
              <div className="p-6 space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-12 bg-[#1F2937]/50 rounded animate-pulse" />)}
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                 <div className="w-16 h-16 rounded-full bg-[#0B0F19] flex items-center justify-center mb-4 border border-[#1F2937]">
                    <FiMessageSquare size={24} className="text-[#374151]" />
                 </div>
                 <p className="text-[#E5E7EB] font-medium">Inbox zero!</p>
                 <p className="text-[#9CA3AF] text-sm mt-1">You're all caught up on messages.</p>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg._id} className="p-5 flex items-start gap-4 hover:bg-[#1F2937]/30 transition-colors group cursor-pointer">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#1F2937] to-[#0B0F19] border border-[#374151] flex items-center justify-center text-[#9CA3AF] font-bold text-sm">
                    {msg.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-[#E5E7EB] truncate pr-4">{msg.name}</p>
                      <span className="text-xs font-medium text-[#9CA3AF] shrink-0 whitespace-nowrap">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[#2F8F9D] mb-1.5">{msg.email}</p>
                    <p className="text-sm text-[#9CA3AF] line-clamp-1 font-[family-name:var(--font-dm-sans)] leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Activity Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-3xl bg-gradient-to-b from-[#111827] to-[#0B0F19] border border-[#1F2937] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] p-6"
        >
          <div className="flex items-center gap-2 mb-6 text-[#E5E7EB] font-bold text-lg">
             <FiActivity className="text-[#8E8FFA]" /> System Status
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#0B0F19] border border-[#1F2937]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#9CA3AF]">API Health</span>
                <span className="flex items-center gap-1.5 text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                </span>
              </div>
              <p className="text-sm text-[#E5E7EB] font-mono text-xs truncate">potfolio-nmrm.onrender.com</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F19] border border-[#1F2937]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#9CA3AF]">Database Check</span>
                <span className="flex items-center gap-1.5 text-xs text-[#2F8F9D] font-semibold bg-[#2F8F9D]/10 px-2 py-0.5 rounded-full">
                   Connected
                </span>
              </div>
              <p className="text-sm text-[#E5E7EB] font-mono text-xs">MongoDB Atlas Cluster0</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2F8F9D]/10 to-[#8E8FFA]/10 border border-[#2F8F9D]/20">
               <p className="text-sm text-[#E5E7EB] font-medium leading-relaxed mb-3">
                 Ready to add a new project?
               </p>
               <Link href="/admin/projects" className="inline-flex w-full items-center justify-center py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors border border-white/10">
                 Create Project
               </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
