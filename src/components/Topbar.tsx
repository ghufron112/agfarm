import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Wifi, 
  ChevronDown,
  User,
  LogOut,
  Sliders,
  Sun,
  Moon
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
    demoMode, 
    setDemoMode,
    theme,
    setTheme,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    logout
  } = useFarm();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
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
            placeholder="Cari kelembapan, cuaca, log irigasi..."
            className="w-full pl-10 pr-12 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:focus:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 rounded-md shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Badges, Theme Toggle, Notifications, & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Demo Mode Badge */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
            demoMode
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
          }`}
          title="Klik untuk beralih antara Mode Demo dan Live IoT"
        >
          <span className={`w-2 h-2 rounded-full ${demoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-[11px] font-extrabold">{demoMode ? 'DEMO DATA' : 'LIVE IOT'}</span>
        </button>

        {/* ESP32 Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
          <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>ESP32 Ready</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          title="Notifikasi Sistem"
          aria-label="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Theme Toggle (Mode Terang / Gelap) */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-amber-400 transition-colors"
          title={theme === 'light' ? 'Aktifkan Mode Gelap' : 'Aktifkan Mode Terang'}
          aria-label="Toggle Dark/Light Theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-slate-600 hover:text-emerald-600 transition-colors" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400 transition-colors hover:rotate-45" />
          )}
        </button>

        {/* Divider */}
        <div className="h-7 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/20"
            />
            <div className="hidden md:block leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">{user.farmName}</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              {/* Click-outside backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)} 
              />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentPage('pengaturan');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Profil &amp; Kebun</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('pengaturan');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-2.5"
                >
                  <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Pengaturan Sistem</span>
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Aplikasi</span>
                </button>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
