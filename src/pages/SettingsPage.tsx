import React, { useState } from 'react';
import { 
  User,
  Sliders, 
  Cpu, 
  MapPin, 
  Bell, 
  Save, 
  Check, 
  Wifi, 
  ShieldCheck,
  Mail,
  Camera,
  Award
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const SettingsPage: React.FC = () => {
  const { 
    user, 
    updateUser, 
    irrigationMode, 
    setIrrigationMode, 
    manualDurationSeconds, 
    setManualDurationSeconds,
    demoMode,
    setDemoMode
  } = useFarm();

  const [activeTab, setActiveTab] = useState<'profile' | 'sistem' | 'iot' | 'kebun' | 'notifikasi'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  // Kebun Settings state
  const [farmName, setFarmName] = useState(user.farmName);
  const [location, setLocation] = useState(user.location);
  const [plantVariety, setPlantVariety] = useState(user.plantVariety);
  const [plantDate, setPlantDate] = useState('2026-09-20');

  // Sistem Settings state
  const [minMoisture, setMinMoisture] = useState(50);
  const [maxPumpDuration, setMaxPumpDuration] = useState(600); // 10 minutes

  // IoT Settings state
  const [deviceId, setDeviceId] = useState('ESP32-AGFARM-BATUAMPAR-01');

  // Notification Toggles
  const [notifSensor, setNotifSensor] = useState(true);
  const [notifPump, setNotifPump] = useState(true);
  const [notifWeather, setNotifWeather] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      role,
      farmName,
      location,
      plantVariety
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Pengaturan AG Farm
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Kelola profil pengguna, sistem irigasi, perangkat IoT, informasi kebun, dan notifikasi.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation: Profil | Sistem | IoT | Kebun | Notifikasi */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'profile', label: 'Profil Pengguna', icon: User },
          { id: 'sistem', label: 'Sistem', icon: Sliders },
          { id: 'iot', label: 'IoT', icon: Cpu },
          { id: 'kebun', label: 'Kebun', icon: MapPin },
          { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profil Pengguna (Ali Ghufron) */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
            <div className="relative group">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md"
              />
              <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                <Camera className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{user.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {user.email}
              </p>
              <p className="text-xs text-slate-400">
                {user.farmName} • {user.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Alamat Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Peran / Jabatan</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Status Akun</label>
              <div className="px-4 py-2.5 bg-slate-100 rounded-xl text-xs text-slate-600 font-medium flex items-center justify-between">
                <span>Terverifikasi • Peneliti Tugas Akhir</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil Pengguna</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Sistem (Section 18) */}
      {activeTab === 'sistem' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900">Pengaturan Sistem Irigasi</h2>
            <p className="text-xs text-slate-400">Atur mode otomasi, ambang batas kelembapan, dan batas kerja pompa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode Auto/Manual */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Mode Operasi Default</label>
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIrrigationMode('AUTO')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    irrigationMode === 'AUTO' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  AUTO (Fuzzy Logic)
                </button>
                <button
                  type="button"
                  onClick={() => setIrrigationMode('MANUAL')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    irrigationMode === 'MANUAL' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  MANUAL
                </button>
              </div>
              <p className="text-[11px] text-slate-400">Mode Auto secara cerdas mengevaluasi kelembapan tanah, suhu, dan hujan.</p>
            </div>

            {/* Batas Kelembapan */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label>Batas Ambang Kelembapan Minimum</label>
                <span className="text-emerald-700 font-mono font-extrabold">{minMoisture}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="70"
                value={minMoisture}
                onChange={(e) => setMinMoisture(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-[11px] text-slate-400">Di bawah batas ini, sistem akan memprioritaskan rekomendasi siram.</p>
            </div>

            {/* Durasi Maksimum Pompa */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label>Durasi Maksimum Pompa per Siklus</label>
                <span className="text-emerald-700 font-mono font-extrabold">{maxPumpDuration} detik ({maxPumpDuration / 60} menit)</span>
              </div>
              <input
                type="range"
                min="60"
                max="900"
                step="60"
                value={maxPumpDuration}
                onChange={(e) => setMaxPumpDuration(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-[11px] text-slate-400">Proteksi safety cutoff motor pompa submersible dari overheating.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Sistem</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: IoT (Section 18) */}
      {activeTab === 'iot' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900">Perangkat IoT &amp; Telemetri ESP32</h2>
            <p className="text-xs text-slate-400">Status mikrokontroler, koneksi nirkabel, dan identitas perangkat kebun.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Status ESP32</span>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-extrabold text-emerald-800 text-sm">ONLINE (Terhubung)</span>
              </div>
              <p className="text-[11px] text-slate-500">Protokol HTTP/WiFi 2.4 GHz</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Last Connection</span>
              <div className="font-extrabold text-slate-800 text-sm pt-1">
                Beberapa detik lalu
              </div>
              <p className="text-[11px] text-slate-500">Interval telemetri: setiap 10 detik</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Device ID</span>
              <div className="font-mono font-extrabold text-slate-800 text-sm pt-1 truncate">
                {deviceId}
              </div>
              <p className="text-[11px] text-slate-500">MAC Address: 24:6F:28:B4:72:9A</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Firmware ESP32 versi 2.4 telah terkalibrasi untuk tanah lempung berpasir Madura.</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Kebun (Section 18) */}
      {activeTab === 'kebun' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900">Informasi Kebun &amp; Tanaman Semangka</h2>
            <p className="text-xs text-slate-400">Parameter lokasi kebun, jenis tanaman, dan tanggal tanam.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nama Kebun</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Lokasi Kebun</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Jenis Tanaman</label>
              <input
                type="text"
                value={plantVariety}
                onChange={(e) => setPlantVariety(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tanggal Tanam</label>
              <input
                type="date"
                value={plantDate}
                onChange={(e) => setPlantDate(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Informasi Kebun</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 5: Notifikasi (Section 18) */}
      {activeTab === 'notifikasi' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900">Pengaturan Notifikasi Sistem</h2>
            <p className="text-xs text-slate-400">Pemberitahuan peringatan sensor, status pompa, dan anomali cuaca.</p>
          </div>

          <div className="space-y-4">
            {/* Sensor Notif */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Notifikasi Sensor</span>
                <span className="text-[11px] text-slate-500">Pemberitahuan saat kelembapan tanah di luar rentang ideal (&lt;40% atau &gt;75%).</span>
              </div>
              <input
                type="checkbox"
                checked={notifSensor}
                onChange={(e) => setNotifSensor(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Pompa Notif */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Notifikasi Pompa</span>
                <span className="text-[11px] text-slate-500">Pemberitahuan saat pompa mulai beroperasi, selesai menyiram, atau dihentikan manual.</span>
              </div>
              <input
                type="checkbox"
                checked={notifPump}
                onChange={(e) => setNotifPump(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Cuaca Notif */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Notifikasi Cuaca</span>
                <span className="text-[11px] text-slate-500">Peringatan saat probabilitas hujan tinggi dan penundaan jadwal irigasi otomatis diaktifkan.</span>
              </div>
              <input
                type="checkbox"
                checked={notifWeather}
                onChange={(e) => setNotifWeather(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
