'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#0B0F19] font-[family-name:var(--font-poppins)] transition-colors duration-300">
      
      {/* Left Pane - Branding & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-[#0B0F19] border-r border-[#1F2937]/50">
        
        {/* Soft Blobs Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2F8F9D]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#8E8FFA]/10 rounded-full blur-[120px]" />
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2F8F9D] to-[#8E8FFA] flex items-center justify-center text-white text-sm">
              J
            </div>
            Joy<span className="text-[#2F8F9D]">.</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold text-[#E5E7EB] leading-[1.1] tracking-tight mb-4"
          >
            Manage your portfolio with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA]">ease.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 font-[family-name:var(--font-dm-sans)]"
          >
            Access your secure dashboard to update projects, track experiences, and oversee messages in real-time.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-gray-500">
          <span>&copy; {new Date().getFullYear()} Joy Tarafder</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>Admin Portal</span>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        
        {/* Mobile Background Blobs */}
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#2F8F9D]/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8E8FFA]/10 rounded-full blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[400px] relative z-10"
        >
          {/* Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937]/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
            
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-[#E5E7EB] mb-2">Welcome back</h1>
              <p className="text-base text-[#9CA3AF] font-[family-name:var(--font-dm-sans)]">
                Login to your admin dashboard
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-red-900/20 text-red-400 border border-red-900/30 text-sm">
                    <FiAlertCircle className="shrink-0 mt-0.5" size={16} />
                    <p>{errorMsg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-[#E5E7EB]">
                  Email Address
                </label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#2F8F9D] transition-colors" size={18} />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-[#1F2937]
                               text-[#E5E7EB] placeholder:text-[#4B5563]
                               transition-all duration-300 ease-out
                               focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] focus:shadow-[0_0_15px_rgba(47,143,157,0.15)]"
                    placeholder="admin@joytarafder.dev"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-[#E5E7EB]">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#2F8F9D] hover:text-[#8E8FFA] transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#2F8F9D] transition-colors" size={18} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-[#0B0F19] border border-[#1F2937]
                               text-[#E5E7EB] placeholder:text-[#4B5563]
                               transition-all duration-300 ease-out
                               focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/50 focus:border-[#2F8F9D] focus:shadow-[0_0_15px_rgba(47,143,157,0.15)]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2F8F9D] to-[#8E8FFA] 
                             text-white font-semibold text-base
                             shadow-[0_4px_14px_rgba(47,143,157,0.39)] hover:shadow-[0_6px_20px_rgba(47,143,157,0.33)]
                             transition-all duration-300
                             disabled:opacity-70 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
