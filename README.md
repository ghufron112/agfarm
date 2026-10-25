# AG Farm — Smart Watermelon Farming & IoT Analytics System

Sistem Pemantauan dan Otomasi Irigasi Cerdas Berbasis IoT (Internet of Things) untuk Budidaya Semangka (Tugas Akhir).  
**Lokasi Penerapan:** Desa Batuampar, Kec. Guluk-Guluk, Kab. Sumenep, Jawa Timur.

---

## 🍉 Tentang Proyek

**AG Farm** adalah platform web modern untuk manajemen pertanian presisi semangka. Sistem ini mengintegrasikan data sensor IoT (*soil moisture*, suhu, kelembaban, radiasi matahari), prakiraan cuaca, kontrol pompa irigasi otomatis/manual, serta analitik pertumbuhan untuk mendukung riset tugas akhir dan efisiensi petani di lapangan.

---

## 🚀 Fitur Utama

1. **Dashboard Monitoring Real-time**
   - Telemetri parameter tanah & mikroklimat (kelembaban tanah per zona, suhu udara, kelembaban udara).
   - Status pompa irigasi aktif/otomatis dengan indikator status koneksi IoT.
2. **Kontrol Irigasi Cerdas (Smart Irrigation)**
   - Mode manual dan otomatis berdasarkan *threshold* kelembaban tanah.
   - Penjadwalan penyiraman dan riwayat durasi irigasi.
3. **Analisis Kondisi Tanaman (Plant Health & Growth)**
   - Pelacakan fase pertumbuhan tanaman semangka (vegetatif, generatif, pembuahan, panen).
   - Indeks kesehatan tanaman dan deteksi dini defisit air atau anomali sensor.
4. **Integrasi Cuaca & Agroklimat**
   - Prakiraan cuaca lokal lokasi kebun (Desa Batuampar, Sumenep) dengan integrasi OpenWeather/WeatherAPI.
   - Peringatan dini hujan lebat, suhu ekstrem, atau kekeringan.
5. **Riset & Analisis Data (Research Analytics)**
   - Visualisasi tren harian/mingguan sensor untuk kebutuhan komparasi riset ilmiah dan evaluasi panen.
6. **Keamanan & Autentikasi**
   - Autentikasi pengguna berbasis Supabase Auth.
   - Riwayat aktivitas sistem dan notifikasi interaktif.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **IoT & Telemetri:** ESP32 via MQTT Broker / WebSockets
- **Code Quality:** Oxlint

---

## 📁 Struktur Direktori

```text
MY WATERMELON/
├── public/                 # Aset statis & logo
├── src/
│   ├── assets/             # Gambar & ikon
│   ├── components/         # Komponen reusable (Navbar, StatCard, Chart, dll.)
│   ├── context/            # React Context (Auth, IoT state, Notification)
│   ├── data/               # Mock data & initial states
│   ├── pages/              # Halaman aplikasi (Dashboard, Irrigation, Weather, dll.)
│   ├── types/              # Deklarasi TypeScript interfaces & types
│   ├── utils/              # Helper functions & formatter
│   ├── App.tsx             # Root component & routing
│   └── main.tsx            # Entry point Vite
├── supabase/
│   └── schema.sql          # Skema database & tabel telemetri Supabase
├── .env.example            # Template variabel lingkungan (Aman di-commit)
├── .gitignore              # Daftar berkas terabaikan (Melindungi kredensial .env)
└── package.json            # Daftar dependensi & scripts
```

---

## ⚙️ Panduan Menjalankan Proyek

### 1. Klon Repositori
```bash
git clone https://github.com/ghufron112/agfarm.git
cd agfarm
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi konfigurasi kredensial Anda di file `.env`:
```env
# Supabase Backend
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Weather API
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_FARM_LAT=-7.0267
VITE_FARM_LON=113.6231
VITE_FARM_LOCATION="Desa Batuampar, Kec. Guluk-Guluk, Kab. Sumenep, Jawa Timur"

# MQTT Broker (Opsional)
VITE_MQTT_BROKER_URL=wss://broker.hivemq.com:8884/mqtt
```
> ⚠️ **PENTING:** Jangan pernah melakukan `git commit` atau `git push` pada file `.env`. File ini telah ditambahkan ke `.gitignore` untuk melindungi rahasia dan kunci API Anda.

### 4. Setup Database Supabase (Opsional)
Jalankan query DDL yang berada di file `supabase/schema.sql` pada menu **SQL Editor** di dashboard Supabase Anda.

### 5. Jalankan Aplikasi
```bash
npm run dev
```
Aplikasi akan aktif di `http://localhost:5173`.

### 6. Build untuk Produksi
```bash
npm run build
```

---

## 🔒 Keamanan & Kebijakan Rahasia

- Seluruh kredensial rahasia (*API keys*, *database credentials*, token) **wajib** disimpan di `.env` lokal.
- File `.gitignore` telah dikonfigurasi untuk mencegah `.env` dan berkas build terunggah ke Git.
- Hanya file `.env.example` yang di-push ke publik sebagai acuan format konfigurasi.

---

## 👨‍💻 Penulis / Pengembang

- **Nama:** Ali Ghufron ([@ghufron112](https://github.com/ghufron112))
- **Program:** Tugas Akhir / Skripsi — Smart Agriculture Watermelon
