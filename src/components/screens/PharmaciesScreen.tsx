import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Star, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { useMedScan } from '../../contexts/MedScanContext';

export const PharmaciesScreen: React.FC = () => {
  const { pharmacies, reserveMedicine, t } = useMedScan();
  const [selectedPharmacy, setSelectedPharmacy] = useState(pharmacies[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = pharmacies.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Geo-Located Clinical Dispensaries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.pharmaciesTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.pharmaciesSubtitle} Verified inventory sync with local licensed retail pharmacies. One-click reservation holds doses for 4 hours.
          </p>
        </div>
      </div>

      {/* Main Split View: Directory & Map Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 Cols: Pharmacy Cards List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text"
              placeholder="Search pharmacy name or neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-2xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-cyan-500 shadow-xs"
            />
          </div>

          <div className="space-y-4">
            {filteredPharmacies.map((pharmacy) => {
              const isSelected = selectedPharmacy.id === pharmacy.id;
              return (
                <div
                  key={pharmacy.id}
                  onClick={() => setSelectedPharmacy(pharmacy)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {pharmacy.name}
                        </h3>
                        {pharmacy.verifiedPartner && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold flex items-center gap-1 border border-cyan-200 dark:border-cyan-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{t.verifiedPartnerTag}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{pharmacy.address} • {pharmacy.distanceKm} km {t.distanceKmText}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-bold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{pharmacy.rating}</span>
                    </div>
                  </div>

                  {/* Stock Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Live Stock Status:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pharmacy.stockAvailability.map((stock, i) => (
                        <span 
                          key={i}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            stock.inStock 
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                              : 'bg-slate-100 text-slate-400 dark:bg-slate-800 line-through'
                          }`}
                        >
                          {stock.medicineName}: {stock.inStock ? `${stock.unitsAvailable} left (${stock.price.split("/")[0]})` : "Out of Stock"}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={`tel:${pharmacy.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
                    >
                      <Phone className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{t.btnCallPharmacy}</span>
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reserveMedicine(pharmacy.id, "Dolo 650");
                      }}
                      className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-xs"
                    >
                      {t.btnReserveNow}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 6 Cols: Interactive Map Visualization Card */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Live Geographic Dispensary Locator
              </h3>
              <span className="text-xs font-bold text-cyan-600">
                GPS Verified
              </span>
            </div>

            {/* Map Visualizer Area */}
            <div className="mt-4 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800 flex items-center justify-center">
              {/* Stylized dark medical map grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Map Road paths */}
              <svg className="absolute inset-0 w-full h-full stroke-slate-800" strokeWidth="2" fill="none">
                <line x1="0" y1="120" x2="600" y2="120" />
                <line x1="200" y1="0" x2="200" y2="400" />
                <line x1="420" y1="0" x2="420" y2="400" />
                <line x1="0" y1="260" x2="600" y2="260" />
              </svg>

              {/* Patient Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-[10px] shadow-lg shadow-cyan-500 animate-pulse">
                  ●
                </div>
                <span className="text-[9px] bg-slate-900/90 text-cyan-300 px-2 py-0.5 rounded-full mt-1 font-bold border border-cyan-700">
                  Your Location
                </span>
              </div>

              {/* Pharmacy Pin 1 */}
              <div className="absolute top-1/4 left-1/3 flex flex-col items-center cursor-pointer">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  <Store className="w-4 h-4" />
                </div>
                <span className="text-[9px] bg-slate-900/90 text-white px-2 py-0.5 rounded mt-1 font-bold">
                  Apollo (0.6 km)
                </span>
              </div>

              {/* Pharmacy Pin 2 */}
              <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center cursor-pointer">
                <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  <Store className="w-4 h-4" />
                </div>
                <span className="text-[9px] bg-slate-900/90 text-white px-2 py-0.5 rounded mt-1 font-bold">
                  MedPlus (1.4 km)
                </span>
              </div>
            </div>
          </div>

          {/* Selected Pharmacy Quick Details */}
          <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                Selected: {selectedPharmacy.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Delivery ETA: ~{selectedPharmacy.deliveryTimeEstimate} • Rating: {selectedPharmacy.rating} ★
              </div>
            </div>
            <button
              onClick={() => reserveMedicine(selectedPharmacy.id, "Dolo 650")}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-xs"
            >
              Reserve Now
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

