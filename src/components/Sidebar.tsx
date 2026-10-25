import React from 'react';
import { 
  Home, 
  Droplets, 
  Cloud, 
  Clock, 
  Settings, 
  X,
  ChevronLeft,
  ChevronRight
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
  const { currentPage, setCurrentPage } = useFarm();

  // Exactly 5 menu items from the reference image
  const menuItems: { id: NavPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'irigasi', label: 'Irigasi', icon: Droplets },
    { id: 'cuaca', label: 'Cuaca', icon: Cloud },
    { id: 'riwayat', label: 'Riwayat', icon: Clock },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 h-screen z-40 flex flex-col justify-between bg-gradient-to-b from-[#0A3020] via-[#092B1D] to-[#051C12] text-white transition-all duration-300 shadow-2xl select-none overflow-hidden ${
          isCollapsed ? 'w-20' : 'w-[250px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Top: Logo & Nav */}
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-6 pt-7 pb-6">
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Leaf Icon (Lime & Emerald) matching reference */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-lime-400 via-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40 shrink-0">
                <span className="text-xl">🍃</span>
              </div>
              {!isCollapsed && (
                <div className="leading-tight">
                  <span className="font-extrabold text-xl tracking-tight text-white block">
                    AG Farm
                  </span>
                  <p className="text-[11px] text-emerald-300/80 font-medium tracking-wide">
                    Smart Irrigation
                  </p>
                </div>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3.5 py-2 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || 
                (item.id === 'riwayat' && currentPage === 'analitik');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileOpen(false);
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 group text-left cursor-pointer ${
                    isCollapsed ? 'justify-center px-0' : 'px-4'
                  } ${
                    isActive
                      ? 'bg-[#184D37] text-white shadow-md shadow-black/20 font-bold'
                      : 'text-emerald-100/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isActive ? 'text-white' : 'text-emerald-300/70 group-hover:text-white group-hover:scale-105'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Decoration: Watermelon Slices, Leaves, & Handwritten Script */}
        {!isCollapsed && (
          <div className="relative mt-auto overflow-hidden pointer-events-none select-none">
            {/* Seamless blended authentic artwork from reference */}
            <div className="relative w-full h-52 sm:h-60 overflow-hidden">
              <img
                src="/assets/sidebar_watermelon_decor.png"
                alt="Semangka AG Farm"
                className="w-full h-full object-cover object-bottom"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
