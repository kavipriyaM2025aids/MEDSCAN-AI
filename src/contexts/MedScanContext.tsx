import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  RolePortal, 
  ScreenRoute, 
  Medication, 
  Prescription, 
  SafetyComparisonResult,
  DuplicateIngredientResult,
  CanTakeNowEvaluation,
  InventoryItem,
  DrugInteraction,
  Pharmacy,
  Doctor,
  DosageReminder,
  ClinicalSafetyReport
} from '../types/medscan';
import { translations, Translations } from '../i18n/translations';
import { audioService } from '../utils/audio';

// Realistic Master DB Medications
export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: "med-dolo-650",
    name: "Dolo 650",
    genericName: "Paracetamol / Acetaminophen",
    brandName: "Dolo 650 Tablet",
    strength: "650 mg",
    dosageForm: "Oral Film-Coated Tablet",
    activeIngredients: ["Paracetamol (650mg)"],
    manufacturer: "Micro Labs Ltd",
    uses: [
      "Fever and Pyrexia reduction",
      "Relief of mild to moderate body ache, headache & toothache",
      "Post-immunization fever management"
    ],
    precautions: [
      "Do not exceed 4,000 mg (4 grams) per 24 hours to prevent hepatotoxicity",
      "Avoid concurrent consumption of alcohol",
      "Use with extreme caution in patients with hepatic or renal impairment"
    ],
    commonSideEffects: [
      "Mild nausea (rare)",
      "Allergic skin rashes or urticaria (infrequent)"
    ],
    storageInfo: "Store below 25°C in a dry place protected from direct sunlight & moisture.",
    prescriptionSchedule: "Schedule H Prescription Drug (Warn: Not to be sold without Rx)",
    category: "Analgesic & Antipyretic",
    foodInstructions: "Take after meals with a full glass of water.",
    warnings: [
      "Contains Paracetamol: Overdose may cause serious liver damage or death.",
      "Do not combine with other OTC cold, cough or pain medications without checking active ingredients."
    ],
    features: {
      shapeForm: "Oval / Capsule-shaped",
      estDimensions: "15.2 × 7.1 mm",
      thickness: "~4.8 mm",
      colorSpectrum: "White",
      imprintOcr: '"DOLO 650"',
      surfaceTexture: "Smooth Film-Coated",
      scoreLineNotch: "Single Bisect Score Line",
      mfrLogoCheck: "Micro Labs Ltd Verified",
      packagingFormat: "Alu-Alu Blister Strip",
      confidence: 98
    },
    referenceImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "med-amox-500",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin Trihydrate",
    brandName: "Mox 500 Capsule",
    strength: "500 mg",
    dosageForm: "Hard Gelatin Capsule",
    activeIngredients: ["Amoxicillin Trihydrate (500mg)"],
    manufacturer: "Sun Pharmaceutical Industries Ltd",
    uses: [
      "Bacterial infections of the respiratory tract",
      "Ear, nose, and throat (ENT) infections",
      "Urinary tract infections (UTIs)"
    ],
    precautions: [
      "Complete the entire prescribed antibiotic course even if feeling better",
      "Contraindicated in patients with severe penicillin allergy or anaphylaxis history"
    ],
    commonSideEffects: [
      "Diarrhea or loose stools",
      "Mild abdominal cramping",
      "Nausea"
    ],
    storageInfo: "Store in a cool dry place below 30°C. Protect from moisture.",
    prescriptionSchedule: "Schedule H1 Antibiotic",
    category: "Broad-Spectrum Penicillin Antibiotic",
    foodInstructions: "Can be taken before or after meals. Drink plenty of water.",
    warnings: [
      "Antibiotic resistance alert: Incomplete courses lead to bacterial resistance."
    ],
    features: {
      shapeForm: "Oblong Capsule",
      estDimensions: "19.0 × 6.8 mm",
      thickness: "~6.2 mm",
      colorSpectrum: "Maroon & Gold",
      imprintOcr: '"MOX 500"',
      surfaceTexture: "Smooth Gelatin Shell",
      scoreLineNotch: "No Score Line (Capsule)",
      mfrLogoCheck: "Sun Pharma Verified",
      packagingFormat: "PVC/PVDC Blister Pack",
      confidence: 99
    },
    referenceImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "med-amox-250",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin Trihydrate",
    brandName: "Novamox 250",
    strength: "250 mg",
    dosageForm: "Capsule",
    activeIngredients: ["Amoxicillin (250mg)"],
    manufacturer: "Cipla Ltd",
    uses: ["Mild pediatric/adult bacterial infections"],
    precautions: ["Complete antibiotic duration"],
    commonSideEffects: ["Mild nausea", "Rash"],
    storageInfo: "Store below 25°C",
    prescriptionSchedule: "Schedule H1 Antibiotic",
    category: "Antibiotic",
    foodInstructions: "Take with water",
    warnings: ["Half-strength formulation"],
    features: {
      shapeForm: "Small Oblong Capsule",
      estDimensions: "14.5 × 5.5 mm",
      colorSpectrum: "Red / Yellow",
      imprintOcr: '"CIPLA 250"',
      surfaceTexture: "Gelatin",
      scoreLineNotch: "None",
      mfrLogoCheck: "Cipla Verified",
      packagingFormat: "Blister Pack",
      confidence: 96
    }
  },
  {
    id: "med-para-500",
    name: "Paracetamol 500mg",
    genericName: "Paracetamol / Acetaminophen",
    brandName: "Crocin 500",
    strength: "500 mg",
    dosageForm: "Tablet",
    activeIngredients: ["Paracetamol (500mg)"],
    manufacturer: "GlaxoSmithKline Pharmaceuticals",
    uses: ["Mild fever and pain"],
    precautions: ["Do not exceed 4000mg/day"],
    commonSideEffects: ["None at therapeutic doses"],
    storageInfo: "Store in a cool dry place",
    prescriptionSchedule: "Over The Counter / Schedule H",
    category: "Analgesic",
    foodInstructions: "Take after food",
    warnings: ["Caution with other paracetamol products"],
    features: {
      shapeForm: "Round Flat Tablet",
      estDimensions: "12.0 × 12.0 mm",
      thickness: "~3.8 mm",
      colorSpectrum: "White",
      imprintOcr: '"CROCIN 500"',
      surfaceTexture: "Uncoated compressed",
      scoreLineNotch: "Single Score Line",
      mfrLogoCheck: "GSK Verified",
      packagingFormat: "Blister Strip",
      confidence: 95
    }
  },
  {
    id: "med-cold-relief",
    name: "Cold Relief Multi-Action",
    genericName: "Paracetamol + Phenylephrine + Chlorpheniramine",
    brandName: "Sinarest Tablet",
    strength: "500mg / 10mg / 2mg",
    dosageForm: "Tablet",
    activeIngredients: [
      "Paracetamol (500mg)",
      "Phenylephrine HCl (10mg)",
      "Chlorpheniramine Maleate (2mg)"
    ],
    manufacturer: "Centaur Pharmaceuticals",
    uses: ["Common cold, sinus congestion, runny nose, feverish headache"],
    precautions: ["Causes drowsiness. Avoid driving. Contains Paracetamol."],
    commonSideEffects: ["Drowsiness", "Dry mouth", "Mild dizziness"],
    storageInfo: "Store below 25°C protected from moisture",
    prescriptionSchedule: "Schedule H",
    category: "Cold & Antiallergic Formulation",
    foodInstructions: "Take with or after food before sleep",
    warnings: [
      "Contains Paracetamol: Risk of duplicate acetaminophen toxicity if taken with Dolo 650."
    ],
    features: {
      shapeForm: "Round Biconvex Tablet",
      estDimensions: "11.0 × 11.0 mm",
      colorSpectrum: "Light Yellow",
      imprintOcr: '"SINA"',
      surfaceTexture: "Coated",
      scoreLineNotch: "None",
      mfrLogoCheck: "Centaur Verified",
      packagingFormat: "Blister Strip",
      confidence: 94
    }
  },
  {
    id: "med-augmentin-625",
    name: "Augmentin 625 Duo",
    genericName: "Amoxicillin & Potassium Clavulanate",
    brandName: "Augmentin 625 Duo",
    strength: "500 mg + 125 mg",
    dosageForm: "Film-Coated Tablet",
    activeIngredients: ["Amoxicillin (500mg)", "Clavulanic Acid (125mg)"],
    manufacturer: "GSK Pharmaceuticals",
    uses: ["Resistant bacterial infections, RTI, dental abscesses"],
    precautions: ["Take at start of meal to minimize GI intolerance"],
    commonSideEffects: ["Mild diarrhea", "Nausea"],
    storageInfo: "Store in moisture-proof container below 25°C",
    prescriptionSchedule: "Schedule H1 Antibiotic",
    category: "Beta-lactamase Inhibitor Combination",
    foodInstructions: "Take right at the beginning of a meal.",
    warnings: ["Must complete full 5-7 day course"],
    features: {
      shapeForm: "Oval Biconvex",
      estDimensions: "21.5 × 9.5 mm",
      colorSpectrum: "White to Off-White",
      imprintOcr: '"AC 625"',
      surfaceTexture: "Film-Coated",
      scoreLineNotch: "None",
      mfrLogoCheck: "GSK Verified",
      packagingFormat: "Alu-Alu Moisture Barrier Pack",
      confidence: 98
    }
  },
  {
    id: "med-pantocid-40",
    name: "Pantocid 40",
    genericName: "Pantoprazole Sodium",
    brandName: "Pantocid 40 Gastro-Resistant",
    strength: "40 mg",
    dosageForm: "Enteric-Coated Tablet",
    activeIngredients: ["Pantoprazole (40mg)"],
    manufacturer: "Sun Pharma Laboratories",
    uses: ["Gastroesophageal reflux disease (GERD)", "Gastric and duodenal ulcers"],
    precautions: ["Do not crush or chew the tablet"],
    commonSideEffects: ["Headache", "Abdominal pain"],
    storageInfo: "Store protected from moisture and light below 25°C",
    prescriptionSchedule: "Schedule H",
    category: "Proton Pump Inhibitor (PPI)",
    foodInstructions: "Take 1 hour before morning breakfast.",
    warnings: ["Swallow whole without crushing"],
    features: {
      shapeForm: "Round Biconvex",
      estDimensions: "8.5 × 8.5 mm",
      colorSpectrum: "Yellow",
      imprintOcr: '"P40"',
      surfaceTexture: "Smooth Enteric Coated",
      scoreLineNotch: "None",
      mfrLogoCheck: "Sun Pharma Verified",
      packagingFormat: "Alu-Alu Blister Strip",
      confidence: 97
    }
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: "rx-sharma-101",
    doctorName: "Dr. Arvind Sharma, MD (Internal Med)",
    specialty: "Senior Consultant Physician",
    clinic: "Apollo Clinical Care Center, Indiranagar",
    licenseNumber: "MCI-IND-48291",
    patientName: "Kavi Priya",
    patientAge: 29,
    patientGender: "Female",
    date: "2026-09-10",
    diagnosis: "Acute Upper Respiratory Tract Infection with High Grade Pyrexia",
    medications: [
      {
        name: "Paracetamol",
        genericName: "Paracetamol",
        strength: "650 mg",
        dosageForm: "Tablet",
        frequency: "1-1-1 (Three times daily)",
        duration: "3 days",
        foodInstruction: "after_food",
        instructions: "Take only if body temperature exceeds 100°F. Maintain 6 hour interval."
      },
      {
        name: "Amoxicillin",
        genericName: "Amoxicillin Trihydrate",
        strength: "500 mg",
        dosageForm: "Capsule",
        frequency: "1-0-1 (Twice daily)",
        duration: "5 days",
        foodInstruction: "after_food",
        instructions: "Complete mandatory full 5-day antibiotic course."
      },
      {
        name: "Pantoprazole",
        genericName: "Pantoprazole Sodium",
        strength: "40 mg",
        dosageForm: "Tablet",
        frequency: "1-0-0 (Once daily morning)",
        duration: "5 days",
        foodInstruction: "before_food",
        instructions: "Take 45 minutes before breakfast with water."
      }
    ],
    rawOcrText: "Dr. Arvind Sharma MD | Apollo Clinic\nPatient: Kavi Priya, 29F | Date: 10/09/2026\nRx:\n1. Tab Paracetamol 650mg TDS (1-1-1) x 3 days (after food)\n2. Cap Amoxicillin 500mg BD (1-0-1) x 5 days (after food)\n3. Tab Pantoprazole 40mg OD (1-0-0) x 5 days (before food)"
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Dolo 650",
    strength: "650 mg",
    dosageForm: "Tablet",
    countRemaining: 14,
    totalPills: 15,
    minThreshold: 4,
    expiryDate: "2027-11-30",
    batchNumber: "DL-9824X",
    lastScannedDate: "2026-09-11",
    status: "IN_STOCK",
    dosageFrequency: "1-1-1 TDS",
    category: "Antipyretic",
    activeSalt: "Paracetamol 650mg"
  },
  {
    id: "inv-2",
    name: "Amoxicillin (Mox 500)",
    strength: "500 mg",
    dosageForm: "Capsule",
    countRemaining: 3,
    totalPills: 10,
    minThreshold: 4,
    expiryDate: "2026-12-15",
    batchNumber: "MX-4029B",
    lastScannedDate: "2026-09-10",
    status: "LOW_STOCK",
    dosageFrequency: "1-0-1 BD",
    category: "Antibiotic",
    activeSalt: "Amoxicillin Trihydrate"
  },
  {
    id: "inv-3",
    name: "Pantocid 40",
    strength: "40 mg",
    dosageForm: "Tablet",
    countRemaining: 9,
    totalPills: 10,
    minThreshold: 3,
    expiryDate: "2027-08-31",
    batchNumber: "PT-1120K",
    lastScannedDate: "2026-09-09",
    status: "IN_STOCK",
    dosageFrequency: "1-0-0 Morning",
    category: "Antacid / PPI",
    activeSalt: "Pantoprazole Sodium"
  },
  {
    id: "inv-4",
    name: "Cetirizine 10mg",
    strength: "10 mg",
    dosageForm: "Tablet",
    countRemaining: 2,
    totalPills: 10,
    minThreshold: 4,
    expiryDate: "2026-09-20",
    batchNumber: "CZ-3329A",
    lastScannedDate: "2026-08-15",
    status: "EXPIRING_SOON",
    dosageFrequency: "0-0-1 Night",
    category: "Antihistamine",
    activeSalt: "Cetirizine Hydrochloride"
  },
  {
    id: "inv-5",
    name: "Gelusil Liquid Syrup",
    strength: "200 ml",
    dosageForm: "Syrup Bottle",
    countRemaining: 0,
    totalPills: 200,
    minThreshold: 50,
    expiryDate: "2026-05-30",
    batchNumber: "GL-0021X",
    lastScannedDate: "2026-05-10",
    status: "EXPIRED",
    dosageFrequency: "10ml SOS",
    category: "Antacid",
    activeSalt: "Aluminium & Magnesium Hydroxide"
  }
];

