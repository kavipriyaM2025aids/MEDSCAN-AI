import React from 'react';
import { Scan, ShieldCheck, HeartPulse, Sparkles, AlertTriangle } from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const ClinicalFooter: React.FC = () => {
  const { setCurrentScreen, t } = useMedScan();

  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-slate-300 border-t border-navy-800 transition-colors pt-16 pb-12 mt-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center p-2 text-white shadow-md shadow-cyan-500/20">
                <Scan className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white">
                  MEDSCAN <span className="text-cyan-400">AI</span>
                </span>
                <p className="text-[9px] font-bold tracking-widest uppercase text-cyan-400">
                  {t.tagline}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerMission}
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] text-cyan-400 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% HIPAA Private
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Gemini 1.5 Flash
              </span>
            </div>
          </div>

          {/* Column 2: Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.footerFeaturesTitle}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setCurrentScreen('vision-scan')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Medicine Strip Scanner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentScreen('rx-scanner')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Prescription OCR Reader
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentScreen('interactions')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Drug Interaction Checker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentScreen('safety-engine')}
                  className="hover:text-cyan-400 transition-colors text-left font-semibold text-cyan-300 flex items-center gap-1.5"
                >
                  <span>Prescription-to-Pill Safety Engine</span>
                  <span className="text-[9px] bg-cyan-900/60 text-cyan-300 px-1 rounded">PRO</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentScreen('assistant')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  AI Clinical Pharmacist Assistant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentScreen('inventory')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Smart Inventory & Refills
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.footerSecurityTitle}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Privacy First Architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Verified Medical Registries (FDA & CDSCO)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Multilingual Support (EN / தமிழ் / हिंदी)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Smart Audio Dosage Alarms (CITIZEN)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Doctor Verification & Telehealth Hub
              </li>
            </ul>
          </div>

          {/* Column 4: Medical Notice */}
          <div className="p-5 rounded-2xl bg-navy-850 border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{t.footerNoticeTitle}</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.footerMedicalNotice}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>ISO 27001 Clinical Standard</span>
              <span className="text-emerald-400 font-semibold">Verified Safe</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MEDSCAN AI Technologies Inc. All clinical rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Clinical Use</a>
            <a href="#security" className="hover:text-slate-400 transition-colors">HIPAA Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

