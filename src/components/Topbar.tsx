import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Wifi, 
  Activity, 
  CheckCircle2,
  ChevronDown,
  User,
  LogOut,
  Sliders
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface TopbarProps {
  onToggleMobileMenu: () => void;
  onOpenNotifications: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  onToggleMobileMenu, 
  onOpenNotifications 
}) => {
  const { 
    user, 
    unreadNotificationsCount, 
    theme, 
    setTheme, 
    demoMode, 
    setDemoMode,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    logout
  } = useFarm();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari data, tanaman, atau fitur..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50/80 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Actions, Badges & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Demo Mode Toggle */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            demoMode
              ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          }`}
          title="Klik untuk beralih mode data simulasi"
        >
          <span className={`w-2 h-2 rounded-full ${demoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span>{demoMode ? 'DEMO DATA' : 'LIVE IOT'}</span>
        </button>

        {/* IoT Online Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600">
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
          <span>ESP32 Ready</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          title="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          title="Ganti Tema"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
        </button>

        {/* Divider */}
        <div className="h-7 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 transition-colors text-left"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/20"
            />
            <div className="hidden sm:block leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{user.role}</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{user.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentPage('pengaturan');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-600 flex items-center gap-2.5"
                >
                  <User className="w-4 h-4" />
                  <span>Profil & Kebun</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('pengaturan');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-600 flex items-center gap-2.5"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Pengaturan Sistem</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Aplikasi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
