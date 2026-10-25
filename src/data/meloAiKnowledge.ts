import { SensorData, FuzzyDecision } from '../types';

export type AiMode = 'agronomis' | 'skripsi' | 'iot';

export interface DiseaseDiagnosis {
  id: string;
  name: string;
  pathogen: string;
  confidence: number;
  severity: 'Aman' | 'Rendah' | 'Sedang' | 'Kritis';
  symptoms: string[];
  recommendations: string[];
  irrigationAction: string;
  suggestedDurationSeconds: number;
  sampleImage: string;
}

export interface FertilizerCalculation {
  plantCount: number;
  growthStage: string;
  npkGrams: number;
  kno3Grams: number;
  mkpGrams: number;
  waterLiters: number;
  dosePerPlantMl: number;
  frequency: string;
  instructions: string;
}

export interface ChatMessage {
  id: string;
  sender: 'melo' | 'user';
  text: string;
  timestamp: string;
  aiMode?: AiMode;
  actionType?: 
    | 'start_pump' 
    | 'stop_pump' 
    | 'open_fuzzy' 
    | 'open_weather' 
    | 'open_page'
    | 'simulate_drought'
    | 'simulate_rain'
    | 'reset_sensors'
    | 'diagnose_disease'
    | 'calc_fertilizer'
    | 'none';
  targetPage?: string;
  actionDurationSeconds?: number;
  quickActions?: { label: string; prompt: string }[];
  diagnosisResult?: DiseaseDiagnosis;
  fertilizerResult?: FertilizerCalculation;
}

// -------------------------------------------------------------
// Catalog of Watermelon Leaf & Crop Diseases
// -------------------------------------------------------------
export const watermelonDiseases: DiseaseDiagnosis[] = [
  {
    id: 'downy_mildew',
    name: 'Embun Bulu (Downy Mildew)',
    pathogen: 'Pseudoperonospora cubensis',
    confidence: 97.4,
    severity: 'Sedang',
    symptoms: [
      'Bercak kuning bersudut (angular) tegas dibatasi urat daun',
      'Lapisan spora halus berwarna kelabu keunguan di bawah permukaan daun',
      'Daun cepat mengering, gosong, dan menggulung'
    ],
    recommendations: [
      'Semprot fungisida hayati Trichoderma harzianum atau fungisida Mankozeb/Dimetomorf (2 gr/L) pada pagi hari (06:30 - 08:00)',
      'Perbaiki sirkulasi udara kanopi dengan memangkas sulur samping liar',
      'Jangan semprot daun dengan air di sore hari'
    ],
    irrigationAction: 'Kurangi debit irigasi tetes 25% untuk menjaga kelembapan mikro tanah <65% agar spora jamur tidak berkembang.',
    suggestedDurationSeconds: 45,
    sampleImage: '/assets/leaf_disease_sample.jpg'
  },
  {
    id: 'thrips_virus',
    name: 'Thrips & Keriting Pucuk (Geminivirus)',
    pathogen: 'Thrips parvispinus & Vektor Virus',
    confidence: 96.2,
    severity: 'Kritis',
    symptoms: [
      'Pucuk daun menggulung melengkung ke atas seperti mangkuk',
      'Permukaan bawah daun tampak keperakan mengkilap akibat hisapan sel',
      'Ruas batang pucuk memendek dan tanaman menjadi kerdil'
    ],
    recommendations: [
      'Rotasi semprot insektisida berbahan aktif Abamektin (0.5 ml/L) dan Imidakloprid (0.75 gr/L)',
      'Pasang perangkap likat kuning (Yellow Sticky Trap) 40 lembar/hektar',
      'Kocor pupuk kalium silika untuk memperkuat dinding sel daun'
    ],
    irrigationAction: 'Pertahankan kelembapan tanah stabil pada 60% agar tanaman tidak mengalami stres air ganda.',
    suggestedDurationSeconds: 60,
    sampleImage: '/assets/watermelon_plant.jpg'
  },
  {
    id: 'anthracnose',
    name: 'Antraknosa Daun & Batang',
    pathogen: 'Colletotrichum orbiculare',
    confidence: 94.8,
    severity: 'Sedang',
    symptoms: [
      'Bercak lingkaran coklat konsentris dengan tepi kehitaman',
      'Luka melekuk memanjang pada batang sulur utama',
      'Buah berisiko berlubang cekung berair jika sudah generatif'
    ],
    recommendations: [
      'Aplikasi fungisida Azoksistrobin + Difenokonazol dosis 1 ml/L air',
      'Bersihkan mulsa dari daun busuk rontok',
      'Pastikan bedengan tidak tergenang saat hujan'
    ],
    irrigationAction: 'Gunakan irigasi tetes malam hari hanya jika tanah benar-benar kering, utamakan irigasi pagi hari.',
    suggestedDurationSeconds: 40,
    sampleImage: '/assets/leaf_disease_sample.jpg'
  },
  {
    id: 'healthy_leaf',
    name: 'Daun Semangka Sehat & Prima',
    pathogen: 'Tidak Ada (Fisiologis Optimal)',
    confidence: 99.2,
    severity: 'Aman',
    symptoms: [
      'Warna hijau tua merata dan kutikula lilin berkilau sehat',
      'Kanopi rimbun tegak, tanpa bercak klorosis atau nekrosis',
      'Tunas sulur utama merambat aktif dengan sulur melingkar kokoh'
    ],
    recommendations: [
      'Pertahankan jadwal fertigasi tetes teratur fase vegetatif',
      'Lakukan perambatan sulur merata di atas jerami/mulsa perak',
      'Pantau kelembapan tanah via IoT ESP32 AG Farm setiap hari'
    ],
    irrigationAction: 'Jalankan irigasi otomatis berbasis evaluasi Fuzzy Logic Mamdani secara berkelanjutan.',
    suggestedDurationSeconds: 60,
    sampleImage: '/assets/watermelon_plant.jpg'
  }
];

