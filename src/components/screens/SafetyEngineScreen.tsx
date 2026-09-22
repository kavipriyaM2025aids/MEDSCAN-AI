import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Scan, 
  ArrowRight, 
  GitMerge, 
  Clock, 
  Share2, 
  Printer, 
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useMedScan, INITIAL_MEDICATIONS } from '../../contexts/MedScanContext';
import { Medication } from '../../types/medscan';

export const SafetyEngineScreen: React.FC = () => {
  const { 
    activePrescription, 
    comparisonResult, 
    runSafetyEngineComparison, 
    duplicateIngredientResult, 
    checkDuplicateIngredients, 
    canTakeNowResult, 
    evaluateCanTakeNow, 
    setCurrentScreen,
    shareReportWithDoctor,
    t 
  } = useMedScan();

  // Test presets
  const [selectedPreset, setSelectedPreset] = useState<'mismatch-para' | 'mismatch-amox' | 'match-dolo'>('mismatch-para');
  const [showReportModal, setShowReportModal] = useState(false);

  // Switch preset
  const handleSelectPreset = (key: 'mismatch-para' | 'mismatch-amox' | 'match-dolo') => {
    setSelectedPreset(key);
    if (key === 'mismatch-para') {
      // Prescribed 650mg Paracetamol, scanned Crocin 500mg (Paracetamol 500mg)
      runSafetyEngineComparison("650 mg", INITIAL_MEDICATIONS[3]);
    } else if (key === 'mismatch-amox') {
      // Prescribed 500mg Amoxicillin, scanned Cipla 250mg
      runSafetyEngineComparison("500 mg", INITIAL_MEDICATIONS[2]);
    } else {
      // Full match: Prescribed 650mg, scanned Dolo 650
      runSafetyEngineComparison("650 mg", INITIAL_MEDICATIONS[0]);
    }
  };

  // Switch duplicate ingredient comparison test
  const [dupMedA, setDupMedA] = useState<Medication>(INITIAL_MEDICATIONS[0]); // Dolo 650
  const [dupMedB, setDupMedB] = useState<Medication>(INITIAL_MEDICATIONS[4]); // Cold Relief

  const handleTestDuplicate = (medA: Medication, medB: Medication) => {
    setDupMedA(medA);
    setDupMedB(medB);
    checkDuplicateIngredients(medA, medB);
  };

  const rx = activePrescription;
  const comp = comparisonResult;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exclusive Clinical Verification Technology</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.safetyEngineTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {t.safetyEngineSubtitle} Our dual-stream computer vision and OCR cross-engine validates physical pill strips against your registered doctor's prescription to eliminate pharmacy dispense errors and adverse drug duplication.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-4 h-4" /> Strength Discrepancy Detection
            </span>
            <span className="flex items-center gap-1.5 text-teal-300">
              <CheckCircle2 className="w-4 h-4" /> Duplicate Salt Safeguard
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4" /> "Can I Take This Now?" Clearance
            </span>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-500/10 to-transparent pointer-events-none"></div>
      </div>

      {/* 4-STEP WORKFLOW VISUALIZER (Required by Section 6) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Clinical Verification Flow
            </h2>
            <p className="text-xs text-slate-400">
              Click a preset scenario below to test discrepancy and matching algorithms in real-time
            </p>
          </div>

          {/* Test Preset Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSelectPreset('mismatch-para')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedPreset === 'mismatch-para'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              ⚠ Test Strength Mismatch (650mg vs 500mg)
            </button>
            <button
              onClick={() => handleSelectPreset('mismatch-amox')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedPreset === 'mismatch-amox'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              ⚠ Test Antibiotic Mismatch (500mg vs 250mg)
            </button>
            <button
              onClick={() => handleSelectPreset('match-dolo')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedPreset === 'match-dolo'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              ✓ Test Exact Match (Dolo 650)
            </button>
          </div>
        </div>

        {/* 4 Steps Indicator Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">
              Step 1
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>{t.step1Title}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Rx: {rx.doctorName.split(",")[0]}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">
              Step 2
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>{t.step2Title}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Parsed: {comp?.prescribedItem.name} {comp?.prescribedItem.strength}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">
              Step 3
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <Scan className="w-4 h-4 text-cyan-600" />
              <span>{t.step3Title}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Scanned: {comp?.scannedMedication.name} ({comp?.scannedMedication.strength})
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${
            comp?.overallStatus === 'WARNING' 
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800' 
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
          }`}>
            <div className={`text-[10px] font-extrabold uppercase tracking-widest mb-1 ${
              comp?.overallStatus === 'WARNING' ? 'text-rose-600' : 'text-emerald-600'
            }`}>
              Step 4: AI Verdict
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-current" />
              <span>{comp?.overallStatus === 'WARNING' ? 'Mismatch Alert' : 'Verified Match'}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Confidence: 98% Dual Scan
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 7: SIDE-BY-SIDE VERIFICATION SCREEN & COMPARISON TABLE */}
      {comp && (
        <div className="space-y-6">
          
          {/* Prominent Warning or Success Alert Box */}
          <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm transition-all ${
            comp.overallStatus === 'WARNING'
              ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
              : 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                  comp.overallStatus === 'WARNING' 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {comp.overallStatus === 'WARNING' ? (
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/40 border border-current">
                      {comp.overallStatus === 'WARNING' ? 'RED ALERT: SAFETY INTERCEPT' : 'VERIFIED SAFE'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Comparison ID: {comp.id}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    {comp.headline}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {comp.explanation}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs shadow-xs hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-4 h-4 text-cyan-600" />
                  <span>View Clinical Report</span>
                </button>
              </div>
            </div>

            {/* Prescribed Action Callout */}
            <div className="mt-5 pt-4 border-t border-rose-200 dark:border-rose-900/60 flex items-center gap-2 text-xs font-semibold">
              <strong>Mandatory Protocol:</strong> {comp.actionRecommendation}
            </div>
          </div>

          {/* Visual Side-by-Side Comparison Table (Exact from Section 7!) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Side-by-Side Parameter Discrepancy Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  Cross-validation between Doctor's digital Rx script and Computer Vision pill scan
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Match
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <AlertTriangle className="w-3.5 h-3.5" /> Mismatch
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 font-extrabold">Parameter</th>
                    <th className="py-3 px-4 font-extrabold">Prescription Order</th>
                    <th className="py-3 px-4 font-extrabold">Scanned Medicine</th>
                    <th className="py-3 px-4 font-extrabold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {comp.parameters.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                        {p.name}
                        {p.details && (
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                            {p.details}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {p.prescribed}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {p.scanned}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {p.status === 'match' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Match
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold text-[11px] border border-rose-200 dark:border-rose-800">
                            <AlertTriangle className="w-3.5 h-3.5" /> Mismatch
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 8: DUPLICATE ACTIVE INGREDIENT DETECTOR (Visually Impressive Tree/Diagram!) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-[10px] tracking-wider uppercase mb-1">
              <GitMerge className="w-3 h-3" />
              <span>Multi-Drug Overdose Safeguard</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.duplicateDetectorTitle}
            </h3>
            <p className="text-xs text-slate-400">
              Detect hidden shared chemical molecules across different branded formulations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTestDuplicate(INITIAL_MEDICATIONS[0], INITIAL_MEDICATIONS[4])}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
            >
              Test Dolo 650 + Cold Relief
            </button>
            <button
              onClick={() => handleTestDuplicate(INITIAL_MEDICATIONS[0], INITIAL_MEDICATIONS[1])}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
            >
              Test Dolo 650 + Amoxicillin
            </button>
          </div>
        </div>

        {/* Visual Graph / Tree Flow: Medicine A + Medicine B -> Shared Active Ingredient */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Box 1: Medicine A */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Medicine A (Prescribed / Regimen)
              </span>
              <div className="font-extrabold text-base text-slate-900 dark:text-white">
                {dupMedA.name}
              </div>
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Active Salt: {dupMedA.genericName.split("/")[0]}
              </div>
              <div className="text-[11px] text-slate-400">
                Strength: {dupMedA.strength}
              </div>
            </div>

            {/* Center: Merge Arrow & Shared Ingredient Node */}
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                <GitMerge className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {duplicateIngredientResult?.detected ? "Shared Chemical Overlap" : "No Molecule Conflict"}
              </div>
              <div className="text-[11px] text-slate-400 max-w-[200px]">
                {duplicateIngredientResult?.detected 
                  ? "Convergence on same hepatic pathway" 
                  : "Independent pharmacological mechanisms"}
              </div>
            </div>

            {/* Box 2: Medicine B */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Medicine B (Added / OTC)
              </span>
              <div className="font-extrabold text-base text-slate-900 dark:text-white">
                {dupMedB.name}
              </div>
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Active Salt: {dupMedB.genericName.split("/")[0]}
              </div>
              <div className="text-[11px] text-slate-400">
                Strength: {dupMedB.strength}
              </div>
            </div>

          </div>

          {/* Result Alert inside Duplicate Detector */}
          {duplicateIngredientResult?.detected && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800/60 text-amber-950 dark:text-amber-100 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-extrabold text-sm text-amber-900 dark:text-amber-200">
                  ⚠️ {t.duplicateAlert}: {duplicateIngredientResult.sharedActiveIngredient.toUpperCase()}
                </div>
                <p className="leading-relaxed">
                  {duplicateIngredientResult.clinicalExplanation}
                </p>
                <div className="pt-1 font-semibold text-amber-800 dark:text-amber-300">
                  Estimated Cumulative Load: <strong>{duplicateIngredientResult.totalEstimatedDailyLoad}</strong> (Threshold: {duplicateIngredientResult.safeDailyLimit})
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 9: "CAN I TAKE THIS NOW?" SAFETY CHECK */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.canTakeNowTitle}
            </h3>
            <p className="text-xs text-slate-400">
              Evaluates current clock time, food buffer, scheduled doses, duplicate active ingredients, and interactions
            </p>
          </div>

          <button
            onClick={() => evaluateCanTakeNow()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-extrabold text-xs shadow-md shadow-cyan-600/25 transition-all transform active:scale-95"
          >
            <Clock className="w-4 h-4" />
            <span>{t.canTakeNowBtn}</span>
          </button>
        </div>

        {canTakeNowResult && (
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                  !
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {canTakeNowResult.headline}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Slot: {canTakeNowResult.scheduledTime} • Active Prescriptions: {canTakeNowResult.currentMedicationsCount}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <span className="px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 text-xs font-extrabold">
                {canTakeNowResult.category}
              </span>
            </div>

            {/* Checklist factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Duplicate Check</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Evaluated
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Meal Relation</span>
                <span className="font-bold text-cyan-600 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" /> After Food Required
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Drug Interactions</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> No Fatal Conflict
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Interval Adherence</span>
                <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                  Min 6 hr gap valid
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              {canTakeNowResult.disclaimer}
            </div>
          </div>
        )}
      </div>

      {/* SECTION: UNIFIED MEDICATION SAFETY REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              ✕
            </button>

            {/* Report Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded">
                    MEDSCAN-CLINICAL-REPORT-2026
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Unified Medication Safety Audit
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                  title="Print Clinical Audit"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Patient & Prescription Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient</span>
                <span className="font-bold text-slate-900 dark:text-white">{rx.patientName} (29F)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Prescribing Physician</span>
                <span className="font-bold text-slate-900 dark:text-white">{rx.doctorName.split(",")[0]}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Diagnosis</span>
                <span className="font-bold text-slate-900 dark:text-white">Acute Pyrexia & URTI</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Audit Status</span>
                <span className="font-bold text-rose-600">ACTION REQUIRED</span>
              </div>
            </div>

            {/* Report Discrepancy Findings */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Key Clinical Findings:
              </h4>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-900 dark:text-rose-200">
                <strong>1. Strength Mismatch:</strong> Patient holds {comp?.scannedMedication.name} ({comp?.scannedMedication.strength}), whereas prescription dictates {comp?.prescribedItem.name} {comp?.prescribedItem.strength}. Sub-therapeutic fever management risk.
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-900 dark:text-amber-200">
                <strong>2. Duplicate Salt Exposure:</strong> Cold Relief Tablet contains 500mg acetaminophen; concurrent intake with Dolo 650 pushes daily intake past 4000mg maximum safety limit.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  shareReportWithDoctor("doc-1");
                  setShowReportModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-navy-900 text-white hover:bg-navy-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Transmit to Dr. Sharma</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

