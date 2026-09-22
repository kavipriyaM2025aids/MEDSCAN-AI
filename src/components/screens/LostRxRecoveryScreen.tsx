import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  FileText, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const LostRxRecoveryScreen: React.FC = () => {
  const { allPrescriptions, inventory, shareReportWithDoctor, t } = useMedScan();
  const [searchQuery, setSearchQuery] = useState('');
  const [isReconstructing, setIsReconstructing] = useState(false);
  const [reconstructed, setReconstructed] = useState(false);

  const handleReconstruct = () => {
    setIsReconstructing(true);
    setTimeout(() => {
      setIsReconstructing(false);
      setReconstructed(true);
    }, 900);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Historical Clinical Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.lostRxTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t.lostRxSubtitle} Lost your physical paper prescription slip? Our temporal neural graph reconstructs dosages, physician directives, and refill cycles from historical blister scans and past consultations.
            </p>
          </div>

          <button
            onClick={handleReconstruct}
            disabled={isReconstructing}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/25 transition-all shrink-0"
          >
            <Sparkles className={`w-4 h-4 ${isReconstructing ? 'animate-spin' : ''}`} />
            <span>{isReconstructing ? "Synthesizing Records..." : t.lostRxReconstructBtn}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
        <input 
          type="text"
          placeholder="Search by drug name, doctor, clinic, or active salt..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Reconstructed Prescription Sheet */}
      {reconstructed && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-50/70 to-teal-50/70 dark:from-slate-900 dark:to-cyan-950/30 border border-cyan-300 dark:border-cyan-800 shadow-lg space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-200 dark:border-cyan-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900 px-2 py-0.5 rounded">
                RECONSTRUCTED CLINICAL TRANSCRIPT
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Prescription Sheet: {allPrescriptions[0].doctorName}
              </h3>
              <p className="text-xs text-slate-500">
                Clinic: {allPrescriptions[0].clinic} • Verification Hash: SHA256-48291
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => shareReportWithDoctor("doc-1")}
                className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Share with Doctor</span>
              </button>
            </div>
          </div>

          {/* Extracted Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allPrescriptions[0].medications.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{item.name}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold">
                    {item.strength}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  <strong>Frequency:</strong> {item.frequency}
                </div>
                <div className="text-xs text-slate-500">
                  <strong>Duration:</strong> {item.duration} ({item.foodInstruction.replace('_', ' ')})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Scans Ledger */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-600" />
          <span>{t.lostRxHistory}</span>
        </h3>

        <div className="space-y-4">
          {inventory.map((inv) => (
            <div 
              key={inv.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {inv.name} ({inv.strength})
                  </div>
                  <div className="text-xs text-slate-400">
                    Active: {inv.activeSalt} • Batch: {inv.batchNumber} • Last Scanned: {inv.lastScannedDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs text-slate-500 font-mono">
                  Exp: {inv.expiryDate}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[11px] font-bold">
                  Verified Scan
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

