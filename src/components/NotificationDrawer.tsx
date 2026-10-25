import React from 'react';
import { X, Check, Droplets, Wifi, AlertTriangle, CloudRain, Brain, Bell } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useFarm();

  if (!isOpen) return null;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600"><Droplets className="w-4 h-4" /></div>;
      case 'weather':
        return <div className="p-2 rounded-xl bg-sky-100 text-sky-600"><CloudRain className="w-4 h-4" /></div>;
      case 'fuzzy':
        return <div className="p-2 rounded-xl bg-purple-100 text-purple-600"><Brain className="w-4 h-4" /></div>;
      case 'warning':
        return <div className="p-2 rounded-xl bg-amber-100 text-amber-600"><AlertTriangle className="w-4 h-4" /></div>;
      default:
        return <div className="p-2 rounded-xl bg-blue-100 text-blue-600"><Wifi className="w-4 h-4" /></div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-100 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">Notification Center</h3>
              <p className="text-xs text-slate-400">Pemberitahuan Sistem & Telemetri IoT</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader: Mark All */}
        <div className="px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">{notifications.length} Notifikasi Tersimpan</span>
          <button
            onClick={markAllNotificationsRead}
            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" /> Tandai Semua Dibaca
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                item.read 
                  ? 'bg-white border-slate-100 opacity-75' 
                  : 'bg-emerald-50/40 border-emerald-100 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                {getNotifIcon(item.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{item.message}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