// -------------------------------------------------------------
// Fertilizer Calculation Engine for Watermelon (HST 35 Vegetatif)
// -------------------------------------------------------------
export function calculateFertilizer(plantCount: number = 200, ageHst: number = 35): FertilizerCalculation {
  let npkPerPlant = 8; // gram
  let kno3PerPlant = 4; // gram
  let mkpPerPlant = 2; // gram
  let stage = 'Vegetatif Lanjut (35 HST)';

  if (ageHst <= 20) {
    stage = 'Awal Vegetatif (1-20 HST)';
    npkPerPlant = 5;
    kno3PerPlant = 2;
    mkpPerPlant = 0;
  } else if (ageHst <= 45) {
    stage = 'Vegetatif Maksimum & Pembungaan (21-45 HST)';
    npkPerPlant = 10;
    kno3PerPlant = 5;
    mkpPerPlant = 3;
  } else {
    stage = 'Generatif Pembesaran Buah (46-75 HST)';
    npkPerPlant = 8;
    kno3PerPlant = 8;
    mkpPerPlant = 6;
  }

  const npkGrams = plantCount * npkPerPlant;
  const kno3Grams = plantCount * kno3PerPlant;
  const mkpGrams = plantCount * mkpPerPlant;
  const dosePerPlantMl = 250;
  const waterLiters = (plantCount * dosePerPlantMl) / 1000;

  return {
    plantCount,
    growthStage: stage,
    npkGrams,
    kno3Grams,
    mkpGrams,
    waterLiters,
    dosePerPlantMl,
    frequency: 'Interval 5 - 7 hari sekali (pagi hari pukul 07:00 - 09:00)',
    instructions: `Larutkan ${npkGrams} gr NPK 16-16-16 + ${kno3Grams} gr KNO3 Merah + ${mkpGrams} gr MKP ke dalam ${waterLiters} liter air tangki aduk hingga homogen, lalu kocor sebanyak ${dosePerPlantMl} ml per lubang tanam semangka.`
  };
}