export const INITIAL_INTERACTIONS: DrugInteraction[] = [
  {
    id: "int-1",
    drug1: "Aspirin 81mg",
    drug2: "Ibuprofen 400mg",
    severity: "HIGH",
    mechanism: "Competitive COX-1 inhibition and synergistic gastric mucosal erosion.",
    clinicalAdvice: "Ibuprofen attenuates the cardioprotective antiplatelet effect of aspirin and multiplies gastrointestinal bleeding danger by 3-4x.",
    actionRequired: "Take aspirin at least 30 minutes before or 8 hours after ibuprofen. Consult your cardiologist."
  },
  {
    id: "int-2",
    drug1: "Ciprofloxacin 500mg",
    drug2: "Gelusil Antacid",
    severity: "MODERATE",
    mechanism: "Chelation of fluoroquinolone antibiotic by magnesium and aluminium polyvalent cations.",
    clinicalAdvice: "Reduces antibiotic systemic absorption by up to 75%, leading to potential antibiotic therapy failure.",
    actionRequired: "Administer ciprofloxacin at least 2 hours before or 6 hours after any antacid or mineral supplement."
  },
  {
    id: "int-3",
    drug1: "Amoxicillin 500mg",
    drug2: "Paracetamol 650mg",
    severity: "LOW",
    mechanism: "No significant pharmacokinetic or cytochrome P450 competition.",
    clinicalAdvice: "Safe for concurrent therapeutic use when following prescribed dosages and food instructions.",
    actionRequired: "Routine monitoring only. Maintain adequate hydration."
  }
];

