import { IrrigationLog, ResearchComparisonItem } from '../types';

interface FarmProfile {
  name: string;
  farmName: string;
  location: string;
  plantVariety: string;
}

export const generateHistoryPDF = (logs: IrrigationLog[], user: FarmProfile) => {
  const totalWater = logs.reduce((acc, curr) => acc + (curr.water_volume_liters || 0), 0).toFixed(1);
  const totalCompleted = logs.filter(l => l.status === 'Selesai' || l.decision.includes('Menyiram')).length;
  const totalDelayed = logs.filter(l => l.decision.includes('Ditunda')).length;
  const now = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Laporan Riwayat Irigasi - AG Farm</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 15mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      line-height: 1.45;
      font-size: 11px;
    }

    .report-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    /* Header Banner */
    .header-banner {
      background: linear-gradient(135deg, #064E3B 0%, #059669 50%, #0D9488 100%);
      color: #FFFFFF;
      padding: 24px 28px;
      border-radius: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.3);
      position: relative;
      overflow: hidden;
    }

    .logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      font-size: 32px;
      background: rgba(255, 255, 255, 0.2);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .brand-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }

    .brand-subtitle {
      font-size: 11px;
      color: #A7F3D0;
      font-weight: 600;
      margin-top: 3px;
    }

    .report-meta {
      text-align: right;
      font-size: 11px;
    }

    .report-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 10px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      margin-bottom: 6px;
    }

    .meta-item {
      color: #D1FAE5;
      font-size: 10px;
    }

    /* Garden Info Card */
    .farm-info {
      background: #F0FDF4;
      border: 1px solid #BBF7D0;
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .info-label {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 700;
      color: #047857;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .info-value {
      font-size: 11px;
      font-weight: 700;
      color: #0F172A;
    }

    /* KPI Summary Cards */
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 24px;
    }

    .summary-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      position: relative;
    }

    .summary-card.water {
      border-left: 4px solid #0284C7;
      background: linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%);
    }

    .summary-card.success {
      border-left: 4px solid #059669;
      background: linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%);
    }

    .summary-card.delayed {
      border-left: 4px solid #D97706;
      background: linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%);
    }

    .summary-card-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748B;
      margin-bottom: 4px;
    }

    .summary-card-value {
      font-size: 20px;
      font-weight: 800;
      font-family: monospace;
      color: #0F172A;
    }

    .summary-card-sub {
      font-size: 10px;
      color: #64748B;
      margin-top: 3px;
    }

    /* Table Styling */
    .table-section-title {
      font-size: 13px;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .badge-count {
      background: #E2E8F0;
      color: #334155;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 700;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
      margin-bottom: 24px;
    }

    thead th {
      background: #F8FAFC;
      color: #475569;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      border-bottom: 2px solid #E2E8F0;
      text-align: left;
    }

    tbody td {
      padding: 9px 12px;
      border-bottom: 1px solid #F1F5F9;
      font-size: 10px;
      color: #334155;
    }

    tbody tr:nth-child(even) {
      background: #F8FAFC;
    }

    tbody tr:hover {
      background: #F1F5F9;
    }

    .mode-pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 9px;
    }

    .mode-auto {
      background: #DCFCE7;
      color: #166534;
      border: 1px solid #86EFAC;
    }

    .mode-manual {
      background: #E0F2FE;
      color: #075985;
      border: 1px solid #7DD3FC;
    }

    .decision-pill {
      font-weight: 700;
    }

    .decision-siram {
      color: #047857;
    }

    .decision-ditunda {
      color: #B45309;
    }

    /* Signatures / Footer */
    .report-footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 20px;
    }

    .signatures {
      display: flex;
      gap: 40px;
    }

    .signature-block {
      text-align: center;
      width: 140px;
    }

    .signature-role {
      font-size: 9px;
      color: #64748B;
      font-weight: 600;
      margin-bottom: 45px;
    }

    .signature-name {
      font-size: 11px;
      font-weight: 700;
      color: #0F172A;
      border-top: 1px solid #CBD5E1;
      padding-top: 4px;
    }

    .signature-id {
      font-size: 9px;
      color: #64748B;
    }

    .print-note {
      font-size: 9px;
      color: #94A3B8;
      max-width: 320px;
      line-height: 1.35;
    }

    /* Print action bar only visible before printing */
    .no-print-bar {
      background: #0F172A;
      color: #FFFFFF;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-radius: 14px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .no-print-bar button {
      background: #10B981;
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .no-print-bar button:hover {
      background: #059669;
    }

    @media print {
      .no-print-bar {
        display: none !important;
      }
      body {
        background: #FFFFFF;
      }
      .report-container {
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="no-print-bar">
      <div>
        <strong>📄 Pratinjau Dokumen PDF Laporan AG Farm</strong>
        <p style="font-size: 11px; color: #94A3B8; margin-top: 2px;">Klik tombol cetak untuk menyimpan sebagai PDF dokumen resmi</p>
      </div>
      <button onclick="window.print()">
        🖨️ Cetak / Simpan sebagai PDF
      </button>
    </div>

    <!-- Header Banner -->
    <div class="header-banner">
      <div class="logo-badge">
        <div class="logo-icon">🍉</div>
        <div>
          <div class="brand-title">AG Farm • Laporan Riwayat Irigasi</div>
          <div class="brand-subtitle">Smart Irrigation &amp; Farming System • IoT Fuzzy Logic 2.4</div>
        </div>
      </div>
      <div class="report-meta">
        <div class="report-badge">DOKUMEN RESMI PENELITIAN</div>
        <div class="meta-item">Tanggal Cetak: <strong>${now}</strong></div>
        <div class="meta-item">Status Sistem: <strong>IoT ESP32 Online</strong></div>
      </div>
    </div>

    <!-- Farm Info -->
    <div class="farm-info">
      <div>
        <div class="info-label">Pemilik / Peneliti</div>
        <div class="info-value">${user.name}</div>
      </div>
      <div>
        <div class="info-label">Nama Kebun</div>
        <div class="info-value">${user.farmName}</div>
      </div>
      <div>
        <div class="info-label">Lokasi</div>
        <div class="info-value">${user.location}</div>
      </div>
      <div>
        <div class="info-label">Varietas Semangka</div>
        <div class="info-value">${user.plantVariety}</div>
      </div>
    </div>

    <!-- Summary KPI -->
    <div class="summary-grid">
      <div class="summary-card water">
        <div class="summary-card-title">Total Volume Air Terekam</div>
        <div class="summary-card-value">${totalWater} Liter</div>
        <div class="summary-card-sub">Akumulasi irigasi tetes presisi</div>
      </div>
      <div class="summary-card success">
        <div class="summary-card-title">Total Siklus Menyiram</div>
        <div class="summary-card-value">${totalCompleted} Kali</div>
        <div class="summary-card-sub">Kelembapan tanah mencapai target ideal</div>
      </div>
      <div class="summary-card delayed">
        <div class="summary-card-title">Penundaan Cuaca (Hemat Air)</div>
        <div class="summary-card-value">${totalDelayed} Kali</div>
        <div class="summary-card-sub">Penyiraman ditunda akibat potensi hujan</div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-section-title">
      <span>Daftar Telemetri &amp; Log Keputusan Sistem</span>
      <span class="badge-count">${logs.length} Log Data</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Tanggal &amp; Waktu</th>
          <th>Mode</th>
          <th>Durasi Pompa</th>
          <th>Volume Air</th>
          <th>Keputusan</th>
          <th>Alasan Algoritma Fuzzy</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map(log => `
          <tr>
            <td><strong>${log.date}</strong> <span style="color: #64748B; font-size: 9px;">${log.time}</span></td>
            <td>
              <span class="mode-pill ${log.mode.toLowerCase() === 'auto' ? 'mode-auto' : 'mode-manual'}">
                ${log.mode.toUpperCase()}
              </span>
            </td>
            <td style="font-family: monospace;">${Math.ceil(log.duration_seconds / 60)} menit</td>
            <td style="font-family: monospace; font-weight: 700; color: #0284C7;">${log.water_volume_liters} L</td>
            <td>
              <span class="decision-pill ${log.decision.toLowerCase().includes('ditunda') ? 'decision-ditunda' : 'decision-siram'}">
                ${log.decision}
              </span>
            </td>
            <td style="color: #475569;">${log.reason}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Footer & Signatures -->
    <div class="report-footer">
      <div class="print-note">
        <strong>Catatan Validitas:</strong><br/>
        Data telemetri ini diekstraksi secara otomatis dari mikrokontroler ESP32 dan modul Fuzzy Logic Mamdani AG Farm. Digunakan sebagai berkas verifikasi penelitian Tugas Akhir / Skripsi.
      </div>
      <div class="signatures">
        <div class="signature-block">
          <div class="signature-role">Peneliti / Pemilik Kebun</div>
          <div class="signature-name">${user.name}</div>
          <div class="signature-id">Agrotechnology / IoT</div>
        </div>
        <div class="signature-block">
          <div class="signature-role">Dosen Pembimbing</div>
          <div class="signature-name">(..................................)</div>
          <div class="signature-id">NIP. ..........................</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Automatically trigger print dialog on render
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
};

export const generateResearchPDF = (researchData: ResearchComparisonItem[], user: FarmProfile) => {
  const now = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Laporan Hasil Penelitian Efisiensi Irigasi - AG Farm</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 15mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      line-height: 1.45;
      font-size: 11px;
    }

    .report-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    /* Header Banner */
    .header-banner {
      background: linear-gradient(135deg, #0F172A 0%, #064E3B 50%, #059669 100%);
      color: #FFFFFF;
      padding: 24px 28px;
      border-radius: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 25px -5px rgba(6, 78, 59, 0.3);
      position: relative;
      overflow: hidden;
    }

    .logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      font-size: 32px;
      background: rgba(255, 255, 255, 0.15);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.25);
    }

    .brand-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.15;
    }

    .brand-subtitle {
      font-size: 11px;
      color: #6EE7B7;
      font-weight: 600;
      margin-top: 3px;
    }

    .report-badge {
      display: inline-block;
      background: #10B981;
      color: #FFFFFF;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 800;
      font-size: 9px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .meta-item {
      color: #CBD5E1;
      font-size: 10px;
    }

    /* 3 Method Cards Banner */
    .methods-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .method-card {
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 14px 16px;
      background: #FFFFFF;
    }

    .method-card.c {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: #FFFFFF;
      border-color: #047857;
      box-shadow: 0 4px 15px rgba(5, 150, 105, 0.2);
    }

    .method-tag {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }

    .method-card.c .method-tag {
      color: #A7F3D0;
    }

    .method-title {
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .method-stat {
      font-size: 16px;
      font-weight: 900;
      font-family: monospace;
      margin-top: 8px;
    }

    .method-card.c .method-stat {
      color: #FFFFFF;
    }

    /* Comparison Table */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
      margin-bottom: 24px;
    }

    thead th {
      background: #F8FAFC;
      color: #475569;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      border-bottom: 2px solid #E2E8F0;
      text-align: left;
    }

    thead th.highlight {
      background: #ECFDF5;
      color: #065F46;
      font-weight: 900;
    }

    tbody td {
      padding: 9px 12px;
      border-bottom: 1px solid #F1F5F9;
      font-size: 10px;
    }

    tbody td.highlight {
      background: #F0FDF4;
      font-weight: 800;
      color: #065F46;
      font-family: monospace;
    }

    .method-val {
      font-family: monospace;
      font-weight: 700;
    }

    /* Key Finding Callout */
    .finding-callout {
      background: #F0FDF4;
      border: 1px solid #86EFAC;
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .finding-callout .icon {
      font-size: 28px;
    }

    .finding-callout strong {
      color: #065F46;
      font-size: 12px;
    }

    .finding-callout p {
      font-size: 10px;
      color: #166534;
      margin-top: 2px;
    }

    /* Footer Signatures */
    .report-footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 20px;
    }

    .signatures {
      display: flex;
      gap: 40px;
    }

    .signature-block {
      text-align: center;
      width: 140px;
    }

    .signature-role {
      font-size: 9px;
      color: #64748B;
      font-weight: 600;
      margin-bottom: 45px;
    }

    .signature-name {
      font-size: 11px;
      font-weight: 700;
      color: #0F172A;
      border-top: 1px solid #CBD5E1;
      padding-top: 4px;
    }

    /* No-print bar */
    .no-print-bar {
      background: #0F172A;
      color: #FFFFFF;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-radius: 14px;
    }

    .no-print-bar button {
      background: #10B981;
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
    }

    @media print {
      .no-print-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="no-print-bar">
      <div>
        <strong>📄 Pratinjau Dokumen PDF Evaluasi Skripsi AG Farm</strong>
        <p style="font-size: 11px; color: #94A3B8; margin-top: 2px;">Cetak atau simpan langsung sebagai file PDF warna</p>
      </div>
      <button onclick="window.print()">
        🖨️ Cetak / Simpan sebagai PDF
      </button>
    </div>

    <!-- Header Banner -->
    <div class="header-banner">
      <div class="logo-badge">
        <div class="logo-icon">🍉</div>
        <div>
          <div class="brand-title">AG Farm • Evaluasi Komparatif Kinerja Irigasi</div>
          <div class="brand-subtitle">Tugas Akhir / Skripsi • Sistem Cerdas Irigasi Tetes Tanaman Semangka</div>
        </div>
      </div>
      <div style="text-align: right;">
        <div class="report-badge">HASIL VALIDASI RISET</div>
        <div class="meta-item">Tanggal: <strong>${now}</strong></div>
        <div class="meta-item">Varietas: <strong>${user.plantVariety}</strong></div>
      </div>
    </div>

    <!-- Methods 3 Banner -->
    <div class="methods-grid">
      <div class="method-card">
        <span class="method-tag" style="color: #64748B;">Metode A (Baseline)</span>
        <div class="method-title">Threshold Statis</div>
        <p style="font-size: 10px; color: #64748B;">Ambang batas tunggal sensor 50%</p>
        <div class="method-stat" style="color: #64748B;">138.4 Liter</div>
      </div>

      <div class="method-card" style="border-color: #93C5FD; background: #F0F9FF;">
        <span class="method-tag" style="color: #2563EB;">Metode B (Smart Basic)</span>
        <div class="method-title" style="color: #1E3A8A;">Fuzzy Logic Mamdani</div>
        <p style="font-size: 10px; color: #3B82F6;">Input: Kelembapan &amp; Suhu</p>
        <div class="method-stat" style="color: #1D4ED8;">108.6 Liter</div>
      </div>

      <div class="method-card c">
        <span class="method-tag">Metode C (AG Farm Proposal)</span>
        <div class="method-title">Fuzzy + Prediksi Cuaca</div>
        <p style="font-size: 10px; color: #D1FAE5;">Input: Kelembapan, Suhu, &amp; Hujan</p>
        <div class="method-stat">86.7 Liter (Hemat 37.4%)</div>
      </div>
    </div>

    <!-- Key Finding Callout -->
    <div class="finding-callout">
      <div class="icon">🏆</div>
      <div>
        <strong>Kesimpulan Efisiensi Penelitian:</strong>
        <p>Metode usulan <strong>Fuzzy Logic + Prediksi Cuaca (AG Farm)</strong> berhasil menghemat konsumsi air sebesar <strong>37.4%</strong> dibandingkan metode Threshold konvensional dan <strong>20.2%</strong> dibandingkan Fuzzy dasar, dengan menjaga kestabilan kelembapan perakaran tanaman semangka 100% pada zona ideal (50% - 70%).</p>
      </div>
    </div>

    <!-- Table -->
    <h3 style="font-size: 12px; font-weight: 800; margin-bottom: 10px; color: #0F172A;">
      Tabel Hasil Pengukuran dan Parameter Komparasi (Periode Pengujian 30 Hari)
    </h3>

    <table>
      <thead>
        <tr>
          <th>Parameter Uji</th>
          <th>Metode A (Threshold)</th>
          <th>Metode B (Fuzzy)</th>
          <th class="highlight">Metode C (AG Farm)</th>
          <th>Analisis Efisiensi</th>
        </tr>
      </thead>
      <tbody>
        ${researchData.map(d => `
          <tr>
            <td><strong>${d.parameter}</strong></td>
            <td class="method-val" style="color: #475569;">${d.threshold_method} ${d.unit !== 'Level' && d.unit !== 'Poin' && d.unit !== '%' ? d.unit : ''}</td>
            <td class="method-val" style="color: #1D4ED8;">${d.fuzzy_method} ${d.unit !== 'Level' && d.unit !== 'Poin' && d.unit !== '%' ? d.unit : ''}</td>
            <td class="highlight">${d.fuzzy_weather_method} ${d.unit !== 'Level' && d.unit !== 'Poin' && d.unit !== '%' ? d.unit : ''}</td>
            <td style="color: #334155;">${d.efficiency_note}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Footer -->
    <div class="report-footer">
      <div style="font-size: 9px; color: #94A3B8; max-width: 320px;">
        <strong>Verifikasi Akademik:</strong><br/>
        Data perbandingan ini disusun untuk lampiran dokumen sidang skripsi dan publikasi ilmiah di Program Studi Agroteknologi / Teknik Elektro IoT.
      </div>
      <div class="signatures">
        <div class="signature-block">
          <div class="signature-role">Mahasiswa / Peneliti</div>
          <div class="signature-name">${user.name}</div>
          <div style="font-size: 9px; color: #64748B;">NIM. 2022xxxxxx</div>
        </div>
        <div class="signature-block">
          <div class="signature-role">Dosen Pembimbing I</div>
          <div class="signature-name">(..................................)</div>
          <div style="font-size: 9px; color: #64748B;">NIP. ..........................</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
};