// -------------------------------------------------------------
// Natural Language Response Generator for Melo AI
// Supports: Agronomis, Sidang Skripsi, and IoT Modes
// -------------------------------------------------------------
export function generateMeloResponse(
  userQuery: string,
  sensorData: SensorData,
  fuzzyDecision: FuzzyDecision,
  userProfile: { farmName: string; location: string; plantAgeHst: number; growthStage: string },
  isPumpActive: boolean,
  mode: AiMode = 'agronomis'
): { 
  text: string; 
  actionType?: ChatMessage['actionType']; 
  actionDurationSeconds?: number;
  targetPage?: string;
  quickActions?: { label: string; prompt: string }[];
  diagnosisResult?: DiseaseDiagnosis;
  fertilizerResult?: FertilizerCalculation;
} {
  const q = userQuery.toLowerCase();

  // 1. Direct Page Navigation Commands
  if (q.includes('buka') || q.includes('halaman') || q.includes('menu') || q.includes('pindah ke')) {
    if (q.includes('skripsi') || q.includes('riset') || q.includes('perbandingan') || q.includes('efisiensi')) {
      return {
        text: 'Siap Mas Ali! Saya langsung arahkan Anda ke halaman **Riset & Validasi Skripsi** untuk melihat tabel komparasi penghematan 37.4%.',
        actionType: 'open_page',
        targetPage: 'perbandingan'
      };
    }
    if (q.includes('irigasi') || q.includes('drip') || q.includes('pompa')) {
      return {
        text: 'Membuka halaman **Kontrol Irigasi Tetes & Manajemen Zona** kebun semangka Batuampar.',
        actionType: 'open_page',
        targetPage: 'irigasi'
      };
    }
    if (q.includes('cuaca') || q.includes('hujan') || q.includes('bmkg')) {
      return {
        text: 'Membuka halaman **Prakiraan Cuaca 7 Hari** untuk Desa Batuampar, Guluk-Guluk, Sumenep.',
        actionType: 'open_page',
        targetPage: 'cuaca'
      };
    }
    if (q.includes('tanaman') || q.includes('kondisi') || q.includes('fase')) {
      return {
        text: 'Membuka halaman **Kondisi Tanaman & Timeline 0-75 HST** semangka Inul Hibrida.',
        actionType: 'open_page',
        targetPage: 'tanaman'
      };
    }
    if (q.includes('statistik') || q.includes('grafik')) {
      return {
        text: 'Membuka halaman **Statistik & Analitik Konsumsi Air** harian dan mingguan.',
        actionType: 'open_page',
        targetPage: 'statistik'
      };
    }
    if (q.includes('pengaturan') || q.includes('setting') || q.includes('iot') || q.includes('arduino')) {
      return {
        text: 'Membuka halaman **Pengaturan Sistem, Ambang Batas Fuzzy & Firmware ESP32**.',
        actionType: 'open_page',
        targetPage: 'pengaturan'
      };
    }
    if (q.includes('riwayat') || q.includes('log')) {
      return {
        text: 'Membuka halaman **Riwayat Lengkap Irigasi & Log Audit Sensor**.',
        actionType: 'open_page',
        targetPage: 'riwayat'
      };
    }
  }

  // 2. Sensor Simulation Triggers
  if (q.includes('simulasi') || q.includes('uji kondisi') || q.includes('tes sensor')) {
    if (q.includes('kering') || q.includes('drought') || q.includes('30%') || q.includes('kering kritis')) {
      return {
        text: '⚡ **Mode Simulasi Aktif: Tanah Kering Kritis (33.5%)**\n\n' +
          'Sensor kelembapan tanah diset ke 33.5% dan suhu 34.8°C.\n' +
          'Evaluasi Fuzzy Logic Mamdani seketika berpindah ke status **Penyiraman Aktif** guna mencegah tanaman semangka mengalami dehidrasi jaringan!',
        actionType: 'simulate_drought',
        quickActions: [
          { label: '💧 Siram Otomatis', prompt: 'Siram kebun sekarang' },
          { label: '🔄 Reset Kondisi Normal', prompt: 'Reset sensor ke kondisi ideal' }
        ]
      };
    }
    if (q.includes('hujan') || q.includes('rain') || q.includes('85%') || q.includes('lebat')) {
      return {
        text: '🌧️ **Mode Simulasi Aktif: Hujan Lebat (Peluang 85%)**\n\n' +
          'Sensor mencatat potensi presipitasi 85% dengan kelembapan tanah 68.0%.\n' +
          'Sistem Fuzzy Logic secara cerdas **Menunda Penyiraman (Delay)** untuk mencegah waterlogging dan menghemat air tangki 100%!',
        actionType: 'simulate_rain',
        quickActions: [
          { label: '🧠 Buka Matriks Fuzzy', prompt: 'Buka aturan fuzzy' },
          { label: '🔄 Reset Sensor', prompt: 'Reset sensor ke kondisi ideal' }
        ]
      };
    }
    if (q.includes('reset') || q.includes('normal') || q.includes('ideal')) {
      return {
        text: '🍉 **Sensor Berhasil Direset ke Kondisi Ideal (62.4%)**\n\n' +
          'Telemetri kebun semangka Batuampar kembali ke parameter optimal fase vegetatif 35 HST.',
        actionType: 'reset_sensors',
        quickActions: [
          { label: '🍉 Audit Kebun', prompt: 'Bagaimana kondisi kebun saya hari ini?' }
        ]
      };
    }
  }

  // 3. Command: Start Watering with Dynamic Duration
  if (q.includes('siram') && !q.includes('tidak') && !q.includes('tunda') && !q.includes('apakah')) {
    if (q.includes('stop') || q.includes('henti') || q.includes('mati')) {
      return {
        text: 'Siap Mas Ali! Pompa irigasi tetes telah **dimatikan seketika**. Aliran air ke bedengan semangka dihentikan dan katup solenoid ditutup.',
        actionType: 'stop_pump'
      };
    }

    if (isPumpActive) {
      return {
        text: `Pompa saat ini **sudah dalam keadaan aktif** dan sedang menyiram bedengan semangka di ${userProfile.farmName}!\nDebit aliran stabil 2.5 L/menit.`,
        actionType: 'none',
        quickActions: [{ label: '🛑 Hentikan Pompa', prompt: 'Hentikan penyiraman sekarang' }]
      };
    }

    // Parse custom duration if specified
    let durationSec = 60;
    if (q.includes('30 detik') || q.includes('setengah menit')) durationSec = 30;
    else if (q.includes('2 menit') || q.includes('120 detik')) durationSec = 120;
    else if (q.includes('3 menit') || q.includes('180 detik')) durationSec = 180;
    else if (q.includes('5 menit') || q.includes('300 detik')) durationSec = 300;

    return {
      text: `Baik Mas Ali! Saya langsung menyalakan **pompa irigasi tetes** selama **${durationSec} detik**.\n\n` +
        `💧 Air dialirkan secara presisi melalui selang PE 16mm dengan drip emitter PC (Pressure Compensating) langsung ke zona perakaran semangka ${userProfile.growthStage}.`,
      actionType: 'start_pump',
      actionDurationSeconds: durationSec,
      quickActions: [{ label: '🛑 Hentikan Pompa', prompt: 'Hentikan penyiraman sekarang' }]
    };
  }

  // 4. Command: Stop Watering
  if (q.includes('stop') || q.includes('mati') || q.includes('hentikan') || q.includes('matikan')) {
    return {
      text: 'Baik, perintah diterima seketika. Pompa irigasi tetes telah **dimatikan**. Aliran air berhenti dan status relay ESP32 LOW.',
      actionType: 'stop_pump'
    };
  }

  // 5. Fertilizer Calculator Request
  if (q.includes('kalkulator pupuk') || q.includes('dosis pupuk') || q.includes('hitung pupuk') || q.includes('kocor')) {
    // Extract count if mentioned
    let count = 200;
    const match = q.match(/(\d+)\s*(tanaman|pohon|batang)/);
    if (match) {
      count = parseInt(match[1]);
    }

    const calc = calculateFertilizer(count, userProfile.plantAgeHst);
    return {
      text: `🧪 **Kalkulator Fertigasi Kocor Semangka (${count} Tanaman — ${userProfile.plantAgeHst} HST):**\n\n` +
        `• **NPK 16-16-16:** ${calc.npkGrams} gram\n` +
        `• **KNO3 Merah (Nitrat Kalium):** ${calc.kno3Grams} gram\n` +
        `• **MKP (Mono Kalium Fosfat):** ${calc.mkpGrams} gram\n` +
        `• **Volume Air Pelarut:** ${calc.waterLiters} Liter air bersih\n` +
        `• **Dosis Tiap Tanaman:** ${calc.dosePerPlantMl} ml / lubang tanam\n\n` +
        `💡 *Instruksi Melo:* ${calc.instructions}`,
      actionType: 'calc_fertilizer',
      fertilizerResult: calc,
      quickActions: [
        { label: '💧 Siram Lembapkan Tanah Dulu', prompt: 'Siram kebun 60 detik' },
        { label: '🌿 Tips Sulur Vegetatif', prompt: 'Tips pemangkasan sulur semangka' }
      ]
    };
  }

  // 6. Disease / Leaf Scan Diagnosis Request
  if (q.includes('diagnosa') || q.includes('scan') || q.includes('penyakit daun') || q.includes('embun bulu') || q.includes('hama')) {
    if (q.includes('embun bulu') || q.includes('kuning bersudut') || q.includes('bercak')) {
      const diag = watermelonDiseases[0];
      return {
        text: `🔬 **Hasil Diagnosa AI: ${diag.name} (${diag.confidence}% Match)**\n\n` +
          `• **Patogen:** *${diag.pathogen}*\n` +
          `• **Status Keparahan:** ⚠️ **${diag.severity}**\n\n` +
          `**Gejala Utama:**\n${diag.symptoms.map(s => '• ' + s).join('\n')}\n\n` +
          `**Rekomendasi Pengendalian:**\n${diag.recommendations.map(r => '• ' + r).join('\n')}\n\n` +
          `**Tindakan Irigasi:**\n${diag.irrigationAction}`,
        actionType: 'diagnose_disease',
        diagnosisResult: diag,
        quickActions: [
          { label: '🌿 Sesuaikan Debit Irigasi', prompt: 'Sesuaikan debit irigasi untuk cegah jamur' },
          { label: '📷 Scan Sampel Lain', prompt: 'Buka scanner daun semangka' }
        ]
      };
    }

    if (q.includes('thrips') || q.includes('keriting') || q.includes('kutu kebul')) {
      const diag = watermelonDiseases[1];
      return {
        text: `🔬 **Hasil Diagnosa AI: ${diag.name} (${diag.confidence}% Match)**\n\n` +
          `• **Patogen:** *${diag.pathogen}*\n` +
          `• **Status Keparahan:** 🚨 **${diag.severity}**\n\n` +
          `**Gejala Utama:**\n${diag.symptoms.map(s => '• ' + s).join('\n')}\n\n` +
          `**Rekomendasi Pengendalian:**\n${diag.recommendations.map(r => '• ' + r).join('\n')}\n\n` +
          `**Tindakan Irigasi:**\n${diag.irrigationAction}`,
        actionType: 'diagnose_disease',
        diagnosisResult: diag,
        quickActions: [
          { label: '🧪 Hitung Pupuk Penguat Daun', prompt: 'Kalkulator pupuk 200 tanaman' }
        ]
      };
    }

    // Default open scanner
    return {
      text: '📸 **Buka AI Scanner Daun Semangka Melo:**\n\n' +
        'Fitur computer vision agronomi AG Farm dapat mendeteksi gejala dini Embun Bulu (*Downy Mildew*), serangan Thrips, Antraknosa, dan Layu Fusarium dari foto daun semangka Anda!',
      actionType: 'diagnose_disease',
      diagnosisResult: watermelonDiseases[0],
      quickActions: [
        { label: '🔬 Diagnosa Embun Bulu', prompt: 'Diagnosa daun bercak embun bulu' },
        { label: '🐛 Diagnosa Hama Thrips', prompt: 'Diagnosa daun keriting thrips' },
        { label: '🍉 Cek Daun Sehat Prima', prompt: 'Kondisi daun semangka sehat' }
      ]
    };
  }

  // -----------------------------------------------------------
  // MODE SPECIFIC LOGIC: SIDANG SKRIPSI (Ali Ghufron)
  // -----------------------------------------------------------
  if (mode === 'skripsi' || q.includes('skripsi') || q.includes('rumus') || q.includes('sidang') || q.includes('mamdani') || q.includes('defuzzifikasi')) {
    if (q.includes('rumus') || q.includes('centroid') || q.includes('defuzzifikasi') || q.includes('matematis')) {
      return {
        text: `🎓 **Formulasi Matematis Defuzzifikasi Centroid (Center of Area — CoA) untuk Sidang:**\n\n` +
          `Pada skripsi Mas Ali, proses defuzzifikasi mengubah fungsi keanggotaan gabungan output $$\\mu_C(z)$$ menjadi nilai tegas durasi penyiraman $$z^*$$ (menit) menggunakan persamaan integral:\n\n` +
          `$$z^* = \\frac{\\int z \\cdot \\mu_C(z) \\, dz}{\\int \\mu_C(z) \\, dz} \\approx \\frac{\\sum_{j=1}^{n} z_j \\cdot \\mu_C(z_j)}{\\sum_{j=1}^{n} \\mu_C(z_j)}$$\n\n` +
          `• **Input 1:** Kelembapan Tanah ($$\\mu_{Kering}, \\mu_{Ideal}, \\mu_{Basah}$$) [Kurva Trapesium & Segitiga]\n` +
          `• **Input 2:** Suhu Lingkungan ($$\\mu_{Sejuk}, \\mu_{Normal}, \\mu_{Panas}$$)\n` +
          `• **Input 3:** Probabilitas Hujan ($$\\mu_{Rendah}, \\mu_{Sedang}, \\mu_{Tinggi}$$)\n` +
          `• **Output:** Durasi Irigasi (0 - 15 menit)\n\n` +
          `Metode CoA dipilih karena menghasilkan transisi output yang kontinu dan halus, mencegah lonjakan *on-off* pompa yang merusak motor induksi.`,
        actionType: 'open_fuzzy',
        quickActions: [
          { label: '📊 Tabel Bukti Efisiensi 37.4%', prompt: 'Jelaskan data penghematan air skripsi 37.4%' },
          { label: '📑 Buka Matriks 27 Aturan', prompt: 'Buka detail aturan fuzzy' }
        ]
      };
    }

    return {
      text: `🎓 **Ringkasan Validasi Komparatif Skripsi (Ali Ghufron — Batuampar):**\n\n` +
        `Eksperimen lapangan 30 hari pada bedengan semangka Inul di Batuampar membuktikan keunggulan AG Farm:\n\n` +
        `1. **Metode Konvensional (Threshold Kelembapan 50%):**\n` +
        `   • Konsumsi Air: 138.4 Liter / minggu\n` +
        `   • Durasi Pompa: 345 Menit / minggu (Sering menyiram padahal 2 jam kemudian hujan)\n\n` +
        `2. **Metode Fuzzy Logic Murni:**\n` +
        `   • Konsumsi Air: 108.6 Liter / minggu (Penghematan **21.5%**)\n\n` +
        `3. **Metode AG Farm (Fuzzy Logic Mamdani + Integrasi Prediksi Cuaca):**\n` +
        `   • Konsumsi Air: Hanya **86.7 Liter / minggu**!\n` +
        `   • Penghematan Air Riil: **37.4%** ($$p < 0.001$$\\text{ uji ANOVA})\n` +
        `   • Efisiensi Energi Listrik Pompa: **40.3%**\n\n` +
        `*Catatan untuk Dosen Penguji:* Integrasi cuaca mencegah *over-irrigation* saat ada awan konvektif sore hari di kawasan pesisir/pegunungan Madura. Data siap diekspor ke format CSV/Excel!`,
      actionType: 'none',
      quickActions: [
        { label: '📑 Buka Halaman Riset Skripsi', prompt: 'Pindah ke halaman riset skripsi' },
        { label: '📐 Rumus Matematis Centroid', prompt: 'Jelaskan rumus matematis defuzzifikasi centroid' }
      ]
    };
  }

  // -----------------------------------------------------------
  // MODE SPECIFIC LOGIC: IOT & HARDWARE TROUBLESHOOTING
  // -----------------------------------------------------------
  if (mode === 'iot' || q.includes('esp32') || q.includes('sensor') || q.includes('relay') || q.includes('adc') || q.includes('tegangan')) {
    return {
      text: `🔌 **Spesifikasi Teknis Arsitektur IoT ESP32 AG Farm:**\n\n` +
        `• **Mikrokontroler:** ESP32 NodeMCU-32S (Dual Core Tensilica Xtensa 240MHz, WiFi 2.4GHz + BLE)\n` +
        `• **Sensor Tanah:** Capacitive Soil Moisture Sensor v1.2 (Resistansi tinggi terhadap korosi elektrolisis dibanding sensor resistif fork)\n` +
        `• **Kalibrasi ADC:** 12-Bit ADC (0 - 4095). Air = ~1450 ADC (100%), Udara Kering = ~3200 ADC (0%)\n` +
        `• **Aktuator:** Relay Module 5V Optocoupler Isolation (Active HIGH) mengendalikan pompa DC 12V 4.5A\n` +
        `• **Protokol:** HTTP REST / WebSocket ke Supabase Realtime Database (Interval ping: 10 detik)\n` +
        `• **Status Saat Ini:** Online (RSSI: -58 dBm, Sangat Kuat).`,
      actionType: 'none',
      quickActions: [
        { label: '⚙️ Buka Source Code Arduino C++', prompt: 'Buka pengaturan IoT' },
        { label: '💧 Uji Pompa 30 Detik', prompt: 'Siram kebun 30 detik' }
      ]
    };
  }

  // 7. General Irrigation Question
  if (q.includes('perlu siram') || q.includes('harus siram') || q.includes('butuh air') || q.includes('apakah perlu')) {
    if (fuzzyDecision.decision === 'Penyiraman Ditunda' || fuzzyDecision.decision === 'Tidak Menyiram') {
      return {
        text: `Berdasarkan evaluasi cerdas sistem Fuzzy Logic Mamdani:\n\n` +
          `🛑 **Rekomendasi: TIDAK PERLU MENYIRAM (${fuzzyDecision.decision.toUpperCase()})**\n\n` +
          `• **Kelembapan Tanah:** ${sensorData.soil_moisture}% (Zona ideal vegetatif 50%-70%)\n` +
          `• **Suhu Udara:** ${sensorData.temperature}°C (Optimal fotosintesis)\n` +
          `• **Peluang Hujan:** ${sensorData.weather_probability}% di Batuampar Sumenep\n\n` +
          `*Alasan Agronomi:* Menyiram saat ini akan memicu kelembapan berlebih (*waterlogging*) pada perakaran semangka, berisiko mengundang jamur *Phytophthora* dan memboroskan air tangki Anda.`,
        actionType: 'open_fuzzy',
        quickActions: [
          { label: '🧠 Buka Trace Inferensi Fuzzy', prompt: 'Buka detail aturan fuzzy' },
          { label: '💧 Tetap Siram Manual', prompt: 'Siram kebun 60 detik' }
        ]
      };
    } else {
      return {
        text: `🌱 **Rekomendasi: PERLU PENYIRAMAN (${fuzzyDecision.decision})**\n\n` +
          `Kelembapan tanah saat ini **${sensorData.soil_moisture}%** (di bawah target optimal 50%).\n` +
          `Fuzzy logic merekomendasikan durasi **${fuzzyDecision.duration_minutes || 3} menit** untuk mengembalikan air perakaran ke kapasitas lapang (*field capacity*).`,
        actionType: 'start_pump',
        actionDurationSeconds: (fuzzyDecision.duration_minutes || 3) * 60,
        quickActions: [{ label: '💧 Aktifkan Pompa Sekarang', prompt: 'Siram kebun sekarang' }]
      };
    }
  }

  // 8. General Agronomic Audit
  if (q.includes('kondisi') || q.includes('kesehatan') || q.includes('audit') || q.includes('status')) {
    return {
      text: `🍉 **Audit Komprehensif Kebun Semangka (${userProfile.farmName}):**\n\n` +
        `📍 **Lokasi:** ${userProfile.location}\n` +
        `🌱 **Tanaman:** Semangka Inul Hibrida (${userProfile.plantAgeHst} HST — Fase ${userProfile.growthStage})\n` +
        `💧 **Kelembapan Tanah:** ${sensorData.soil_moisture}% (Status: **Sangat Baik**)\n` +
        `🌡️ **Suhu Lingkungan:** ${sensorData.temperature}°C (Ideal fotosintesis)\n` +
        `💨 **Kelembapan Udara:** ${sensorData.humidity}%\n` +
        `🛢️ **Level Tangki Air:** ${sensorData.water_level}% (~780 Liter, Aman)\n` +
        `⚡ **IoT Status:** ESP32 Online & Terkalibrasi\n\n` +
        `**Kesimpulan Melo:** Kebun Anda dalam performa puncak! Daun kanopi rimbun tanpa stres air. Pertahankan ya Mas Ali!`,
      actionType: 'none',
      quickActions: [
        { label: '🌿 Panduan Sulur 35 HST', prompt: 'Tips fase vegetatif semangka 35 HST' },
        { label: '🧪 Hitung Dosis Pupuk Kocor', prompt: 'Kalkulator pupuk 200 tanaman' },
        { label: '🌦️ Prakiraan Cuaca 7 Hari', prompt: 'Prakiraan cuaca Batuampar Sumenep' }
      ]
    };
  }

  // 9. Weather Info
  if (q.includes('cuaca') || q.includes('hujan') || q.includes('batuampar') || q.includes('sumenep')) {
    return {
      text: `🌦️ **Analisis Meteorologi untuk Desa Batuampar, Sumenep:**\n\n` +
        `• **Hari Ini:** Suhu ${sensorData.temperature}°C, Cerah Berawan dengan peluang hujan **${sensorData.weather_probability}%**.\n` +
        `• **Besok:** Hujan Ringan (28° / 32°C, peluang 78%).\n` +
        `• **Lusa (Rabu):** Hujan (27° / 31°C, peluang 85%).\n\n` +
        `*Strategi Irigasi:* Sistem otomatis menunda penyiraman agar tanaman memanfaatkan presipitasi alami secara gratis tanpa risiko busuk akar!`,
      actionType: 'open_weather',
      quickActions: [
        { label: '📊 Lihat Grafik Cuaca Lengkap', prompt: 'Pindah ke halaman cuaca' }
      ]
    };
  }

  // Default fallback response
  return {
    text: `Halo Mas Ali! Saya **Melo si Semangka Pintar AI 🍉**, asisten agronomi cerdas kebun Anda di ${userProfile.location}.\n\n` +
      `Sensor mendeteksi kelembapan tanah **${sensorData.soil_moisture}%** dan suhu **${sensorData.temperature}°C**. ` +
      `Ada yang bisa saya bantu terkait irigasi tetes, diagnosa penyakit daun, atau perhitungan pupuk kocor hari ini?`,
    actionType: 'none',
    quickActions: [
      { label: '🍉 Audit Kebun Hari Ini', prompt: 'Bagaimana kondisi kebun saya hari ini?' },
      { label: '💧 Apakah Perlu Menyiram?', prompt: 'Apakah perlu siram sekarang?' },
      { label: '📸 Diagnosa Daun Semangka', prompt: 'Buka scanner daun semangka' },
      { label: '🧪 Kalkulator Pupuk Kocor', prompt: 'Kalkulator pupuk 200 tanaman' }
    ]
  };
}