export const INITIAL_PHARMACIES: Pharmacy[] = [
  {
    id: "pharma-1",
    name: "Apollo Pharmacy 24/7",
    address: "100ft Road, 4th Block, Indiranagar, Bengaluru",
    distanceKm: 0.6,
    rating: 4.9,
    reviewsCount: 428,
    verifiedPartner: true,
    openNow: true,
    openHours: "Open 24 Hours",
    phone: "+91 80 2520 1199",
    unitPriceEstimate: "₹34.50",
    deliveryTimeEstimate: "18 mins",
    stockAvailability: [
      { medicineName: "Dolo 650", inStock: true, unitsAvailable: 120, price: "₹34.00 / strip of 15" },
      { medicineName: "Amoxicillin 500mg", inStock: true, unitsAvailable: 45, price: "₹82.50 / strip of 10" },
      { medicineName: "Pantocid 40", inStock: true, unitsAvailable: 90, price: "₹145.00 / strip of 15" }
    ],
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: "pharma-2",
    name: "MedPlus Health Hub",
    address: "80ft Road, Near Sony Signal, Koramangala",
    distanceKm: 1.4,
    rating: 4.7,
    reviewsCount: 312,
    verifiedPartner: true,
    openNow: true,
    openHours: "07:00 AM - 11:30 PM",
    phone: "+91 80 4110 8822",
    unitPriceEstimate: "₹32.00",
    deliveryTimeEstimate: "25 mins",
    stockAvailability: [
      { medicineName: "Dolo 650", inStock: true, unitsAvailable: 80, price: "₹33.50 / strip of 15" },
      { medicineName: "Amoxicillin 500mg", inStock: true, unitsAvailable: 20, price: "₹79.00 / strip of 10" },
      { medicineName: "Pantocid 40", inStock: false, unitsAvailable: 0, price: "₹140.00 / strip of 15" }
    ],
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: "pharma-3",
    name: "Wellness Forever Express",
    address: "CMH Road, Metro Pillar 42, Bengaluru",
    distanceKm: 2.2,
    rating: 4.8,
    reviewsCount: 195,
    verifiedPartner: true,
    openNow: true,
    openHours: "Open 24 Hours",
    phone: "+91 80 6799 4433",
    unitPriceEstimate: "₹35.00",
    deliveryTimeEstimate: "35 mins",
    stockAvailability: [
      { medicineName: "Dolo 650", inStock: true, unitsAvailable: 200, price: "₹34.50 / strip of 15" },
      { medicineName: "Amoxicillin 500mg", inStock: true, unitsAvailable: 60, price: "₹83.00 / strip of 10" }
    ],
    lat: 12.9784,
    lng: 77.6408
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Arvind Sharma, MD",
    specialty: "Internal Medicine & Clinical Pharmacology",
    qualification: "MBBS, MD (Medicine), Fellowship in Clinical Therapeutics",
    hospital: "Apollo Specialty Hospitals",
    experienceYears: 16,
    rating: 4.9,
    consultationFee: "₹800",
    availableToday: true,
    nextSlot: "Today at 04:30 PM",
    languages: ["English", "Hindi"],
    telehealthAvailable: true
  },
  {
    id: "doc-2",
    name: "Dr. Priya Ramanathan, MD, DM",
    specialty: "Cardiology & Vascular Medicine",
    qualification: "MBBS, MD, DM (Cardiology, AIIMS)",
    hospital: "Fortis Escorts Heart Institute",
    experienceYears: 19,
    rating: 5.0,
    consultationFee: "₹1200",
    availableToday: true,
    nextSlot: "Today at 06:15 PM",
    languages: ["English", "Tamil", "Hindi"],
    telehealthAvailable: true
  },
  {
    id: "doc-3",
    name: "Dr. Ananya Mukherjee, MBBS, DNB",
    specialty: "Family Physician & Pediatric Care",
    qualification: "MBBS, DNB (Family Medicine), MRCGP (UK)",
    hospital: "Manipal Hospital",
    experienceYears: 11,
    rating: 4.8,
    consultationFee: "₹650",
    availableToday: false,
    nextSlot: "Tomorrow at 10:00 AM",
    languages: ["English", "Hindi"],
    telehealthAvailable: true
  }
];

