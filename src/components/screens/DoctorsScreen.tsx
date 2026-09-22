import React, { useState } from 'react';
import { 
  Stethoscope, 
  Star, 
  Video, 
  MapPin, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';
import { Doctor } from '../../types/medscan';

export const DoctorsScreen: React.FC = () => {
  const { doctors, shareReportWithDoctor, lastSharedReport, t } = useMedScan();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const handleBook = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    setBookedSlot(selectedDoctor?.nextSlot || "Scheduled");
    setShowBookingModal(false);
    alert(`✓ Telehealth Consultation confirmed with ${selectedDoctor?.name}! Video room link sent.`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Specialists & Consultation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.doctorsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.doctorsSubtitle} Connect with board-certified physicians, transmit AI medication audits, and schedule rapid telehealth or in-clinic reviews.
          </p>
        </div>
      </div>

      {/* Shared Report Status Notice */}
      {lastSharedReport && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Clinical Report Transmitted: <strong>{lastSharedReport.id}</strong> ({lastSharedReport.doctorSignatureStamp})
            </span>
          </div>
          <span className="text-emerald-700 dark:text-emerald-300 font-mono text-[11px]">
            {lastSharedReport.generatedAt}
          </span>
        </div>
      )}

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div 
            key={doc.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              
              {/* Doctor Avatar & Rating */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-cyan-600/20 shrink-0">
                    {doc.name.split(" ")[1]?.[0] || "Dr"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      {doc.specialty}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {doc.qualification}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-2 py-1 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doc.rating}</span>
                </div>
              </div>

              {/* Hospital & Experience */}
              <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{doc.hospital}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{doc.experienceYears} Years Clinical Experience</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Video className="w-3.5 h-3.5" />
                  <span>Next Slot: {doc.nextSlot}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {doc.languages.map((lang, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                    {lang}
                  </span>
                ))}
              </div>

            </div>

            {/* Actions: Share Report & Book Consultation */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => shareReportWithDoctor(doc.id)}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>{t.btnShareMedReport}</span>
              </button>

              <button
                onClick={() => handleBook(doc)}
                className="w-full py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.btnBookConsultation} ({doc.consultationFee})</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Confirm Telehealth Booking
            </h3>
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-2">
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {selectedDoctor.name}
              </div>
              <div className="text-cyan-600 font-semibold">{selectedDoctor.specialty}</div>
              <div className="text-slate-500">Slot: <strong>{selectedDoctor.nextSlot}</strong></div>
              <div className="text-slate-500">Consultation Mode: <strong>Secure HD Video Call</strong></div>
              <div className="text-slate-500">Fee: <strong>{selectedDoctor.consultationFee}</strong></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-xs"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

