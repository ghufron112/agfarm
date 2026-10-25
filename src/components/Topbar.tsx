import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  ChevronDown,
  User,
  LogOut,
  Sliders
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

interface TopbarProps {
  onToggleMobileMenu: () => void;
  onOpenNotifications?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  onToggleMobileMenu
}) => {
  const { 
    user, 
    searchQuery, 
    setSearchQuery, 
    setCurrentPage, 
    sensorData,
    logout 
  } = useFarm();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-transparent px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 select-none">
      {/* Left: Mobile hamburger & Clean Oval Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-2xl bg-white shadow-xs border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Clean Oval Rounded Search Bar */}
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari data, tanaman, atau fitur..."
            className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-full border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Right: Sistem Online & User Profile */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        {/* Sistem Online Status */}
        <div className="flex items-center gap-2 text-left shrink-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="hidden sm:block leading-tight">
            <span className="text-xs font-bold text-slate-800 block">
              Sistem Online
            </span>
            <span className="text-[10px] text-slate-400 font-medium block">
              Terakhir diperbarui {sensorData.last_updated.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* User Profile Avatar & Name */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-white/80 transition-colors cursor-pointer text-left"
          >
            <img
              src="/assets/ali_ghufron_avatar.png"
              onError={(e) => {
                // Fallback to user avatarUrl
                (e.target as HTMLImageElement).src = user.avatarUrl;
              }}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-xs"
            />
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)} 
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                    className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>Profil &amp; Kebun</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('pengaturan');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer"
                  >
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span>Pengaturan Sistem</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
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