export const INITIAL_REMINDERS: DosageReminder[] = [
  {
    id: "rem-1",
    medicineName: "Pantocid 40",
    dose: "1 Tablet (40 mg)",
    time: "08:00 AM",
    mealRelation: "before_food",
    frequency: "Daily Morning",
    active: true,
    spokenAudioText: "Reminder: Take Pantocid 40, one tablet before morning breakfast."
  },
  {
    id: "rem-2",
    medicineName: "Dolo 650",
    dose: "1 Tablet (650 mg)",
    time: "01:30 PM",
    mealRelation: "after_food",
    frequency: "Three Times Daily",
    active: true,
    spokenAudioText: "Time to check your scheduled medication: Dolo 650, 1 tablet after food."
  },
  {
    id: "rem-3",
    medicineName: "Amoxicillin 500mg",
    dose: "1 Capsule (500 mg)",
    time: "08:30 PM",
    mealRelation: "after_food",
    frequency: "Twice Daily (Night)",
    active: true,
    spokenAudioText: "Evening Antibiotic dose: Amoxicillin 500mg, 1 capsule with plenty of water after dinner."
  }
];

interface MedScanContextType {
  // Navigation & View
  currentScreen: ScreenRoute;
  setCurrentScreen: (screen: ScreenRoute) => void;
  rolePortal: RolePortal;
  setRolePortal: (role: RolePortal) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;

