import React from 'react';
import { 
  LayoutDashboard, 
  Droplets, 
  CloudSun, 
  BarChart3, 
  FlaskConical, 
  Sprout, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
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
  const { currentPage, setCurrentPage, triggerMascotGreeting } = useFarm();

  const menuItems: { id: NavPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'irigasi', label: 'Irigasi', icon: Droplets },
    { id: 'cuaca', label: 'Cuaca', icon: CloudSun },
    { id: 'statistik', label: 'Statistik', icon: BarChart3 },
    { id: 'perbandingan', label: 'Perbandingan Efisiensi', icon: FlaskConical },
    { id: 'tanaman', label: 'Kondisi Tanaman', icon: Sprout },
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
        className={`fixed lg:sticky top-0 h-screen z-50 flex flex-col bg-white/85 backdrop-blur-2xl border-r border-emerald-950/5 transition-all duration-300 shadow-[2px_0_20px_-4px_rgba(6,78,59,0.03)] ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100/70">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 shrink-0 ring-2 ring-emerald-500/20">
              <span className="text-xl">🍉</span>
            </div>
            {!isCollapsed && (
              <div className="leading-tight transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-800">AG Farm</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">IoT</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">
                  Smart Irrigation System
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors"
            title={isCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-medium text-sm transition-all duration-200 group text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/25 font-semibold'
                    : 'text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600 group-hover:scale-110'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/90 shadow-xs" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mascot Quick Action */}
        {!isCollapsed && (
          <div className="px-3 pb-2">
            <button
              onClick={triggerMascotGreeting}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-100/70 hover:bg-emerald-100/60 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/melo_mascot.jpg"
                  alt="Melo"
                  className="w-7 h-7 rounded-full object-cover border border-emerald-300 group-hover:scale-105 transition-transform"
                />
                <span className="text-xs font-semibold text-emerald-800">Tanya Melo AI</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>
        )}

        {/* Bottom Banner Card (matches user screenshot) */}
        {!isCollapsed && (
          <div className="p-3">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0A331E] to-[#041A0E] text-white p-3.5 shadow-sm border border-emerald-900/40">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <p className="text-[12px] font-bold text-emerald-300 italic tracking-wide leading-snug mb-2.5">
                "Tanam Hari Ini, Panen Masa Depan 🌱"
              </p>
              <div className="relative rounded-xl overflow-hidden shadow-inner group">
                <img
                  src="/assets/watermelon_sidebar.jpg"
                  alt="Semangka AG Farm"
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-semibold text-emerald-200">Semangka Inul Hibrida</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
