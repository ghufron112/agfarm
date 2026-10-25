import React from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  Compass,
  Thermometer,
  Eye
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const WeatherPage: React.FC = () => {
  const { sensorData, user } = useFarm();

  const forecastData = [
    { label: 'Hari Ini', date: '27 Okt', temp: `${sensorData.temperature}° / 24°`, rainProb: sensorData.weather_probability, condition: 'Cerah Berawan', icon: '⛅' },
    { label: 'Besok', date: '28 Okt', temp: '28° / 23°', rainProb: 75, condition: 'Hujan Ringan', icon: '🌧️' },
    { label: 'Lusa', date: '29 Okt', temp: '27° / 22°', rainProb: 60, condition: 'Hujan Ringan', icon: '🌧️' },
  ];

  return (
    <div className="space-y-5 select-none relative pb-10">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-r from-[#EAF5EF] via-[#E2F0E8] to-[#D5EADF] border border-emerald-500/15 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3323] tracking-tight">
              Prediksi Cuaca
            </h1>
            <span className="text-xl sm:text-2xl animate-bounce">🌦️</span>
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-[#1B5E3F] tracking-wide">
            Integrasi BMKG &amp; Mikroklimat Stasiun Kebun Semangka
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal flex items-center gap-1.5 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{user.location || 'Kebun Semangka Ali Ghufron • Jawa Timur'}</span>
          </p>
        </div>

        {/* Live Stasiun Online Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-emerald-200/60 shadow-xs shrink-0 self-start sm:self-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-slate-800">
            Sensor Mikroklimat Online
          </span>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ================= LEFT MAIN COLUMN (8 cols) ================= */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Main Weather Card (Consistent with Reference Art) */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-6 sm:p-7 space-y-5 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Kondisi Cuaca Saat Ini
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    Senin, 27 Okt 2025 • Pembaruan Otomatis
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                Peluang Hujan {sensorData.weather_probability}%
              </span>
            </div>

            {/* Large Temperature Display & Cloud Artwork */}
            <div className="relative pt-2 pb-1">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 font-mono tracking-tight">
                {sensorData.temperature}°C
              </div>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                Cerah Berawan • Terasa seperti 33°C
              </p>

              {/* Weather Cloud & Sun Art matching reference */}
              <div className="absolute right-0 top-0 pointer-events-none w-36 h-28 opacity-85">
                <img 
                  src="/assets/weather_cloud.png" 
                  alt="Awan & Matahari"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Explanation Note for Irrigation */}
            <div className="p-4 rounded-2xl bg-[#F0F7F2] border border-emerald-100/80 text-xs text-slate-700 flex items-start gap-3">
              <span className="text-lg shrink-0">💡</span>
              <p className="leading-relaxed">
                <strong className="text-emerald-950 font-bold">Dampak terhadap Irigasi:</strong> Probabilitas hujan sebesar {sensorData.weather_probability}% memicu aturan Fuzzy Logic untuk <strong>menunda penyiraman</strong>. Air tanah saat ini terjaga pada {sensorData.soil_moisture}%, sehingga menghemat air tangki secara signifikan.
              </p>
            </div>

            {/* 3-Day Forecast Cards */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Prakiraan Cuaca 3 Hari (Hari Ini, Besok, Lusa)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {forecastData.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F7FAF7] border border-slate-100 space-y-2 text-center hover:shadow-xs transition-shadow">
                    <span className="text-xs font-bold text-slate-500 block">{item.label} ({item.date})</span>
                    <span className="text-3xl block py-1">{item.icon}</span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono block">{item.temp}</span>
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-sky-700">
                      <span>🌧️ {item.rainProb}%</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">{item.condition}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (4 cols) ================= */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Microclimate Telemetry Grid */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Wind className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Parameter Mikroklimat
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#F7FAF7] border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  <span className="font-semibold">Kelembapan Udara (RH)</span>
                </div>
                <span className="font-extrabold text-slate-900 font-mono text-sm">78%</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7FAF7] border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Wind className="w-4 h-4 text-teal-500" />
                  <span className="font-semibold">Kecepatan Angin</span>
                </div>
                <span className="font-extrabold text-slate-900 font-mono text-sm">8 km/h</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7FAF7] border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">Indeks UV / Radiasi</span>
                </div>
                <span className="font-extrabold text-slate-900 font-mono text-sm">5 (Sedang)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7FAF7] border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Thermometer className="w-4 h-4 text-rose-500" />
                  <span className="font-semibold">Evapotranspirasi (ET0)</span>
                </div>
                <span className="font-extrabold text-slate-900 font-mono text-sm">3.8 mm/hari</span>
              </div>
            </div>
          </div>

          {/* Stasiun Sensor Info */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/90 p-5 sm:p-6 space-y-3">
            <h4 className="text-xs font-bold text-slate-900">
              Tentang Integrasi Data Cuaca
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
              Aplikasi menggabungkan sensor mikro DHT22 di kebun semangka dengan API BMKG terdekat. Variabel probabilitas hujan dimasukkan ke sistem Fuzzy Logic sebagai salah satu dari 3 parameter utama penentu penyiraman.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Calligraphy Watermark at Bottom Right matching reference */}
      <div className="flex justify-end pt-3 pr-2 pointer-events-none">
        <p className="font-['Caveat',cursive] text-emerald-800/60 text-lg sm:text-xl font-medium tracking-wide">
          Smart Farming for a Greener Future 🍃
        </p>
      </div>
    </div>
  );
};