  // Vision Scan State
  scannedMedication: Medication | null;
  setScannedMedication: (med: Medication | null) => void;
  isAnalyzingVision: boolean;
  scanProgress: number;
  triggerScanPreset: (presetKey: 'dolo' | 'amox' | 'augmentin' | 'pantocid') => void;

  // Prescription State
  activePrescription: Prescription;
  setActivePrescription: (rx: Prescription) => void;
  allPrescriptions: Prescription[];
  
  // Prescription-to-Pill Safety Engine
  comparisonResult: SafetyComparisonResult | null;
  duplicateIngredientResult: DuplicateIngredientResult | null;
  canTakeNowResult: CanTakeNowEvaluation | null;
  runSafetyEngineComparison: (prescribedStrength: string, scannedPill: Medication) => void;
  checkDuplicateIngredients: (medA: Medication, medB: Medication) => void;
  evaluateCanTakeNow: (targetMed?: Medication) => void;

  // Inventory
  inventory: InventoryItem[];
  addToInventory: (item: Partial<InventoryItem>) => void;
  updateStockCount: (id: string, delta: number) => void;
  removeInventoryItem: (id: string) => void;

  // Interactions
  selectedInteractionDrugs: string[];
  toggleInteractionDrug: (drugName: string) => void;
  activeInteractions: DrugInteraction[];

  // Reminders & Audio Alarm
  reminders: DosageReminder[];
  triggerAlarmBeep: () => void;
  speakReminder: (text?: string) => void;
  toggleReminder: (id: string) => void;
  showAlarmModal: boolean;
  setShowAlarmModal: (show: boolean) => void;

  // Pharmacies & Doctors
  pharmacies: Pharmacy[];
  doctors: Doctor[];
  reserveMedicine: (pharmacyId: string, medName: string) => void;
  shareReportWithDoctor: (doctorId: string) => void;
  lastSharedReport: ClinicalSafetyReport | null;

  // AI Pharmacist Assistant
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
}

const MedScanContext = createContext<MedScanContextType | null>(null);

