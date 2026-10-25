import React from 'react';
import { 
  LayoutDashboard, 
  Droplets, 
  CloudSun, 
  BarChart3, 
  History, 
  Settings
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { NavPage } from '../types';

interface BottomNavProps {
  onOpenSidebar?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = () => {
  const { currentPage, setCurrentPage, isPumpActive } = useFarm();

  const navItems: { id: NavPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'irigasi', label: 'Irigasi', icon: Droplets },
    { id: 'cuaca', label: 'Cuaca', icon: CloudSun },
    { id: 'riwayat', label: 'Riwayat', icon: History },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <nav 
      aria-label="Navigasi Bawah Ponsel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] px-1 sm:px-3 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isIrrigation = item.id === 'irigasi';

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 relative group cursor-pointer ${
                isActive 
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {/* Active subtle background pill */}
              {isActive && (
                <span className="absolute inset-x-1.5 top-0.5 bottom-0.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl -z-10 transition-all border border-emerald-200/60 dark:border-emerald-800/60" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive 
                      ? 'scale-110 text-emerald-700 dark:text-emerald-400' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`} 
                />

                {/* Live Irrigation Pulsing indicator */}
                {isIrrigation && isPumpActive && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] tracking-tight mt-0.5 truncate max-w-[54px] ${
                isActive ? 'font-black' : 'font-medium'
              }`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="w-1.5 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
