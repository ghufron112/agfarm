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
  Award,
  Settings2,
  Sparkles,
  Activity,
  Copy,
  CheckCheck,
  RefreshCw,
  Clock,
  Droplets,
  CloudRain,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Calendar,
  Layers,
  Smartphone,
  Info,
  ChevronRight,
  ExternalLink
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
  const [copiedMac, setCopiedMac] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);

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
  const macAddress = '24:6F:28:B4:72:9A';

  // Notification Toggles
  const [notifSensor, setNotifSensor] = useState(true);
  const [notifPump, setNotifPump] = useState(true);
  const [notifWeather, setNotifWeather] = useState(true);
  const [notifAudio, setNotifAudio] = useState(true);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateUser({
      name,
      email,
      role,
      farmName,
      location,
      plantVariety
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyMac = () => {
    navigator.clipboard?.writeText(macAddress);
    setCopiedMac(true);
    setTimeout(() => setCopiedMac(false), 2000);
  };

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 2500);
    }, 800);
  };

  // Calculate HST dynamically
  const calculateHST = () => {
    try {
      const plantTime = new Date(plantDate).getTime();
      const nowTime = new Date('2026-10-25').getTime();
      const diffDays = Math.max(0, Math.floor((nowTime - plantTime) / (1000 * 60 * 60 * 24)));
      return diffDays;
    } catch {
      return 35;
    }
  };

  const currentHst = calculateHST();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header: Master Configuration Command Banner */}
      <div className="relative rounded-[32px] overflow-hidden p-6 sm:p-8 lg:p-9 glass-card border border-emerald-500/20 shadow-xl transition-all duration-300">
        {/* Subtle Ambient Glow Mesh */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Title Stack */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-600/10 dark:from-emerald-500/30 dark:via-teal-500/20 dark:to-emerald-600/15 border border-emerald-500/30 shadow-inner group">
              <Settings2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse shadow-sm shadow-emerald-500/50" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Pusat Konfigurasi Sistem
                </span>
                <span className="text-[11px] font-semibold text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">AG Farm Batuampar v2.4</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Pengaturan AG Farm
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                Kelola profil peneliti, ambang batas fuzzy logic, telemetri mikrokontroler IoT, varietas semangka, dan preferensi notifikasi darurat.
              </p>
            </div>
          </div>

          {/* Right Status / Notification Toast */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {saveSuccess ? (
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-500/25 animate-in fade-in slide-in-from-top-2 duration-300">
                <Check className="w-4 h-4 text-white" />
                <span>Pengaturan Berhasil Disimpan!</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-2xs">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span>ESP32: Online</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Cloud Sync Aktif</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Tabs Navigation: Modern Segmented Pill Dock */}
      <div className="p-1.5 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-inner">
        {[
          { id: 'profile', label: 'Profil Pengguna', icon: User, hint: 'Identitas & Peran' },
          { id: 'sistem', label: 'Sistem & Fuzzy', icon: Sliders, hint: 'Logika & Batas Pompa' },
          { id: 'iot', label: 'IoT & Telemetri', icon: Cpu, hint: 'ESP32 & Node' },
          { id: 'kebun', label: 'Informasi Kebun', icon: MapPin, hint: 'Lahan & Semangka' },
          { id: 'notifikasi', label: 'Notifikasi & Alert', icon: Bell, hint: 'Peringatan Sistem' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex-1 justify-center ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25 scale-[1.01]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab 1: Profil Pengguna (Ali Ghufron) */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-slate-800">
          {/* Profile Header Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-900/90 via-teal-900/85 to-slate-900 p-6 text-white border border-emerald-500/20 shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative group cursor-pointer">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-emerald-400/40 shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{user.name}</h2>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-emerald-200/80 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {user.farmName} • {user.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Peneliti Tugas Akhir
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nama Lengkap Peneliti</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Alamat Email Utama</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Peran / Jabatan Akademik</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tingkat Akses &amp; Otoritas</span>
              </label>
              <div className="px-4 py-3 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/50 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 font-semibold flex items-center justify-between">
                <span>Super Administrator • Akses Penuh SCADA</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Terverifikasi
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil Pengguna</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. Tab 2: Sistem Irigasi & Fuzzy */}
      {activeTab === 'sistem' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Pengaturan Logika Irigasi Otomatis
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Konfigurasi motor penggerak fuzzy logic Mamdani, ambang kelembapan tanah, dan proteksi pompa.
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold self-start sm:self-auto">
              Mode Aktif: {irrigationMode}
            </div>
          </div>

          {/* Mode Operasi Selector Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Pilih Mode Operasi Pompa Irigasi
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setIrrigationMode('AUTO')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  irrigationMode === 'AUTO'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md shadow-emerald-500/10'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">AUTO (Fuzzy Logic Mamdani)</h3>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Rekomendasi Utama Riset</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${irrigationMode === 'AUTO' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 dark:border-slate-600'}`}>
                    {irrigationMode === 'AUTO' && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  Secara cerdas mengevaluasi input multi-sensor (Kelembapan Tanah, Suhu Udara, dan Sensor Hujan) untuk menghitung durasi penyiraman optimal secara otomatis.
                </p>
              </div>

              <div 
                onClick={() => setIrrigationMode('MANUAL')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  irrigationMode === 'MANUAL'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md shadow-emerald-500/10'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-700 dark:bg-slate-600 text-white flex items-center justify-center font-bold text-xs">
                      M
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">MANUAL (Kontrol Operator)</h3>
                      <span className="text-[11px] font-semibold text-slate-500">Saklar Langsung</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${irrigationMode === 'MANUAL' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 dark:border-slate-600'}`}>
                    {irrigationMode === 'MANUAL' && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  Pompa dikendalikan secara manual oleh operator melalui tombol kontrol di Dashboard dengan durasi timer tetap yang ditentukan sebelumnya.
                </p>
              </div>
            </div>
          </div>

          {/* Range Sliders Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Kelembapan Threshold */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-emerald-600" />
                  <span>Ambang Kelembapan Minimum</span>
                </label>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-black text-xs">
                  {minMoisture}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="70"
                value={minMoisture}
                onChange={(e) => setMinMoisture(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>30% (Kering)</span>
                <span>Standar Rekomendasi: 50%</span>
                <span>70% (Lembap)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Jika kelembapan tanah turun di bawah {minMoisture}%, sistem akan mengaktifkan aturan fuzzy prioritas siram tinggi.
              </p>
            </div>

            {/* Durasi Maksimum Pompa */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Safety Cutoff Durasi Maksimal</span>
                </label>
                <span className="px-2.5 py-1 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-mono font-black text-xs">
                  {maxPumpDuration}s ({maxPumpDuration / 60}m)
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="900"
                step="60"
                value={maxPumpDuration}
                onChange={(e) => setMaxPumpDuration(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 Menit</span>
                <span>Standar: 10 Menit</span>
                <span>15 Menit</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Proteksi perangkat keras: memutus arus listrik pompa secara otomatis jika telah beroperasi terus-menerus selama {maxPumpDuration / 60} menit.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Logika Irigasi</span>
            </button>
          </div>
        </form>
      )}

      {/* 5. Tab 3: IoT & Telemetri */}
      {activeTab === 'iot' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Telemetri Mikrokontroler &amp; Gateway IoT
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kondisi operasional mikrokontroler ESP32, kualitas sinyal Wi-Fi, dan kalibrasi sensor kebun.
              </p>
            </div>
            <button
              onClick={handleTestPing}
              disabled={isPinging}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{isPinging ? 'Menguji Ping...' : pingSuccess ? 'Ping Sukses (24ms)!' : 'Uji Koneksi ESP32'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Status ESP32 */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Status Node MCU</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  Active Heartbeat
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="font-black text-slate-900 dark:text-white text-base">ONLINE</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Protokol HTTP/REST &amp; WebSocket (Frekuensi 2.4 GHz)
              </p>
            </div>

            {/* Sinyal Wi-Fi */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Kualitas Wi-Fi</span>
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">-62 dBm</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Wifi className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-black text-slate-900 dark:text-white text-base">Sangat Kuat (92%)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SSID: AG_FARM_RESEARCH_AP (Router Lahan)
              </p>
            </div>

            {/* Device ID & MAC */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Hardware Identifier</span>
                <button 
                  onClick={handleCopyMac}
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedMac ? <CheckCheck className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedMac ? 'Tersalin' : 'Salin MAC'}</span>
                </button>
              </div>
              <div className="font-mono font-extrabold text-slate-900 dark:text-white text-sm pt-1 truncate">
                {deviceId}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                MAC: {macAddress}
              </p>
            </div>
          </div>

          {/* Hardware Specs & Calibration Banner */}
          <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-emerald-950 dark:text-emerald-200">
                  Kalibrasi Sensor Terverifikasi (Karakteristik Tanah Madura)
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5 leading-relaxed">
                  Formula kalibrasi linear ADC 12-bit telah disesuaikan khusus untuk tanah lempung berpasir di lahan Batuampar guna menjamin akurasi data kelembapan (R² = 0.982).
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs self-start sm:self-auto whitespace-nowrap">
              Firmware v2.4.1
            </span>
          </div>
        </div>
      )}

      {/* 6. Tab 4: Informasi Kebun & Tanaman */}
      {activeTab === 'kebun' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Informasi Kebun &amp; Karakteristik Semangka
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Konfigurasi lokasi lahan penelitian, tanggal tanam bibit, dan varietas semangka yang dibudidayakan.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <span>Umur Tanaman: {currentHst} HST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nama Kebun / Plot Riset</span>
              </label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lokasi Geografis Kebun</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Varietas Semangka</span>
              </label>
              <input
                type="text"
                value={plantVariety}
                onChange={(e) => setPlantVariety(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tanggal Tanam Bibit</span>
              </label>
              <input
                type="date"
                value={plantDate}
                onChange={(e) => setPlantDate(e.target.value)}
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-semibold transition-all"
              />
            </div>
          </div>

          {/* Plant Growth Status Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <span>🍉</span> Fase Pertumbuhan Saat Ini: <strong>Fase Vegetatif Aktif</strong>
              </span>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Bibit berusia {currentHst} HST. Kebutuhan air optimal: 50% - 65% kelembapan tanah dengan frekuensi tetes teratur.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Estimasi Panen</span>
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">~65-75 HST (November 2026)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Informasi Kebun</span>
            </button>
          </div>
        </form>
      )}

      {/* 7. Tab 5: Notifikasi & Alert */}
      {activeTab === 'notifikasi' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Pusat Preferensi Notifikasi &amp; Alarm
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sesuaikan peringatan dini jika terjadi anomali kelembapan, operasional pompa, atau presipitasi hujan.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <span>Semua Kanal Berfungsi</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle 1: Sensor Alert */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                    Peringatan Ambang Batas Sensor Kelembapan
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                    Kirim pemberitahuan instan jika tanah semangka terlalu kering (&lt;40%) atau terlalu jenuh air (&gt;75%) yang berisiko busuk akar.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotifSensor(!notifSensor)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifSensor ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    notifSensor ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Pump Alert */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-teal-500/15 text-teal-700 dark:text-teal-400 mt-0.5">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                    Notifikasi Operasional Pompa Submersible
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                    Pemberitahuan saat pompa mulai mengairi, selesai siklus, estimasi liter air tersalurkan, atau proteksi safety cutoff terpicu.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotifPump(!notifPump)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifPump ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    notifPump ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Weather Alert */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-400 mt-0.5">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                    Peringatan Deteksi Presipitasi &amp; Hujan
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                    Pemberitahuan ketika sensor hujan mendeteksi air hujan lebat dan sistem otomatis menunda jadwal penyiraman untuk efisiensi air.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotifWeather(!notifWeather)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifWeather ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    notifWeather ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 4: Audio Alert */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-400 mt-0.5">
                  {notifAudio ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                    Efek Suara Notifikasi (Audio Chime)
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                    Bunyikan nada lembut di browser saat terjadi event penting irigasi atau anomali kondisi lahan.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotifAudio(!notifAudio)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifAudio ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    notifAudio ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