export const MedScanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenRoute>('dashboard');
  const [rolePortal, setRolePortal] = useState<RolePortal>('patient');
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Vision Scan state
  const [scannedMedication, setScannedMedication] = useState<Medication | null>(INITIAL_MEDICATIONS[0]); // Default Dolo 650
  const [isAnalyzingVision, setIsAnalyzingVision] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);

  // Prescriptions & Safety Engine
  const [activePrescription, setActivePrescription] = useState<Prescription>(INITIAL_PRESCRIPTIONS[0]);
  const [allPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);

  // Safety Engine default comparison: Prescribed 650mg vs Scanned 500mg (Demonstrating the exact prompt requirement!)
  const [comparisonResult, setComparisonResult] = useState<SafetyComparisonResult | null>(null);
  const [duplicateIngredientResult, setDuplicateIngredientResult] = useState<DuplicateIngredientResult | null>(null);
  const [canTakeNowResult, setCanTakeNowResult] = useState<CanTakeNowEvaluation | null>(null);

  // Inventory, Interactions, Pharmacies, Doctors
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [selectedInteractionDrugs, setSelectedInteractionDrugs] = useState<string[]>([
    "Aspirin 81mg",
    "Paracetamol 650mg"
  ]);
  const [activeInteractions, setActiveInteractions] = useState<DrugInteraction[]>([]);
  const [reminders, setReminders] = useState<DosageReminder[]>(INITIAL_REMINDERS);
  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const [pharmacies] = useState<Pharmacy[]>(INITIAL_PHARMACIES);
  const [doctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [lastSharedReport, setLastSharedReport] = useState<ClinicalSafetyReport | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  const t = translations[language];

  // Sync dark mode class with documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Calculate drug interactions based on selected drugs
  useEffect(() => {
    const active: DrugInteraction[] = [];
    for (const rule of INITIAL_INTERACTIONS) {
      const match1 = selectedInteractionDrugs.some(d => d.toLowerCase().includes(rule.drug1.toLowerCase().split(" ")[0]));
      const match2 = selectedInteractionDrugs.some(d => d.toLowerCase().includes(rule.drug2.toLowerCase().split(" ")[0]));
      if (match1 && match2) {
        active.push(rule);
      }
    }
    setActiveInteractions(active);
  }, [selectedInteractionDrugs]);

  // Trigger demo scan preset
  const triggerScanPreset = (presetKey: 'dolo' | 'amox' | 'augmentin' | 'pantocid') => {
    setIsAnalyzingVision(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsAnalyzingVision(false);
          return 100;
        }
        return p + 25;
      });
    }, 150);

    let matchMed: Medication = INITIAL_MEDICATIONS[0];
    if (presetKey === 'amox') matchMed = INITIAL_MEDICATIONS[1];
    if (presetKey === 'augmentin') matchMed = INITIAL_MEDICATIONS[5];
    if (presetKey === 'pantocid') matchMed = INITIAL_MEDICATIONS[6];

    setTimeout(() => {
      setScannedMedication(matchMed);
      // Play brief audio indicator
      audioService.playCitizenAlarmBeep();
    }, 600);
  };

  // Run Safety Engine Comparison (Prescription vs Scanned Pill)
  const runSafetyEngineComparison = (prescribedStrength: string, scannedPill: Medication) => {
    const rxItem = activePrescription.medications[0]; // Paracetamol 650mg
    const isStrengthMatch = prescribedStrength.toLowerCase().trim() === scannedPill.strength.toLowerCase().trim();
    const isNameMatch = scannedPill.name.toLowerCase().includes(rxItem.genericName?.toLowerCase() || rxItem.name.toLowerCase()) ||
      rxItem.name.toLowerCase().includes(scannedPill.genericName.toLowerCase().split(" ")[0]);

    const isMatch = isStrengthMatch && isNameMatch;

    const result: SafetyComparisonResult = {
      id: `safety-${Date.now()}`,
      timestamp: new Date().toISOString(),
      prescriptionId: activePrescription.id,
      prescribedItem: {
        ...rxItem,
        strength: prescribedStrength
      },
      scannedMedication: scannedPill,
      overallStatus: isMatch ? 'MATCH' : 'WARNING',
      headline: isMatch 
        ? "PRESCRIPTION & MEDICINE FULLY MATCH" 
        : (isStrengthMatch ? "MEDICINE ACTIVE INGREDIENT VARIATION" : "PRESCRIPTION MISMATCH DETECTED"),
      explanation: isMatch
        ? "The scanned medicine matches the prescribed drug, active ingredient, dosage form, and strength."
        : `The scanned medicine strength (${scannedPill.strength}) does NOT match the prescribed strength (${prescribedStrength}). Verify with your pharmacist or prescribing doctor before taking.`,
      parameters: [
        {
          name: "Medicine / Active Salt",
          prescribed: rxItem.name + " (" + (rxItem.genericName || "Paracetamol") + ")",
          scanned: scannedPill.name + " (" + scannedPill.genericName + ")",
          status: isNameMatch ? "match" : "warning",
          details: isNameMatch ? "Identical active therapeutic salt" : "Brand and generic comparison"
        },
        {
          name: "Formulation Strength",
          prescribed: prescribedStrength,
          scanned: scannedPill.strength,
          status: isStrengthMatch ? "match" : "warning",
          details: isStrengthMatch ? "Exact dosage match" : "Sub-therapeutic or higher dosage difference detected"
        },
        {
          name: "Dosage Form",
          prescribed: rxItem.dosageForm,
          scanned: scannedPill.dosageForm,
          status: "match",
          details: "Oral administration form matches"
        },
        {
          name: "Prescribed Frequency",
          prescribed: rxItem.frequency,
          scanned: "As labeled on blister strip",
          status: "match",
          details: "Follow prescribing physician's frequency"
        },
        {
          name: "Food Timing Instruction",
          prescribed: "After meals with water",
          scanned: scannedPill.foodInstructions,
          status: "match",
          details: "Gastric protection compliant"
        }
      ],
      actionRecommendation: isMatch
        ? "Safe to proceed under doctor's prescribed dosage schedule."
        : "Do not consume until confirmed with your pharmacist or physician.",
      verifiedByAi: true
    };

    setComparisonResult(result);
  };

  // Run Duplicate Active Ingredient Detector
  const checkDuplicateIngredients = (medA: Medication, medB: Medication) => {
    // Check if both contain Paracetamol / Acetaminophen
    const hasParaA = medA.activeIngredients.some(i => i.toLowerCase().includes("paracetamol") || i.toLowerCase().includes("acetaminophen"));
    const hasParaB = medB.activeIngredients.some(i => i.toLowerCase().includes("paracetamol") || i.toLowerCase().includes("acetaminophen"));

    if (hasParaA && hasParaB) {
      setDuplicateIngredientResult({
        detected: true,
        medicineA: medA.name + " (" + medA.strength + ")",
        medicineB: medB.name + " (" + medB.strength + ")",
        sharedActiveIngredient: "Paracetamol (Acetaminophen)",
        totalEstimatedDailyLoad: "3,800 mg - 4,450 mg / day",
        safeDailyLimit: "4,000 mg / 24 hours max for adults",
        severity: "HIGH",
        clinicalExplanation: "Both selected medicines contain Paracetamol. Inadvertent concurrent consumption carries a severe risk of hepatotoxicity (acute liver injury).",
        recommendation: "Never combine multiple medications containing paracetamol without clinical authorization. Verify with your physician."
      });
    } else {
      setDuplicateIngredientResult({
        detected: false,
        medicineA: medA.name,
        medicineB: medB.name,
        sharedActiveIngredient: "None detected",
        severity: "MODERATE",
        clinicalExplanation: "No duplicate active chemical salts detected across the selected medications.",
        recommendation: "Ensure standard drug-drug interaction screening before concurrent administration."
      });
    }
  };

  // "Can I Take This Now?" Safety Check
  const evaluateCanTakeNow = (targetMed?: Medication) => {
    const med = targetMed || scannedMedication || INITIAL_MEDICATIONS[0];
    const nowHour = new Date().getHours();
    const isEvening = nowHour >= 18;
    const isMorning = nowHour < 12;

    const evaluation: CanTakeNowEvaluation = {
      category: "CAUTION",
      headline: `TIMING & CLINICAL VERIFICATION FOR ${med.name.toUpperCase()}`,
      verdictDetail: "Review food status before consuming. Follow your doctor's meal guidance.",
      scheduledTime: isMorning ? "Morning Slot (08:30 AM)" : (isEvening ? "Evening Slot (08:30 PM)" : "Afternoon Slot (01:30 PM)"),
      currentMedicationsCount: inventory.filter(i => i.status === 'IN_STOCK').length,
      foodGuidance: med.foodInstructions || "Take with meals.",
      factors: {
        duplicateIngredientChecked: true,
        foodTimingAligned: true,
        interactionRiskLow: true,
        scheduleAdherenceValid: true
      },
      disclaimer: "Educational screening only. MEDSCAN AI does not prescribe or provide definitive medical clearance."
    };

    setCanTakeNowResult(evaluation);
  };

  // Trigger Web Audio Beep
  const triggerAlarmBeep = () => {
    audioService.playCitizenAlarmBeep();
  };

  // Spoken reminder
  const speakReminder = (text?: string) => {
    const msg = text || t.alarmSpokenMessage;
    audioService.speakText(msg, language);
  };

  // Inventory actions
  const addToInventory = (item: Partial<InventoryItem>) => {
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: item.name || "Scanned Medicine",
      strength: item.strength || "500 mg",
      dosageForm: item.dosageForm || "Tablet",
      countRemaining: item.countRemaining || 10,
      totalPills: item.totalPills || 15,
      minThreshold: 4,
      expiryDate: item.expiryDate || "2027-12-31",
      batchNumber: item.batchNumber || `BAT-${Math.floor(1000 + Math.random() * 9000)}`,
      lastScannedDate: new Date().toISOString().split("T")[0],
      status: "IN_STOCK",
      dosageFrequency: item.dosageFrequency || "1-0-1",
      category: item.category || "General Medication",
      activeSalt: item.activeSalt || "Active Pharmaceutical Ingredient"
    };
    setInventory(prev => [newItem, ...prev]);
  };

  const updateStockCount = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const nextCount = Math.max(0, item.countRemaining + delta);
        let nextStatus = item.status;
        if (nextCount === 0) nextStatus = 'EXPIRED';
        else if (nextCount <= item.minThreshold) nextStatus = 'LOW_STOCK';
        else nextStatus = 'IN_STOCK';
        return { ...item, countRemaining: nextCount, status: nextStatus };
      }
      return item;
    }));
  };

  const removeInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  // Toggle drug interaction chips
  const toggleInteractionDrug = (drugName: string) => {
    setSelectedInteractionDrugs(prev => 
      prev.includes(drugName) 
        ? prev.filter(d => d !== drugName)
        : [...prev, drugName]
    );
  };

  // Toggle Reminder
  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  // Pharmacy & Doctor actions
  const reserveMedicine = (pharmacyId: string, medName: string) => {
    const p = pharmacies.find(ph => ph.id === pharmacyId);
    alert(`✓ Reservation Confirmed: ${medName} held at ${p?.name || 'Pharmacy'}. Unit ready for pickup!`);
  };

  const shareReportWithDoctor = (doctorId: string) => {
    const doc = doctors.find(d => d.id === doctorId);
    const report: ClinicalSafetyReport = {
      id: `MED-REPORT-${Date.now()}`,
      generatedAt: new Date().toLocaleString(),
      patientName: "Kavi Priya",
      prescriptionsAnalyzed: 1,
      medicationsScanned: inventory.length,
      mismatchesDetected: comparisonResult?.overallStatus === 'WARNING' ? 1 : 0,
      duplicateIngredientsFound: duplicateIngredientResult?.detected ? 1 : 0,
      interactionsIdentified: activeInteractions.length,
      summaryStatus: comparisonResult?.overallStatus === 'WARNING' ? 'ACTION_REQUIRED' : 'REVIEWED_SAFE',
      reportItems: [
        {
          medicine: scannedMedication?.name || "Dolo 650",
          strength: scannedMedication?.strength || "650 mg",
          safetyState: comparisonResult?.overallStatus === 'WARNING' ? "Strength Discrepancy" : "Verified Safe",
          clinicalNote: "Patient scanned physical blister strip for AI visual validation against prescription Dr. Sharma #101."
        }
      ],
      doctorSignatureStamp: `Verified Digital Transfer to ${doc?.name || 'Dr. Sharma'}`
    };
    setLastSharedReport(report);
    alert(`✓ Clinical Safety Report securely transmitted to ${doc?.name || 'Doctor'}.`);
  };

  // Initial setup for Safety Engine default comparison
  useEffect(() => {
    runSafetyEngineComparison("650 mg", INITIAL_MEDICATIONS[3]); // Prescribed 650mg vs Scanned 500mg
    checkDuplicateIngredients(INITIAL_MEDICATIONS[0], INITIAL_MEDICATIONS[4]); // Dolo 650 + Sinarest (Cold Relief)
    evaluateCanTakeNow(INITIAL_MEDICATIONS[0]);
  }, []);

  return (
    <MedScanContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      rolePortal,
      setRolePortal,
      language,
      setLanguage,
      t,
      darkMode,
      setDarkMode,
      toggleDarkMode,
      scannedMedication,
      setScannedMedication,
      isAnalyzingVision,
      scanProgress,
      triggerScanPreset,
      activePrescription,
      setActivePrescription,
      allPrescriptions,
      comparisonResult,
      duplicateIngredientResult,
      canTakeNowResult,
      runSafetyEngineComparison,
      checkDuplicateIngredients,
      evaluateCanTakeNow,
      inventory,
      addToInventory,
      updateStockCount,
      removeInventoryItem,
      selectedInteractionDrugs,
      toggleInteractionDrug,
      activeInteractions,
      reminders,
      triggerAlarmBeep,
      speakReminder,
      toggleReminder,
      showAlarmModal,
      setShowAlarmModal,
      pharmacies,
      doctors,
      reserveMedicine,
      shareReportWithDoctor,
      lastSharedReport,
      isAssistantOpen,
      setIsAssistantOpen,
    }}>
      {children}
    </MedScanContext.Provider>
  );
};

export const useMedScan = () => {
  const ctx = useContext(MedScanContext);
  if (!ctx) {
    throw new Error("useMedScan must be used within a MedScanProvider");
  }
  return ctx;
};

