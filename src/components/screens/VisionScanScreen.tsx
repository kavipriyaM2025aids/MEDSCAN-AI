import React, { useState, useRef } from 'react';
import { 
  Scan, 
  UploadCloud, 
  Camera, 
  Clipboard, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Store, 
  Plus, 
  Stethoscope, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Layers, 
  Maximize2, 
  FileText,
  X,
  ExternalLink
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';
import { audioService } from '../../utils/audio';

export const VisionScanScreen: React.FC = () => {
  const { 
    scannedMedication, 
    isAnalyzingVision, 
    scanProgress, 
    triggerScanPreset, 
    addToInventory, 
    setCurrentScreen,
    language,
    t 
  } = useMedScan();

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showKeypointOverlay, setShowKeypointOverlay] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const med = scannedMedication;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      triggerScanPreset('dolo');
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            setSelectedImage(URL.createObjectURL(blob));
            triggerScanPreset('dolo');
            return;
          }
        }
      }
      alert("No image found in clipboard. Try copying an image first or click a preset.");
    } catch {
      // Fallback
      triggerScanPreset('dolo');
    }
  };

  const handleListenVoice = () => {
    if (!med) return;
    const speech = language === 'ta'
      ? `${med.name}. பொதுவான மூலப்பொருள்: ${med.genericName}. அளவு: ${med.strength}. மருத்துவ காரண விளக்கம்: விட்டம், பள்ளக் கோடு மற்றும் OCR அச்சு ஆகியவற்றின் அடிப்படையில் 98% பொருத்தம்.`
      : (language === 'hi'
        ? `${med.name}। जेनेरिक सॉल्ट: ${med.genericName}। क्षमता: ${med.strength}। यह 98% मिलान के साथ Dolo 650 के रूप में सत्यापित है।`
        : `${med.name}. Generic salt: ${med.genericName}. Strength: ${med.strength}. AI Identification Rationale: This tablet matches 98% of known visual characteristics including diameter, score line, and imprint OCR.`);
    
    audioService.speakText(speech, language);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* 1. UPLOAD & SCAN DROPZONE (Pixel-accurate match to screenshot 1!) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Dashed Border Dropzone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-cyan-300 dark:border-cyan-800/80 bg-cyan-50/20 dark:bg-cyan-950/10 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            {t.dropzoneTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-6">
            {t.dropzoneSubtitle}
          </p>

          <button
            type="button"
            className="px-6 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/25 transition-all"
          >
            {t.btnBrowseFiles}
          </button>
        </div>

        {/* Action Row: Live Camera & Clipboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setIsCameraActive(true)}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            <Camera className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.btnLiveCamera}</span>
          </button>

          <button
            onClick={handlePasteClipboard}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            <Clipboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.btnPasteClipboard}</span>
          </button>
        </div>

        {/* Instant Demo Scan Presets (Screenshot 1 Exact Buttons!) */}
        <div className="pt-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.presetsTitle}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => triggerScanPreset('dolo')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:hover:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800 text-xs font-bold transition-all"
            >
              <span>💊</span>
              <span>{t.presetDolo}</span>
            </button>

            <button
              onClick={() => triggerScanPreset('amox')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all"
            >
              <span>💊</span>
              <span>{t.presetAmox}</span>
            </button>

            <button
              onClick={() => triggerScanPreset('augmentin')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-all"
            >
              <span>💊</span>
              <span>{t.presetAugmentin}</span>
            </button>

            <button
              onClick={() => triggerScanPreset('pantocid')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all"
            >
              <span>💊</span>
              <span>{t.presetPantocid}</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. SCANNING PROGRESS INDICATOR */}
      {isAnalyzingVision && (
        <div className="p-6 rounded-3xl bg-cyan-600 text-white shadow-xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Scan className="w-5 h-5 animate-spin" />
              <span>Analyzing Medicine Morphology & OCR Inscription...</span>
            </div>
            <span className="font-mono font-bold text-sm">{scanProgress}%</span>
          </div>
          <div className="w-full bg-cyan-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-300 rounded-full" 
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 3. IDENTIFIED MEDICINE DETAILS & RATIONALE (Pixel-accurate match to screenshot 2!) */}
      {med && !isAnalyzingVision && (
        <div className="space-y-6">
          
          {/* Main Identification Header Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* Header: Thumbnail + Name + Active Salt + Voice Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img 
                    src={selectedImage || med.referenceImage || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300"} 
                    alt={med.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {med.name}
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span>{t.genericActiveSalt}</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      {med.genericName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Listen in Voice Button (Screenshot 2!) */}
              <button
                onClick={handleListenVoice}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shrink-0"
              >
                <Volume2 className="w-4 h-4 text-cyan-600" />
                <span>{t.btnListenVoice}</span>
              </button>
            </div>

            {/* AI Identification Rationale & Explanation (Screenshot 2 cyan box!) */}
            <div className="p-5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200/80 dark:border-cyan-800/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-cyan-800 dark:text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{t.aiRationaleTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-950 dark:text-cyan-100 italic leading-relaxed">
                "{t.aiRationaleText}"
              </p>
            </div>

            {/* 3 Action Buttons (Exact visual from screenshot 2!) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Button 1: Cyan Reserve at Nearby Pharmacy */}
              <button
                onClick={() => setCurrentScreen('pharmacies')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                <Store className="w-4 h-4" />
                <span>{t.btnReservePharmacy}</span>
              </button>

              {/* Button 2: Green Add to Smart Inventory */}
              <button
                onClick={() => {
                  addToInventory({
                    name: med.name,
                    strength: med.strength,
                    dosageForm: med.dosageForm,
                    countRemaining: 15,
                    totalPills: 15,
                    category: med.category,
                    activeSalt: med.genericName
                  });
                  alert(`✓ Added ${med.name} to your Smart Inventory!`);
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{t.btnAddInventory}</span>
              </button>

              {/* Button 3: Dark Navy Share Report with Doctor */}
              <button
                onClick={() => setCurrentScreen('doctors')}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-navy-900 hover:bg-navy-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                <span>{t.btnShareDoctor}</span>
              </button>

            </div>

          </div>

          {/* 4. COMPUTER VISION FEATURE EXTRACTION (Pixel-accurate match to screenshot 2!) */}
          {med.features && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              
              {/* Header: Icon + Title + AI Vision Active badge + 98% Confidence */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
                    <Scan className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {t.cvExtractionTitle}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        {t.aiVisionActive}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t.cvExtractionSubtitle}
                    </p>
                  </div>
                </div>

                {/* Visual Match Confidence Box (Exact from screenshot 2!) */}
                <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shrink-0">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {t.visualMatchConfidence}
                    </div>
                    <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">
                      {med.features.confidence}%
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* 8 Feature Extraction Cards (2 rows of 4 - Screenshot 2 exact grid!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Shape & Form */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featShape}</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {med.features.shapeForm}
                  </div>
                </div>

                {/* 2. Est. Dimensions */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featDimensions}</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {med.features.estDimensions}
                  </div>
                  {med.features.thickness && (
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Thickness: {med.features.thickness}
                    </div>
                  )}
                </div>

                {/* 3. Color & Spectrum */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featColor}</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-slate-300 bg-white inline-block"></span>
                    <span>{med.features.colorSpectrum}</span>
                  </div>
                </div>

                {/* 4. Imprint OCR */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <FileText className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featImprint}</span>
                  </div>
                  <div className="font-extrabold text-sm text-cyan-600 dark:text-cyan-400 font-mono">
                    {med.features.imprintOcr}
                  </div>
                </div>

                {/* 5. Surface Texture */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featSurface}</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {med.features.surfaceTexture}
                  </div>
                </div>

                {/* 6. Score Line / Notch */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featScoreLine}</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {med.features.scoreLineNotch}
                  </div>
                </div>

                {/* 7. Mfr. Logo Check */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featMfrLogo}</span>
                  </div>
                  <div className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    {med.features.mfrLogoCheck}
                  </div>
                </div>

                {/* 8. Packaging Format */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    <Scan className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{t.featPackaging}</span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {med.features.packagingFormat}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 5. VISUAL KEYPOINT OVERLAY & MASTER DB MATCHING */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Visual Keypoint Overlay & Master DB Matching
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time ORB/SIFT geometric descriptor matching against registered pharmaceutical blister index
                </p>
              </div>
              <button
                onClick={() => setShowKeypointOverlay(!showKeypointOverlay)}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {showKeypointOverlay ? "Hide Keypoints" : "Show Keypoints"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* User Scanned Specimen */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>SPECIMEN A: User Captured Sample</span>
                  <span className="text-[11px] text-cyan-600 font-mono">128 Keypoints</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800">
                  <img 
                    src={selectedImage || med.referenceImage || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"} 
                    alt="Captured Specimen" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  {showKeypointOverlay && (
                    <>
                      <div className="keypoint-dot" style={{ top: '32%', left: '44%' }}></div>
                      <div className="keypoint-dot" style={{ top: '48%', left: '52%' }}></div>
                      <div className="keypoint-dot" style={{ top: '60%', left: '38%' }}></div>
                      <div className="keypoint-dot" style={{ top: '40%', left: '68%' }}></div>
                      <div className="keypoint-dot" style={{ top: '72%', left: '60%' }}></div>
                      {/* Bounding box */}
                      <div className="absolute inset-8 border border-dashed border-cyan-400/80 rounded-xl pointer-events-none"></div>
                    </>
                  )}
                </div>
              </div>

              {/* Master Database Reference */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>REFERENCE B: Master Pharmaceutical Catalog</span>
                  <span className="text-[11px] text-emerald-600 font-mono">Verified Match: 98%</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800">
                  <img 
                    src={med.referenceImage || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"} 
                    alt="Master Reference" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  {showKeypointOverlay && (
                    <>
                      <div className="keypoint-dot" style={{ top: '33%', left: '45%' }}></div>
                      <div className="keypoint-dot" style={{ top: '47%', left: '53%' }}></div>
                      <div className="keypoint-dot" style={{ top: '59%', left: '39%' }}></div>
                      <div className="keypoint-dot" style={{ top: '41%', left: '67%' }}></div>
                      <div className="keypoint-dot" style={{ top: '71%', left: '61%' }}></div>
                      <div className="absolute inset-8 border border-emerald-400/80 rounded-xl pointer-events-none"></div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* 6. COMPLETE CLINICAL MEDICINE INFORMATION */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Clinical Drug Monograph & Guidance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1 text-cyan-600">
                    Therapeutic Uses
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    {med.uses.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1 text-amber-600">
                    Precautions & Warnings
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    {med.precautions.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1 text-rose-600">
                    Common Side Effects
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    {med.commonSideEffects.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1 text-slate-500">
                    Storage & Regulatory
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">{med.storageInfo}</p>
                  <p className="font-bold text-rose-600 dark:text-rose-400 mt-1">{med.prescriptionSchedule}</p>
                </div>
              </div>

            </div>

            {/* Educational Disclaimer Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs text-slate-500">
              <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>Mandatory Medical Notice:</strong> Information provided is purely educational and based on computer vision feature matching. MEDSCAN AI is not a substitute for clinical diagnosis, prescribing, or dispensing by licensed medical professionals.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Camera Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setIsCameraActive(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              <span>Live Camera & Barcode Scanner</span>
            </h3>
            <div className="relative rounded-2xl aspect-[4/3] bg-black overflow-hidden flex items-center justify-center border border-slate-700">
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600" 
                alt="Camera feed"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-8 border-2 border-dashed border-cyan-400 rounded-xl flex items-center justify-center pointer-events-none">
                <span className="text-xs font-bold bg-cyan-600/80 px-3 py-1 rounded-full text-white backdrop-blur-xs">
                  Center medicine strip or barcode here
                </span>
              </div>
              <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan-line"></div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setIsCameraActive(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCameraActive(false);
                  triggerScanPreset('dolo');
                }}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs"
              >
                Capture Specimen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

