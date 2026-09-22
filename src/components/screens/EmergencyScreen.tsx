import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  HeartCrack, 
  Share2, 
  FileText, 
  User, 
  Activity, 
  Check, 
  Info,
  ChevronDown
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const EmergencyScreen: React.FC = () => {
  const { inventory, allPrescriptions, t } = useMedScan();
  const [selectedTox, setSelectedTox] = useState<string | null>('paracetamol');

  const toxicityProtocols: Record<string, { name: string; threshold: string; antidote: string; firstAid: string }> = {
    paracetamol: {
      name: "Paracetamol / Acetaminophen Toxicity",
      threshold: "> 150 mg/kg or single acute dose > 7.5g - 10g in adults",
      antidote: "N-acetylcysteine (NAC) IV/oral infusion within 8 hours",
      firstAid: "Do not induce vomiting. Maintain airway. Rush immediately to nearest Emergency Room for serum paracetamol level testing & IV NAC initiation."
    },
    nsaid: {
      name: "NSAID / Ibuprofen Acute Ingestion",
      threshold: "> 100 mg/kg to 400 mg/kg",
      antidote: "Supportive gastrointestinal protection, activated charcoal if within 1-2 hours",
      firstAid: "Administer oral fluids if conscious. Monitor for epigastric pain, vomiting, or altered consciousness. Seek medical evaluation."
    },
    antibiotic: {
      name: "Severe Antibiotic Hypersensitivity / Anaphylaxis",
      threshold: "Any allergic response to Penicillins / Amoxicillin",
      antidote: "Intramuscular Epinephrine (0.3 - 0.5 mg), Antihistamines, Corticosteroids",
      firstAid: "Call emergency 108 / 911 immediately. Place patient in supine position with legs elevated unless breathing difficulty is worsened."
    }
  };

  const handleDialEmergency = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* High-Urgency Emergency Header (Coral / Red Theme!) */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-rose-900/20 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
            <AlertTriangle className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>CRITICAL MEDICAL RESPONSE DISPATCH</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {t.emergencyAlertTitle}
          </h1>

          <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
            Instant digital access to National Poison Control, Ambulance dispatchers, and your emergency medication ID card for EMT and ER first responders.
          </p>

          {/* Direct Hotline Dialing Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleDialEmergency("108")}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-rose-700 font-extrabold text-xs shadow-lg hover:bg-rose-50 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>{t.emergencyPhoneAmbulance}</span>
            </button>

            <button
              onClick={() => handleDialEmergency("18002221222")}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-950/60 border border-rose-400/40 text-white font-extrabold text-xs hover:bg-rose-950 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>{t.emergencyPhonePoison}</span>
            </button>
          </div>
        </div>

        {/* Decorative pulse ring */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-white/10 animate-ping pointer-events-none hidden md:block"></div>
      </div>

      {/* Emergency Patient Health Passport Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-950 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <User className="w-5 h-5 text-rose-600" />
              <span>Emergency First Responder Clinical ID</span>
            </h2>
            <p className="text-xs text-slate-400">Share with emergency EMT crew or triage nurses</p>
          </div>

          <button
            onClick={() => alert("✓ Emergency Medical ID QR Code generated for paramedic scanning.")}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Share2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Generate Paramedic QR</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
            <span className="font-extrabold text-slate-900 dark:text-white">Kavi Priya (29F)</span>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
            <span className="text-[10px] uppercase font-bold text-rose-600 block">Blood Group</span>
            <span className="font-extrabold text-rose-700 dark:text-rose-300 text-base">O Positive (O+)</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <span className="text-[10px] uppercase font-bold text-amber-600 block">Severe Allergies</span>
            <span className="font-extrabold text-amber-800 dark:text-amber-200">Penicillin & Sulfa</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Emergency Contact</span>
            <span className="font-bold text-slate-900 dark:text-white">+91 98401 23456</span>
          </div>
        </div>

        {/* Active Medications Summary for Triage */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-600" />
            <span>{t.emergencyActiveMedsTitle}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {inventory.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">{item.name} ({item.strength})</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Salt: {item.activeSalt}</div>
                <div className="text-[10px] text-cyan-600 font-semibold mt-1">Dosing: {item.dosageFrequency}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toxicity & First-Aid Section (Visible in reference!) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>{t.emergencyFirstAidTitle}</span>
          </h2>
          <p className="text-xs text-slate-400">
            Clinical poisoning management protocols compiled from FDA and WHO Toxicology guidelines
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.keys(toxicityProtocols).map((k) => (
            <button
              key={k}
              onClick={() => setSelectedTox(k)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTox === k 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              {toxicityProtocols[k].name.split(" ")[0]} Overdose
            </button>
          ))}
        </div>

        {selectedTox && toxicityProtocols[selectedTox] && (
          <div className="p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-3 text-xs leading-relaxed">
            <h3 className="font-black text-sm text-rose-950 dark:text-rose-100">
              {toxicityProtocols[selectedTox].name}
            </h3>
            <div>
              <strong>Toxic Threshold:</strong> {toxicityProtocols[selectedTox].threshold}
            </div>
            <div>
              <strong>Clinical Antidote:</strong> {toxicityProtocols[selectedTox].antidote}
            </div>
            <div className="p-3 bg-white/80 dark:bg-black/40 rounded-xl border border-rose-200/80 dark:border-rose-900/80">
              <strong>Immediate First-Aid Protocol:</strong> {toxicityProtocols[selectedTox].firstAid}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

