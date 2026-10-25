import React from 'react';
import { 
  LayoutDashboard, 
  Droplets, 
  CloudSun, 
  BarChart3, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Wifi,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { NavPage } from '../types';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { currentPage, setCurrentPage, isPumpActive } = useFarm();

  // Exactly the 6 requested menu items (Section 4)
  const menuItems: { id: NavPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'irigasi', label: 'Irigasi', icon: Droplets },
    { id: 'cuaca', label: 'Cuaca', icon: CloudSun },
    { id: 'analitik', label: 'Analitik', icon: BarChart3 },
    { id: 'riwayat', label: 'Riwayat', icon: History },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen z-50 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 shadow-[2px_0_20px_-4px_rgba(6,78,59,0.04)] ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 shrink-0 ring-2 ring-emerald-500/20">
              <span className="text-xl">🍉</span>
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-slate-100">AG Farm</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                    IoT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">
                  Smart Irrigation System
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || 
              (item.id === 'analitik' && (currentPage === 'statistik' || currentPage === 'perbandingan'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 py-3 rounded-2xl font-medium text-sm transition-all duration-200 group text-left cursor-pointer ${
                  isCollapsed ? 'justify-center px-0' : 'px-3.5'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/25 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50/80 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-110'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white/90 shadow-xs" />
                )}
              </button>
            );
          })}
        </nav>

        {/* System Online & Pump Status Widget at Bottom of Sidebar */}
        {!isCollapsed && (
          <div className="p-3.5 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/70 border border-emerald-100/80 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sistem Online
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-slate-700">
                  ESP32 Ready
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Pompa Irigasi:</span>
                <span className={`font-bold ${isPumpActive ? 'text-cyan-600 dark:text-cyan-400 animate-pulse' : 'text-slate-600 dark:text-slate-400'}`}>
                  {isPumpActive ? '💧 ON (Menyiram)' : 'OFF (Siaga)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
