import React, { useState } from 'react';
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

import { WatermelonBackground } from '../components/WatermelonBackground';

export const LoginPage: React.FC = () => {
  const { login } = useFarm();
  const [email, setEmail] = useState('alighufron.agritech@gmail.com');
  const [password, setPassword] = useState('semangka2026');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden bg-[#FAFDFB] dark:bg-[#0A1120] transition-colors duration-300">
      {/* Subtle Background Layer */}
      <WatermelonBackground />

      {/* Left Column: Visual Agri Garden with Watermelon Theme */}
      <div className="lg:w-1/2 relative min-h-auto lg:min-h-screen bg-gradient-to-br from-[#064E3B] via-[#043527] to-[#011F17] p-5 sm:p-8 lg:p-14 flex flex-col justify-between overflow-hidden text-white z-10 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-gradient-to-br from-lime-400 via-emerald-400 to-emerald-600 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-emerald-950/40 shrink-0">
            🍃
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight">AG Farm</span>
            <p className="text-[11px] sm:text-xs text-emerald-300 font-medium">Smart Irrigation</p>
          </div>
        </div>

        {/* Center: Hero Watermelon Illustration & Tagline */}
        <div className="relative z-10 my-4 sm:my-8 space-y-4 sm:space-y-6 max-w-lg">
          <div className="hidden sm:block relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 group">
            <img
              src="/assets/watermelon_hero.jpg"
              alt="Kebun Semangka AG Farm"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
              <span className="text-xs font-bold text-emerald-200 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
                🌱 Kebun Semangka Desa Batuampar, Guluk-Guluk, Sumenep
              </span>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              "Smart Irrigation for Better Farming"
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Kelola kebun semangka lebih cerdas dengan IoT ESP32, Fuzzy Logic cerdas, dan prediksi cuaca presisi tinggi.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs">
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="text-emerald-300 font-extrabold text-base sm:text-lg block">37.4%</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-100">Hemat Air</span>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="text-emerald-300 font-extrabold text-base sm:text-lg block">27 Rules</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-100">Fuzzy Mamdani</span>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="text-emerald-300 font-extrabold text-base sm:text-lg block">Real-time</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-100">ESP32 IoT</span>
            </div>
          </div>
        </div>

        {/* Bottom footer credit */}
        <div className="hidden lg:block relative z-10 text-[11px] text-emerald-300/70">
          © 2026 AG Farm • Ali Ghufron Skripsi Research Project
        </div>
      </div>

      {/* Right Column: Login Card & Melo Mascot */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md space-y-4 sm:space-y-6 rounded-[28px] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-slate-100/90 p-6 sm:p-10">
          {/* Melo mascot greeting banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3.5 shadow-xs">
            <img
              src="/assets/melo_mascot.jpg"
              alt="Melo Mascot"
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-400 shrink-0"
            />
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1">
                Halo dari Melo! 🍉
              </span>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Selamat datang kembali di AG Farm! Masuk untuk memantau kelembapan tanah semangka Anda.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Masuk ke Akun Anda</h2>
            <p className="text-xs text-slate-400">Gunakan akun terdaftar pemilik kebun atau peneliti</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-[#F7FAF7] text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Kata Sandi</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-emerald-800 hover:underline">
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-[#F7FAF7] text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Ingat Saya</span>
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Demo Auth Ready
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-[#135A3E] hover:bg-[#0E4931] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#135A3E]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memuat Dashboard...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard AG Farm</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            Belum punya akun kebun?{' '}
            <button
              onClick={() => login('alighufron.agritech@gmail.com', 'demo')}
              className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Daftar / Coba Akun Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
