import React from 'react';
import { 
  X, 
  Check, 
  Droplets, 
  Wifi, 
  AlertTriangle, 
  CloudRain, 
  Brain, 
  Bell, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsRead,
    deleteNotification,
    clearAllNotifications
  } = useFarm();

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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">Notification Center</h3>
              <p className="text-xs text-slate-400">Pemberitahuan Sistem &amp; Telemetri IoT</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Tutup Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader: Count, Mark All, Clear All */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {notifications.length} Notifikasi Tersimpan
          </span>

          <div className="flex items-center gap-3">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  title="Tandai semua notifikasi sudah dibaca"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Tandai Dibaca</span>
                </button>

                <span className="text-slate-300">|</span>

                <button
                  onClick={clearAllNotifications}
                  className="text-rose-600 font-bold hover:text-rose-700 hover:underline flex items-center gap-1"
                  title="Hapus seluruh riwayat notifikasi"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Semua</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-3xl">
                🍉
              </div>
              <div>
                <p className="font-extrabold text-slate-700 text-sm">Riwayat Notifikasi Bersih</p>
                <p className="text-xs text-slate-400 mt-1">
                  Tidak ada pemberitahuan baru saat ini. Semua telemetri sistem berjalan normal.
                </p>
              </div>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all group ${
                  item.read 
                    ? 'bg-white border-slate-100 opacity-80 hover:opacity-100' 
                    : 'bg-emerald-50/50 border-emerald-100/90 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div 
                    onClick={() => markNotificationAsRead(item.id)}
                    className="cursor-pointer"
                  >
                    {getNotifIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 
                        onClick={() => markNotificationAsRead(item.id)}
                        className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{item.title}</span>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </h4>

                      {/* Delete Single Notification Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(item.id);
                        }}
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Hapus notifikasi ini"
                        aria-label="Hapus notifikasi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p 
                      onClick={() => markNotificationAsRead(item.id)}
                      className="text-xs text-slate-600 leading-relaxed mb-2 cursor-pointer"
                    >
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>{item.timestamp}</span>
                      {!item.read && (
                        <button
                          onClick={() => markNotificationAsRead(item.id)}
                          className="text-emerald-700 font-bold hover:underline"
                        >
                          Tandai dibaca
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="flex-1 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan Semua</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
