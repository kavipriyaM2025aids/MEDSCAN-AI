import React from 'react';
import { 
  User, 
  Stethoscope, 
  Store, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Server, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const RolePortalsScreen: React.FC = () => {
  const { rolePortal, inventory, allPrescriptions, lastSharedReport, t } = useMedScan();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Role Portal Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            ACTIVE PORTAL ENVIRONMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white capitalize mt-1">
            {rolePortal === 'patient' && "Patient Health & Regimen Hub"}
            {rolePortal === 'doctor' && "Attending Physician Clinical Console"}
            {rolePortal === 'pharmacy' && "Licensed Pharmacy Dispense Desk"}
            {rolePortal === 'admin' && "Hospital Enterprise Telemetry & Admin"}
          </h1>
        </div>
      </div>

      {/* 1. PATIENT HUB VIEW */}
      {rolePortal === 'patient' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <User className="w-8 h-8 text-cyan-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Active Patient Profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Patient: Kavi Priya (29F). Active medications in inventory: {inventory.length}. No allergic contradictions reported today.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <Clock className="w-8 h-8 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Next Scheduled Dose</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dolo 650 (650mg) • Scheduled for 01:30 PM (After Food). Smart audio alert is configured.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <FileText className="w-8 h-8 text-indigo-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Registered Prescription</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Doctor: {allPrescriptions[0].doctorName} ({allPrescriptions[0].clinic}). Verified in Safety Engine.
            </p>
          </div>
        </div>
      )}

      {/* 2. DOCTOR PORTAL VIEW */}
      {rolePortal === 'doctor' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-600" />
                <span>Inbound Patient Medication Safety Audits</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                1 Audit Pending Review
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  Patient: Kavi Priya (Rx #101)
                </div>
                <div className="text-slate-500 mt-0.5">
                  Mismatch Detected: Scanned Paracetamol 500mg vs Prescribed 650mg TDS
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("✓ Clinical Override: Pharmacist notified to substitute Crocin 500mg with Dolo 650mg as prescribed.")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Authorize Dispense Fix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PHARMACY DESK VIEW */}
      {rolePortal === 'pharmacy' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-600" />
                <span>Pharmacy Incoming Reserve Orders</span>
              </h3>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full">
                Store ID: APOLLO-IND-42
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Dolo 650 (Strip of 15)</div>
                  <div className="text-slate-500">Reserved by Kavi Priya • Pickup ETA: 20 mins</div>
                </div>
                <button 
                  onClick={() => alert("✓ Medication strip verified and bagged at counter 1!")}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold"
                >
                  Mark Ready for Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ADMIN CONSOLE VIEW */}
      {rolePortal === 'admin' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <Server className="w-6 h-6 text-purple-600" />
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">99.98%</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">API Uptime</div>
            <div className="text-[11px] text-slate-400">FastAPI Clinical Endpoints</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <Zap className="w-6 h-6 text-cyan-600" />
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">1.8s</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Gemini Vision Latency</div>
            <div className="text-[11px] text-slate-400">Multimodal OCR Pipeline</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">100%</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">HIPAA Compliance</div>
            <div className="text-[11px] text-slate-400">Encrypted Local Ledger</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <Activity className="w-6 h-6 text-rose-600" />
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">412</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Safety Interceptions</div>
            <div className="text-[11px] text-slate-400">Prevented Adverse Errors</div>
          </div>
        </div>
      )}

    </div>
  );
};

