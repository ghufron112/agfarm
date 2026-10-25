import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Droplets, 
  Square, 
  Brain, 
  CloudRain, 
  Sprout, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  CheckCircle2,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Scan,
  Camera,
  Upload,
  RotateCcw,
  FlaskConical,
  GraduationCap,
  Cpu,
  Copy,
  Check,
  AlertTriangle,
  Play,
  FileText,
  Activity,
  Layers
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { 
  ChatMessage, 
  generateMeloResponse, 
  AiMode, 
  watermelonDiseases, 
  DiseaseDiagnosis,
  calculateFertilizer,
  FertilizerCalculation
} from '../data/meloAiKnowledge';
import { 
  playBubblePop, 
  playPumpStartSound, 
  playScannerLaser, 
  playSuccessChime, 
  speakIndonesian, 
  stopSpeaking 
} from '../utils/soundEffects';

type MeloTab = 'chat' | 'scanner' | 'fertilizer';

export const MascotMelo: React.FC = () => {
  const { 
    sensorData, 
    fuzzyDecision, 
    user, 
    isPumpActive, 
    pumpRemainingSeconds,
    startWatering, 
    stopWatering,
    setIsFuzzyModalOpen,
    setCurrentPage,
    simulateSensorCondition,
    showMascotDialog,
    setShowMascotDialog
  } = useFarm();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showMascotDialog) {
      setIsOpen(true);
      setShowMascotDialog(false);
    }
  }, [showMascotDialog, setShowMascotDialog]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<MeloTab>('chat');
  const [aiMode, setAiMode] = useState<AiMode>('agronomis');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Floating bubble tip rotating every 9 seconds
  const [bubbleTipIndex, setBubbleTipIndex] = useState(0);
  const bubbleTips = [
    'Halo Mas Ali! Ada yang ingin ditanyakan seputar semangka? 🍉',
    'Kelembapan tanah saat ini ideal di 62%, perakaran aman! 🌱',
    'Peluang hujan 78% di Batuampar sore nanti, hemat air ya! 🌧️',
    'Coba fitur AI Scanner Daun untuk deteksi dini embun bulu 🔬'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBubbleTipIndex((prev) => (prev + 1) % bubbleTips.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Chat state
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-init',
    sender: 'melo',
    text: `Halo Mas Ali! 👋 Saya **Melo 🍉**, AI Agronomist & Asisten Riset Anda di **${user.farmName}**.\n\n` +
      `Sensor mendeteksi kelembapan tanah **${sensorData.soil_moisture}%** dan suhu **${sensorData.temperature}°C**.\n\n` +
      `Pilih mode diskusi di atas: **🌱 Agronomis**, **🎓 Sidang Skripsi**, atau **⚡ IoT ESP32**!`,
    timestamp: 'Baru saja',
    quickActions: [
      { label: '🍉 Audit Kebun Hari Ini', prompt: 'Bagaimana kondisi kebun saya hari ini?' },
      { label: '💧 Apakah Perlu Menyiram?', prompt: 'Apakah perlu siram sekarang?' },
      { label: '🔬 Buka AI Scanner Daun', prompt: 'Buka scanner daun semangka' },
      { label: '🧪 Hitung Dosis Pupuk', prompt: 'Kalkulator pupuk 200 tanaman' },
      { label: '🎓 Bukti Riset Skripsi 37.4%', prompt: 'Jelaskan data penghematan air skripsi 37.4%' }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scanner Tab State
  const [selectedDisease, setSelectedDisease] = useState<DiseaseDiagnosis>(watermelonDiseases[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);

  // Fertilizer Tab State
  const [plantCountInput, setPlantCountInput] = useState<number>(200);
  const [fertilizerResult, setFertilizerResult] = useState<FertilizerCalculation>(
    calculateFertilizer(200, user.plantAgeHst)
  );

  useEffect(() => {
    setFertilizerResult(calculateFertilizer(plantCountInput, user.plantAgeHst));
  }, [plantCountInput, user.plantAgeHst]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, activeTab]);

  // Handle Text-to-Speech playback
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (isSpeaking === msgId) {
      stopSpeaking();
      setIsSpeaking(null);
    } else {
      stopSpeaking();
      setIsSpeaking(msgId);
      speakIndonesian(text, () => {
        setIsSpeaking(null);
      });
    }
  };

  // Speech Recognition (Speech-to-Text)
  const handleToggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognitionClass = 
      (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('Fitur Voice Input memerlukan browser yang mendukung Web Speech API (Chrome / Edge).');
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'id-ID';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    if (isAudioEnabled) {
      playBubblePop();
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateMeloResponse(
        text,
        sensorData,
        fuzzyDecision,
        {
          farmName: user.farmName,
          location: user.location,
          plantAgeHst: user.plantAgeHst,
          growthStage: user.growthStage
        },
        isPumpActive,
        aiMode
      );

      // Execute actions
      if (response.actionType === 'start_pump') {
        const dur = response.actionDurationSeconds || 60;
        startWatering(dur);
        if (isAudioEnabled) playPumpStartSound();
      } else if (response.actionType === 'stop_pump') {
        stopWatering();
      } else if (response.actionType === 'open_page' && response.targetPage) {
        setCurrentPage(response.targetPage as any);
        if (isAudioEnabled) playSuccessChime();
      } else if (response.actionType === 'simulate_drought') {
        simulateSensorCondition('drought');
        if (isAudioEnabled) playSuccessChime();
      } else if (response.actionType === 'simulate_rain') {
        simulateSensorCondition('rain');
        if (isAudioEnabled) playSuccessChime();
      } else if (response.actionType === 'reset_sensors') {
        simulateSensorCondition('ideal');
        if (isAudioEnabled) playSuccessChime();
      }

      if (isAudioEnabled) {
        playBubblePop();
      }

      const meloMsg: ChatMessage = {
        id: `melo-${Date.now()}`,
        sender: 'melo',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        aiMode,
        actionType: response.actionType,
        actionDurationSeconds: response.actionDurationSeconds,
        quickActions: response.quickActions,
        diagnosisResult: response.diagnosisResult,
        fertilizerResult: response.fertilizerResult
      };

      setMessages((prev) => [...prev, meloMsg]);
      setIsTyping(false);
    }, 650);
  };

  // Run AI Scan diagnostic simulation
  const handleStartScan = (disease: DiseaseDiagnosis) => {
    setSelectedDisease(disease);
    setIsScanning(true);
    setScanProgress(0);
    setScanCompleted(false);

    if (isAudioEnabled) {
      playScannerLaser();
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setScanCompleted(true);
        if (isAudioEnabled) {
          playSuccessChime();
        }
      }
    }, 250);
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImageSrc(event.target?.result as string);
        // Randomly simulate diagnosis on uploaded photo
        const detected = watermelonDiseases[0];
        handleStartScan(detected);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMoodBadge = () => {
    if (isPumpActive) return { label: 'Menyiram 💧', bg: 'bg-cyan-500 text-white' };
    if (sensorData.soil_moisture < 45) return { label: 'Tanah Kering ⚠️', bg: 'bg-amber-500 text-white' };
    if (sensorData.weather_probability >= 65) return { label: 'Siaga Hujan 🌧️', bg: 'bg-sky-500 text-white' };
    return { label: 'Kondisi Prima 🍉', bg: 'bg-emerald-600 text-white' };
  };

  const mood = getMoodBadge();

  return (
    <>
      {/* Floating Mascot Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {!isOpen && (
          <div 
            onClick={() => {
              setIsOpen(true);
              if (isAudioEnabled) playBubblePop();
            }}
            className="mb-2 max-w-[280px] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-100/90 flex items-center gap-2.5 cursor-pointer hover:scale-103 active:scale-98 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 group"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-emerald-300">
              <img src="/assets/melo_mascot.jpg" alt="Melo Mini" className="w-full h-full object-cover" />
              <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-slate-800">Melo AI</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                  {mood.label}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate group-hover:text-emerald-700 transition-colors">
                {bubbleTips[bubbleTipIndex]}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen && isAudioEnabled) playBubblePop();
          }}
          className="relative w-15 h-15 rounded-full overflow-hidden shadow-2xl ring-4 ring-emerald-500/30 hover:ring-emerald-500/60 hover:scale-108 active:scale-95 transition-all duration-300 bg-emerald-50 flex items-center justify-center animate-mascot"
          title="Buka Melo AI — Smart Watermelon Agronomist"
        >
          <img
            src="/assets/melo_mascot_lab.jpg"
            alt="Melo Agronomist Mascot"
            className="w-full h-full object-cover"
          />

          {/* Active water pulse ring */}
          {isPumpActive && (
            <span className="absolute inset-0 rounded-full border-3 border-cyan-400 animate-ping opacity-75" />
          )}

          {/* Online status dot */}
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-black shadow-xs">
            ✓
          </span>
        </button>
      </div>

      {/* Main Interactive AI Assistant Window */}
      {isOpen && (
        <div className={`fixed z-50 transition-all duration-300 ${
          isExpanded 
            ? 'inset-3 sm:inset-8' 
            : 'bottom-20 right-4 sm:right-6 w-[94vw] sm:w-[470px] h-[640px] max-h-[88vh]'
        }`}>
          <div className="w-full h-full glass-card rounded-[32px] shadow-2xl border border-white/95 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-white/30 shrink-0 bg-emerald-950">
                  <img
                    src="/assets/melo_mascot_lab.jpg"
                    alt="Melo Doctor"
                    className="w-full h-full object-cover"
                  />
                  {isPumpActive && (
                    <span className="absolute inset-0 rounded-full bg-cyan-400/35 animate-pulse" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                      Melo AI — Smart Agronomist 🍉
                    </h3>
                  </div>
                  <p className="text-[11px] text-emerald-200 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Batuampar, Sumenep • {user.plantAgeHst} HST ({user.growthStage})</span>
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 text-white/80">
                {/* Audio Mute/Unmute */}
                <button
                  onClick={() => {
                    if (isAudioEnabled) stopSpeaking();
                    setIsAudioEnabled(!isAudioEnabled);
                  }}
                  className={`p-1.5 rounded-xl transition-colors ${
                    isAudioEnabled ? 'hover:bg-white/15 text-emerald-200' : 'bg-rose-500/30 text-rose-200'
                  }`}
                  title={isAudioEnabled ? 'Matikan Suara (Mute)' : 'Nyalakan Suara (Unmute)'}
                >
                  {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Reset Chat */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setMessages([initialGreeting]);
                  }}
                  className="p-1.5 rounded-xl hover:text-white hover:bg-white/15 transition-colors"
                  title="Bersihkan Percakapan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Window Expand Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-xl hover:text-white hover:bg-white/15 transition-colors hidden sm:block"
                  title={isExpanded ? 'Perkecil Jendela' : 'Perbesar Jendela'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-xl hover:text-white hover:bg-white/15 transition-colors"
                  title="Tutup Jendela"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Chat, AI Scanner Daun, Kalkulator Pupuk) */}
            <div className="px-4 py-2 bg-white/90 border-b border-emerald-100 flex items-center justify-between text-xs font-bold shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'chat'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chat Asisten</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('scanner');
                    handleStartScan(watermelonDiseases[0]);
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'scanner'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>AI Scanner Daun</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                </button>

                <button
                  onClick={() => setActiveTab('fertilizer')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeTab === 'fertilizer'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Kalkulator Pupuk</span>
                </button>
              </div>

              {/* Pump Status or Mode Badge */}
              {isPumpActive ? (
                <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-white font-mono font-bold text-[10px] animate-pulse flex items-center gap-1">
                  💧 Pompa: {pumpRemainingSeconds}s
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                  {sensorData.soil_moisture}% Lembap
                </span>
              )}
            </div>

            {/* TAB 1: CHAT ASISTEN */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
                {/* AI Mode Selector Bar */}
                <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100/60 flex items-center justify-between text-xs shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider">
                      Mode AI:
                    </span>
                    <button
                      onClick={() => setAiMode('agronomis')}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                        aiMode === 'agronomis'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:bg-emerald-100/50'
                      }`}
                      title="Saran ramah agronomi budidaya praktis semangka"
                    >
                      <Sprout className="w-3 h-3" /> Agronomis
                    </button>
                    <button
                      onClick={() => setAiMode('skripsi')}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                        aiMode === 'skripsi'
                          ? 'bg-emerald-700 text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:bg-emerald-100/50'
                      }`}
                      title="Formulasi matematika Centroid CoA, ANOVA, efisiensi 37.4% untuk sidang skripsi"
                    >
                      <GraduationCap className="w-3 h-3" /> Sidang Skripsi
                    </button>
                    <button
                      onClick={() => setAiMode('iot')}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                        aiMode === 'iot'
                          ? 'bg-teal-700 text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:bg-emerald-100/50'
                      }`}
                      title="Arsitektur ESP32, sensor kapasitif v1.2, relay optocoupler"
                    >
                      <Cpu className="w-3 h-3" /> IoT ESP32
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                    {sensorData.temperature}°C • {sensorData.humidity}% RH
                  </span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
                  {messages.map((msg) => {
                    const isMelo = msg.sender === 'melo';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isMelo ? 'items-start' : 'items-start justify-end'}`}
                      >
                        {isMelo && (
                          <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-emerald-300 shrink-0 bg-emerald-100 mt-1">
                            <img
                              src="/assets/melo_mascot_lab.jpg"
                              alt="Melo Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="max-w-[86%] space-y-2">
                          <div
                            className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs relative group ${
                              isMelo
                                ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
                                : 'bg-emerald-600 text-white rounded-tr-sm font-medium shadow-emerald-600/20'
                            }`}
                          >
                            {/* Parsed message text with paragraph breaks & bolding */}
                            <div className="whitespace-pre-line space-y-1.5">
                              {msg.text.split('\n\n').map((paragraph, pIdx) => (
                                <p key={pIdx}>
                                  {paragraph.split('**').map((chunk, cIdx) => (
                                    cIdx % 2 === 1 ? (
                                      <strong key={cIdx} className={isMelo ? 'text-slate-900 font-extrabold' : 'text-white font-black'}>
                                        {chunk}
                                      </strong>
                                    ) : (
                                      chunk
                                    )
                                  ))}
                                </p>
                              ))}
                            </div>

                            {/* Fertilizer Result Card Attachment if present */}
                            {msg.fertilizerResult && (
                              <div className="mt-3 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-[11px] space-y-2">
                                <div className="font-extrabold text-emerald-900 flex items-center justify-between">
                                  <span>Formula Kocor {msg.fertilizerResult.plantCount} Tanaman ({msg.fertilizerResult.growthStage})</span>
                                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                                    {msg.fertilizerResult.waterLiters} Liter Air
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 text-center">
                                  <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                                    <div className="text-[10px] text-slate-500 font-semibold">NPK 16-16-16</div>
                                    <div className="font-mono font-bold text-emerald-800">{msg.fertilizerResult.npkGrams} gr</div>
                                  </div>
                                  <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                                    <div className="text-[10px] text-slate-500 font-semibold">KNO3 Merah</div>
                                    <div className="font-mono font-bold text-amber-700">{msg.fertilizerResult.kno3Grams} gr</div>
                                  </div>
                                  <div className="bg-white p-1.5 rounded-lg border border-emerald-100">
                                    <div className="text-[10px] text-slate-500 font-semibold">MKP</div>
                                    <div className="font-mono font-bold text-teal-700">{msg.fertilizerResult.mkpGrams} gr</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Disease Diagnosis Attachment if present */}
                            {msg.diagnosisResult && (
                              <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold text-amber-900">
                                    {msg.diagnosisResult.name}
                                  </span>
                                  <span className="font-mono font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md text-[10px]">
                                    Akurasi: {msg.diagnosisResult.confidence}%
                                  </span>
                                </div>
                                <p className="text-amber-800 text-[10px] italic">
                                  Patogen: {msg.diagnosisResult.pathogen}
                                </p>
                                <button
                                  onClick={() => {
                                    setSelectedDisease(msg.diagnosisResult!);
                                    setActiveTab('scanner');
                                  }}
                                  className="w-full mt-1.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[10px] transition-colors flex items-center justify-center gap-1"
                                >
                                  <Scan className="w-3 h-3" /> Lihat Detail Scanner Daun
                                </button>
                              </div>
                            )}

                            {/* Direct Interactive Actions in Bubble */}
                            {msg.actionType === 'start_pump' && (
                              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pompa Irigasi Diaktifkan
                                </span>
                                <button
                                  onClick={stopWatering}
                                  className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                                >
                                  <Square className="w-3 h-3 fill-white" /> Matikan Pompa
                                </button>
                              </div>
                            )}

                            {msg.actionType === 'open_fuzzy' && (
                              <div className="pt-2 mt-2 border-t border-slate-100">
                                <button
                                  onClick={() => setIsFuzzyModalOpen(true)}
                                  className="w-full py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200/60"
                                >
                                  <Brain className="w-3.5 h-3.5 text-emerald-700" /> Buka Detail Aturan Inferensi Fuzzy
                                </button>
                              </div>
                            )}

                            {/* Bubble Footer: Audio Speak button & Copy */}
                            <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-50 text-[10px]">
                              <span className={isMelo ? 'text-slate-400' : 'text-emerald-100'}>
                                {msg.timestamp}
                              </span>

                              {isMelo && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleToggleSpeak(msg.id, msg.text)}
                                    className={`p-1 rounded-md transition-colors flex items-center gap-1 text-[10px] ${
                                      isSpeaking === msg.id 
                                        ? 'bg-emerald-100 text-emerald-800 font-bold animate-pulse' 
                                        : 'text-slate-400 hover:text-slate-700'
                                    }`}
                                    title="Dengarkan Melo Membaca"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                    <span>{isSpeaking === msg.id ? 'Membaca...' : 'Dengar'}</span>
                                  </button>

                                  <button
                                    onClick={() => copyToClipboard(msg.text, msg.id)}
                                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-[10px]"
                                    title="Salin Teks Jawaban"
                                  >
                                    {copiedId === msg.id ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-600" />
                                        <span className="text-emerald-600 font-bold">Disalin!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Salin</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Quick action chips */}
                          {msg.quickActions && msg.quickActions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {msg.quickActions.map((qa, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleSendMessage(qa.prompt)}
                                  className="px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-800 transition-all hover:scale-102 active:scale-98 shadow-2xs"
                                >
                                  {qa.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {!isMelo && (
                          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs mt-1">
                            AG
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-emerald-300 shrink-0 bg-emerald-100">
                        <img
                          src="/assets/melo_mascot_lab.jpg"
                          alt="Melo Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
                          Melo menganalisis data telemetri {user.location}...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Action Carousel Bar */}
                <div className="px-3.5 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Aksi:
                  </span>
                  {[
                    { label: '🍉 Audit Kebun', prompt: 'Audit kondisi kebun saya hari ini' },
                    { label: '💧 Perlu Siram?', prompt: 'Apakah saya perlu menyiram sekarang?' },
                    { label: '⚡ Siram 60 Detik', prompt: 'Mulai siram kebun sekarang' },
                    { label: '🧪 Hitung Pupuk', prompt: 'Kalkulator pupuk 200 tanaman' },
                    { label: '🔬 Diagnosa Daun', prompt: 'Buka scanner daun semangka' },
                    { label: '🎓 Bukti Riset 37.4%', prompt: 'Jelaskan data penghematan air skripsi 37.4%' },
                    { label: '🌦️ Cuaca Batuampar', prompt: 'Prakiraan cuaca Batuampar Sumenep hari ini' },
                    { label: '⚡ Tes Simulasi Kering', prompt: 'Simulasikan tanah kering 30%' },
                    { label: '🌧️ Tes Simulasi Hujan', prompt: 'Simulasikan hujan deras 85%' },
                    { label: '🔄 Reset Normal', prompt: 'Reset sensor ke kondisi ideal' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip.prompt)}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-semibold text-slate-600 whitespace-nowrap transition-colors shrink-0"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Chat Input Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      aiMode === 'skripsi' 
                        ? 'Tanya rumus Centroid, penghematan air 37.4%, atau ANOVA...' 
                        : aiMode === 'iot'
                        ? 'Tanya kalibrasi ADC ESP32, relay pompa, atau MQTT...'
                        : 'Tanya irigasi tetes, penyakit daun, atau perintahkan siram...'
                    }
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />

                  {/* Speech to text voice input button */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                    title={isListening ? 'Mendengarkan suara Anda...' : 'Bicara dengan Melo (Voice Input)'}
                  >
                    {isListening ? <Mic className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:scale-100 active:scale-95 shadow-md shadow-emerald-600/20 shrink-0"
                    title="Kirim pesan"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: AI SCANNER DAUN (MULTIMODAL COMPUTER VISION) */}
            {activeTab === 'scanner' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Scan className="w-4 h-4 text-emerald-600" />
                      AI Leaf & Crop Disease Diagnostics
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pindai foto kanopi daun semangka untuk deteksi patogen secara dini.
                    </p>
                  </div>

                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200/80 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preset Disease Sample Selector */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Pilih Sampel Gejala Penyakit:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {watermelonDiseases.map((disease) => {
                      const isSelected = selectedDisease.id === disease.id;
                      return (
                        <button
                          key={disease.id}
                          onClick={() => handleStartScan(disease)}
                          className={`p-2 rounded-2xl text-left border transition-all ${
                            isSelected
                              ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                              : 'bg-white border-slate-200/80 hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-extrabold text-[11px] text-slate-800 line-clamp-1">
                            {disease.name}
                          </div>
                          <div className="text-[9px] text-slate-400 mt-0.5 font-medium flex items-center justify-between">
                            <span>{disease.severity}</span>
                            <span className="text-emerald-700 font-bold">{disease.confidence}%</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scanner Interactive Viewfinder */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 bg-black aspect-4/3 sm:aspect-16/9 flex items-center justify-center">
                  <img
                    src={customImageSrc || selectedDisease.sampleImage}
                    alt="Sample Daun Semangka"
                    className="w-full h-full object-cover"
                  />

                  {/* Laser Scanning Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col justify-between p-4">
                      {/* Laser Bar Moving Up and Down */}
                      <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 shadow-[0_0_15px_#10b981] animate-bounce" />
                      
                      {/* Target HUD corners */}
                      <div className="absolute inset-4 border border-dashed border-emerald-400/60 pointer-events-none rounded-xl" />

                      <div className="text-center space-y-1 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                        <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-2">
                          <Activity className="w-4 h-4 animate-spin" />
                          Menganalisis Klorofil & Pola Lesi... {scanProgress}%
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scanned Badge */}
                  {!isScanning && scanCompleted && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Analisis Selesai ({selectedDisease.confidence}% Match)</span>
                    </div>
                  )}
                </div>

                {/* Diagnostic Result Card */}
                {scanCompleted && (
                  <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-extrabold text-sm text-slate-900">
                            {selectedDisease.name}
                          </h5>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            selectedDisease.severity === 'Aman'
                              ? 'bg-emerald-100 text-emerald-800'
                              : selectedDisease.severity === 'Kritis'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            Severity: {selectedDisease.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium italic mt-0.5">
                          Patogen: {selectedDisease.pathogen}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-mono font-black text-emerald-700">
                          {selectedDisease.confidence}%
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Confidence
                        </span>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 block">Gejala Utama:</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {selectedDisease.symptoms.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-1 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-700 block">Saran Agronomis Melo:</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {selectedDisease.recommendations.map((r, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Irrigation Action */}
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-start gap-2">
                      <Droplets className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Aksi Irigasi Tetes Otomatis:</strong> {selectedDisease.irrigationAction}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          startWatering(selectedDisease.suggestedDurationSeconds);
                          if (isAudioEnabled) playPumpStartSound();
                        }}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <Droplets className="w-3.5 h-3.5" />
                        Terapkan Irigasi ({selectedDisease.suggestedDurationSeconds}s)
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('chat');
                          handleSendMessage(`Bagaimana cara detail mengatasi ${selectedDisease.name}?`);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Tanya Melo di Chat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: KALKULATOR PUPUK KOCOR */}
            {activeTab === 'fertilizer' && (
              <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-50/50">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-emerald-600" />
                    Kalkulator Fertigasi & Pupuk Kocor Semangka
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hitung takaran presisi NPK, KNO3, dan MKP untuk populasi kebun Anda di Batuampar.
                  </p>
                </div>

                {/* Plant Count Selector */}
                <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Jumlah Populasi Tanaman:</label>
                    <span className="font-mono font-black text-emerald-700 text-base">
                      {plantCountInput} Batang
                    </span>
                  </div>

                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={20}
                    value={plantCountInput}
                    onChange={(e) => setPlantCountInput(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />

                  {/* Preset Buttons */}
                  <div className="flex items-center gap-1.5">
                    {[100, 200, 500, 1000, 1500].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setPlantCountInput(preset)}
                        className={`flex-1 py-1 rounded-xl text-xs font-bold transition-colors ${
                          plantCountInput === preset
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs text-center space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      NPK 16-16-16
                    </span>
                    <div className="text-xl font-mono font-black text-emerald-800">
                      {fertilizerResult.npkGrams} <span className="text-xs font-normal">gram</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      ({(fertilizerResult.npkGrams / 1000).toFixed(2)} kg)
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs text-center space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      KNO3 Merah
                    </span>
                    <div className="text-xl font-mono font-black text-amber-700">
                      {fertilizerResult.kno3Grams} <span className="text-xs font-normal">gram</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      ({(fertilizerResult.kno3Grams / 1000).toFixed(2)} kg)
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-teal-100 shadow-xs text-center space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      MKP
                    </span>
                    <div className="text-xl font-mono font-black text-teal-700">
                      {fertilizerResult.mkpGrams} <span className="text-xs font-normal">gram</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      ({(fertilizerResult.mkpGrams / 1000).toFixed(2)} kg)
                    </span>
                  </div>
                </div>

                {/* Water Volume & Application Guide */}
                <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Kebutuhan Air Pelarut:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {fertilizerResult.waterLiters} Liter Air
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Dosis per Lubang Mulsa:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {fertilizerResult.dosePerPlantMl} ml / lubang
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Frekuensi Kocor:</span>
                    <span className="font-bold text-emerald-800 text-xs">
                      {fertilizerResult.frequency}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Panduan Pembuatan Larutan:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {fertilizerResult.instructions}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage(
                        `Tolong jelaskan tips pemupukan kocor semangka ${plantCountInput} batang fase vegetatif 35 HST`
                      );
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Konsultasikan Jadwal Pupuk Ini dengan Melo AI
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
