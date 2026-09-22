import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Globe, 
  Scan, 
  Plus, 
  AlertTriangle, 
  ChevronRight, 
  Package, 
  Bell, 
  Check, 
  FileCheck2,
  Calendar
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const DashboardScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    triggerScanPreset, 
    setShowAlarmModal,
    triggerAlarmBeep,
    inventory, 
    reminders,
    toggleReminder,
    allPrescriptions,
    t 
  } = useMedScan();

  const lowStockItems = inventory.filter(i => i.status === 'LOW_STOCK' || i.status === 'EXPIRING_SOON');

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Section (Pixel-accurate match to screenshots 3 & 4!) */}
      <section className="relative pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {t.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-500 dark:from-cyan-400 dark:via-teal-300 dark:to-cyan-200">
                {t.heroTitle2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons (Exact Cyan & Green pill buttons from screenshots 3 & 4!) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* Cyan Scan Button */}
              <button
                onClick={() => {
                  triggerScanPreset('dolo');
                  setCurrentScreen('vision-scan');
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all group"
              >
                <Scan className="w-4 h-4" />
                <span>{t.heroScanDolo}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Green Set Daily Alarms Button */}
              <button
                onClick={() => {
                  setShowAlarmModal(true);
                  triggerAlarmBeep();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Clock className="w-4 h-4" />
                <span>{t.heroSetAlarms}</span>
              </button>

            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t.badgeTesseract}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t.badgeGemini}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t.badgeHipaa}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Live Scan Card (Exact visual from screenshot 4!) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-5 relative overflow-hidden group">
              
              {/* Card Top Bar: 3 macOS dots + LIVE SCAN ENGINE badge */}
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {t.liveScanEngine}
                </div>
              </div>

              {/* Medicine Blister Pack Preview Image with Bounding Box Overlay */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80" 
                  alt="Medicine Blister Scan" 
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Simulated Bounding Box Overlay */}
                <div className="absolute inset-6 border-2 border-dashed border-cyan-400/90 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-600/90 text-white text-[10px] font-bold self-start backdrop-blur-xs">
                    <Scan className="w-3 h-3" />
                    <span>Detected: Amoxicillin 500mg</span>
                  </div>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold self-end backdrop-blur-xs">
                    EXP: 12/2027
                  </div>
                </div>

                {/* Laser scan bar animation */}
                <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-scan-line pointer-events-none opacity-75"></div>
              </div>

              {/* Card Body */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Amoxicillin 500 mg
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    98% Match
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <strong>Primary Use:</strong> Broad-spectrum antibiotic for respiratory & throat infections.
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold">
                    Take After Food
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-[11px] font-semibold">
                    Avoid Alcohol
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4 Metric Cards Row (Exact recreation from screenshot 3!) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.metricOcrAccuracy}
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
            OCR Text Accuracy
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            {t.metricOcrAccuracySub}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.metricScansCount}
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
            Scans Analyzed
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            {t.metricScansCountSub}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.metricProcessingSpeed}
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
            AI Processing Speed
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            {t.metricProcessingSpeedSub}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
            <Globe className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.metricLanguagesCount}
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
            Languages Supported
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            {t.metricLanguagesCountSub}
          </div>
        </div>

      </section>

      {/* Quick Action Navigation Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-600" />
          <span>Quick Actions & Clinical Workflows</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <button
            onClick={() => {
              triggerScanPreset('dolo');
              setCurrentScreen('vision-scan');
            }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Scan className="w-5 h-5" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Scan Medicine</div>
            <div className="text-[11px] text-slate-400 mt-0.5">AI Pill Strip OCR</div>
          </button>

          <button
            onClick={() => setCurrentScreen('safety-engine')}
            className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-slate-900 dark:to-cyan-950/40 border border-cyan-300 dark:border-cyan-800 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
              Safety Engine
              <span className="text-[8px] bg-cyan-600 text-white px-1 py-0.2 rounded">NEW</span>
            </div>
            <div className="text-[11px] text-cyan-700 dark:text-cyan-300 mt-0.5">Rx vs Scanned Pill</div>
          </button>

          <button
            onClick={() => setCurrentScreen('interactions')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Interactions</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Check Drug Conflicts</div>
          </button>

          <button
            onClick={() => setCurrentScreen('inventory')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Smart Inventory</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stock & Refills</div>
          </button>

          <button
            onClick={() => setCurrentScreen('pharmacies')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white">Find Pharmacy</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Reserve Medicine</div>
          </button>

        </div>
      </section>

      {/* Active Schedule & Low Stock Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Today's Medication Schedule */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-600" />
                <span>Today's Medication Schedule</span>
              </h3>
              <p className="text-xs text-slate-400">Timely adherence prevents therapeutic dips</p>
            </div>
            <button
              onClick={() => setShowAlarmModal(true)}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 flex items-center gap-1"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Alarm Settings</span>
            </button>
          </div>

          <div className="space-y-3">
            {reminders.map((rem) => (
              <div 
                key={rem.id}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleReminder(rem.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      rem.active ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {rem.medicineName}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{rem.dose}</span>
                      <span>•</span>
                      <span className="capitalize">{rem.mealRelation.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-100/70 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-bold">
                    {rem.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Prescription Context Note */}
          <div className="p-3.5 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Prescribed by: <strong>{allPrescriptions[0].doctorName}</strong>
            </span>
            <button 
              onClick={() => setCurrentScreen('rx-scanner')}
              className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              View Full Rx
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Low-Stock & Safety Alerts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Low-Stock & Refills Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Refill & Stock Alerts</span>
              </h3>
              <button 
                onClick={() => setCurrentScreen('inventory')}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Inventory ({inventory.length})
              </button>
            </div>

            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                      {item.countRemaining} doses left • {item.status === 'LOW_STOCK' ? 'Low Stock' : 'Expiring Soon'}
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('pharmacies')}
                    className="px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Refill Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Prescription-to-Pill Safety Engine Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-navy-950 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-400/30">
                Core Safety Feature
              </span>
              <h4 className="text-base font-extrabold">
                Prescription-to-Pill Safety Engine
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prevent dispensing errors and dosage mismatches by scanning your purchased medicine against doctor orders.
              </p>
              <button
                onClick={() => setCurrentScreen('safety-engine')}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>Launch Safety Verification</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Background decorative glow */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"></div>
          </div>

        </div>

      </section>

    </div>
  );
};

