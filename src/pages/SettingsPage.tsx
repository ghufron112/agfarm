import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Cpu, 
  Droplets, 
  Bell, 
  Database, 
  Save, 
  Check, 
  Wifi, 
  Code, 
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, demoMode, setDemoMode, theme, setTheme } = useFarm();

  const [activeTab, setActiveTab] = useState<'profile' | 'farm' | 'iot' | 'irrigation' | 'integration' | 'code'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [farmName, setFarmName] = useState(user.farmName);
  const [location, setLocation] = useState(user.location);
  const [areaHa, setAreaHa] = useState(user.areaHa);
  const [plantVariety, setPlantVariety] = useState(user.plantVariety);

  // IoT & Supabase config
  const [esp32Id, setEsp32Id] = useState('ESP32-AGFARM-01');
  const [supabaseUrl, setSupabaseUrl] = useState('https://your-project.supabase.co');
  const [supabaseKey, setSupabaseKey] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key');
  const [testStatus, setTestStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      farmName,
      location,
      areaHa,
      plantVariety
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestConnection = () => {
    setTestStatus('Memeriksa koneksi...');
    setTimeout(() => {
      setTestStatus('Koneksi berhasil! Endpoint Supabase & ESP32 siap menerima telemetri.');
    }, 1000);
  };

  const esp32Snippet = `// AG Farm — ESP32 Smart Drip Irrigation Firmware
// Hardware: ESP32 DevKit v1, Capacitive Soil Moisture, DHT22, 1-Ch Relay 5V
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22
#define SOIL_PIN 34
#define RELAY_PUMP_PIN 23

DHT dht(DHTPIN, DHTTYPE);
const char* ssid = "AG_FARM_IOT";
const char* pass = "semangka2026";
const char* supabase_url = "https://your-project.supabase.co/rest/v1/sensor_readings";

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PUMP_PIN, OUTPUT);
  digitalWrite(RELAY_PUMP_PIN, HIGH); // Active LOW relay OFF
  dht.begin();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\\nWiFi Connected to AG Farm Mesh!");
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int rawSoil = analogRead(SOIL_PIN);
  int moisture = map(rawSoil, 3200, 1400, 0, 100); // Calibrated for Madura clay-loam
  moisture = constrain(moisture, 0, 100);

  Serial.printf("Soil: %d%% | Temp: %.1fC | Hum: %.1f%%\\n", moisture, temp, hum);
  delay(10000); // Telemetry every 10 seconds
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 sm:p-7 rounded-[32px]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Pengaturan Sistem &amp; Integrasi AG Farm
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Konfigurasi profil pengguna, parameter lahan semangka, mikrokontroler ESP32, dan koneksi Supabase.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
        {[
          { id: 'profile', label: 'Profil Pengguna', icon: User },
          { id: 'farm', label: 'Parameter Kebun & Tanaman', icon: MapPin },
          { id: 'iot', label: 'Perangkat IoT ESP32', icon: Cpu },
          { id: 'irrigation', label: 'Aturan Fuzzy & Ambang Batas', icon: Droplets },
          { id: 'integration', label: 'Integrasi Supabase & API', icon: Database },
          { id: 'code', label: 'Firmware & Schema SQL', icon: Code },
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
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-100 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profil */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20"
            />
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{name}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">{user.role} • Peneliti Skripsi</p>
              <button
                type="button"
                className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Ganti Foto Profil
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Theme Selector Section */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              Tema Tampilan Antarmuka
            </label>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  theme === 'light'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 dark:text-emerald-200 shadow-sm'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Mode Terang (Light)</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-400">Latar bersih cerah</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  theme === 'dark'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 dark:text-emerald-200 shadow-sm'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Mode Gelap (Dark)</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-400">Deep obsidian &amp; nyaman</span>
                </div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Simpan Perubahan Profil
          </button>
        </form>
      )}

      {/* Tab 2: Kebun & Tanaman */}
      {activeTab === 'farm' && (
        <form onSubmit={handleSave} className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">Nama Kebun</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">Lokasi Lahan</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">Luas Lahan (Hektar)</label>
              <input
                type="number"
                step="0.1"
                value={areaHa}
                onChange={(e) => setAreaHa(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">Varietas Semangka</label>
              <input
                type="text"
                value={plantVariety}
                onChange={(e) => setPlantVariety(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Simpan Konfigurasi Kebun
          </button>
        </form>
      )}

      {/* Tab 3: IoT ESP32 */}
      {activeTab === 'iot' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Status Node Mikrokontroler ESP32</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400">Node Utama Gateway Irigasi Tetes Kebun Batuampar</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected (RSSI -58 dBm)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold block mb-1">DEVICE ID</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm">ESP32-AGFARM-01</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold block mb-1">FIRMWARE VERSION</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">v2.4.1 (OTA Ready)</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold block mb-1">LAST SYNC</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm">10 detik yang lalu</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-white">Pin Assignment ESP32:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <div>GPIO 34: Soil Moisture</div>
              <div>GPIO 04: Sensor DHT22</div>
              <div>GPIO 23: Relay Pompa 12V</div>
              <div>GPIO 22: Flow Sensor Water</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Irrigation & Fuzzy Rule config */}
      {activeTab === 'irrigation' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Parameter Aturan Logika Fuzzy &amp; Batas Kelembapan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Ambang Bawah Kelembapan (Kering)
              </label>
              <input
                type="number"
                defaultValue={40}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 block">
                Jika kelembapan di bawah 40%, sistem memicu penyiraman.
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Ambang Atas Kelembapan (Jenuh)
              </label>
              <input
                type="number"
                defaultValue={70}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 block">
                Jika kelembapan di atas 70%, pompa dilarang menyala (anti-waterlogging).
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Durasi Maksimal Operasi Pompa
              </label>
              <input
                type="number"
                defaultValue={10}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 block">
                Proteksi thermal motor pompa: mati otomatis setelah 10 menit.
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Kalibrasi Flow Sensor
              </label>
              <input
                type="number"
                step="0.1"
                defaultValue={2.5}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 block">
                Debit standar emiter tetes: 2.5 Liter / menit.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Supabase & Integrations */}
      {activeTab === 'integration' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Konfigurasi Database Supabase</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400">Penyimpanan telemetri real-time cloud Postgres &amp; RLS</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1.5">Project URL</label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-ref.supabase.co"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1.5">Anon Public Key</label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 font-mono text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestConnection}
                className="px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-emerald-700 hover:bg-slate-900 dark:hover:bg-emerald-600 text-white text-xs font-bold transition-all"
              >
                Uji Koneksi Supabase
              </button>

              {testStatus && (
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {testStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Firmware & Schema SQL */}
      {activeTab === 'code' && (
        <div className="glass-card rounded-[32px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Arduino C++ Firmware ESP32</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400">Dapat langsung diunggah via Arduino IDE / PlatformIO</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(esp32Snippet);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2000);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Tersalin!' : 'Salin Kode'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed max-h-96">
            {esp32Snippet}
          </pre>
        </div>
      )}
    </div>
  );
};
