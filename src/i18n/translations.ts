import { Language } from '../types/medscan';

export interface Translations {
  // Brand
  brandName: string;
  tagline: string;
  
  // Navigation
  navDashboard: string;
  navVisionScan: string;
  navLostRx: string;
  navRxScanner: string;
  navInventory: string;
  navInteractions: string;
  navPharmacies: string;
  navDoctors: string;
  navMoreModules: string;
  navSafetyEngine: string;
  navEmergency: string;
  navAlarms: string;
  navAssistant: string;

  // Role Portal
  rolePortalLabel: string;
  rolePatient: string;
  roleDoctor: string;
  rolePharmacy: string;
  roleAdmin: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroScanDolo: string;
  heroSetAlarms: string;
  badgeTesseract: string;
  badgeGemini: string;
  badgeHipaa: string;
  liveScanEngine: string;

  // Metrics
  metricOcrAccuracy: string;
  metricOcrAccuracySub: string;
  metricScansCount: string;
  metricScansCountSub: string;
  metricProcessingSpeed: string;
  metricProcessingSpeedSub: string;
  metricLanguagesCount: string;
  metricLanguagesCountSub: string;

  // Vision Scan Page
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  btnBrowseFiles: string;
  btnLiveCamera: string;
  btnPasteClipboard: string;
  presetsTitle: string;
  presetDolo: string;
  presetAmox: string;
  presetAugmentin: string;
  presetPantocid: string;

  // Identified Medicine Card
  genericActiveSalt: string;
  btnListenVoice: string;
  btnReservePharmacy: string;
  btnAddInventory: string;
  btnShareDoctor: string;
  aiRationaleTitle: string;
  aiRationaleText: string;

  // Computer Vision Feature Extraction
  cvExtractionTitle: string;
  cvExtractionSubtitle: string;
  aiVisionActive: string;
  visualMatchConfidence: string;
  featShape: string;
  featDimensions: string;
  featThickness: string;
  featColor: string;
  featImprint: string;
  featSurface: string;
  featScoreLine: string;
  featMfrLogo: string;
  featPackaging: string;

  // Safety Engine (Unique Feature)
  safetyEngineTitle: string;
  safetyEngineSubtitle: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  mismatchAlert: string;
  mismatchExplanation: string;
  paramMedicine: string;
  paramStrength: string;
  paramActiveIngredient: string;
  paramDosageForm: string;
  paramFrequency: string;
  paramStatus: string;
  statusMatch: string;
  statusMismatch: string;
  statusWarning: string;
  duplicateDetectorTitle: string;
  duplicateAlert: string;
  duplicateExplanation: string;
  canTakeNowBtn: string;
  canTakeNowTitle: string;
  generateReportBtn: string;
  verifyWithDoctorNotice: string;

  // Lost Rx Recovery
  lostRxTitle: string;
  lostRxSubtitle: string;
  lostRxReconstructBtn: string;
  lostRxHistory: string;

  // Rx Scanner
  rxScannerTitle: string;
  rxScannerSubtitle: string;
  rxExtractDataBtn: string;
  rxDoctorName: string;
  rxPatientName: string;
  rxDate: string;
  rxMedicationsList: string;

  // Smart Inventory
  inventoryTitle: string;
  inventorySubtitle: string;
  filterAll: string;
  filterInStock: string;
  filterLowStock: string;
  filterExpiring: string;
  filterExpired: string;
  btnRefillReminder: string;
  btnUpdateStock: string;
  btnAddMedicine: string;

  // Interactions
  interactionsTitle: string;
  interactionsSubtitle: string;
  btnAnalyzeInteractions: string;
  quickAddLabel: string;
  severityHigh: string;
  severityModerate: string;
  severityLow: string;

  // Pharmacies
  pharmaciesTitle: string;
  pharmaciesSubtitle: string;
  btnCallPharmacy: string;
  btnReserveNow: string;
  verifiedPartnerTag: string;
  distanceKmText: string;

  // Doctors
  doctorsTitle: string;
  doctorsSubtitle: string;
  btnBookConsultation: string;
  btnShareMedReport: string;

  // Emergency
  emergencyAlertTitle: string;
  emergencyPhonePoison: string;
  emergencyPhoneAmbulance: string;
  emergencyAllergiesTitle: string;
  emergencyActiveMedsTitle: string;
  emergencyFirstAidTitle: string;

  // Alarms
  alarmNotificationPill: string;
  alarmModalTitle: string;
  alarmModalSubtitle: string;
  alarmPlaySample: string;
  alarmSpokenMessage: string;

  // Footer & Disclaimer
  footerMission: string;
  footerFeaturesTitle: string;
  footerSecurityTitle: string;
  footerNoticeTitle: string;
  footerMedicalNotice: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: "MEDSCAN AI",
    tagline: "SMART MEDICATION PLATFORM",
    
    navDashboard: "Dashboard",
    navVisionScan: "AI Vision Scan",
    navLostRx: "Lost Rx Recovery",
    navRxScanner: "Rx Scanner",
    navInventory: "Smart Inventory",
    navInteractions: "Interactions",
    navPharmacies: "Pharmacies",
    navDoctors: "Doctors",
    navMoreModules: "More Modules",
    navSafetyEngine: "Rx-to-Pill Safety",
    navEmergency: "Emergency",
    navAlarms: "Dosage Alarms",
    navAssistant: "Clinical AI",

    rolePortalLabel: "ROLE PORTAL:",
    rolePatient: "Patient Hub",
    roleDoctor: "Doctor Portal",
    rolePharmacy: "Pharmacy Desk",
    roleAdmin: "Admin Console",

    heroBadge: "NEXT-GEN MEDICAL OCR & GEMINI AI PHARMACIST",
    heroTitle1: "Scan Any Medicine.",
    heroTitle2: "Understand It In Simple Plain Language.",
    heroSubtitle: "Instant OCR text extraction for medicine strips, bottles, and prescriptions. Powered by Gemini AI to explain dosages, side effects, safety warnings, and drug interactions in English, Tamil, and Hindi.",
    heroScanDolo: "Scan Medicine Now (Dolo 650)",
    heroSetAlarms: "Set Daily Alarms",
    badgeTesseract: "Client-Side Tesseract OCR",
    badgeGemini: "Gemini Clinical Intelligence",
    badgeHipaa: "100% HIPAA Private",
    liveScanEngine: "LIVE SCAN ENGINE",

    metricOcrAccuracy: "99.4%",
    metricOcrAccuracySub: "Preprocessed HTML5 Canvas Engine",
    metricScansCount: "50,000+",
    metricScansCountSub: "Trusted by Patients & Caregivers",
    metricProcessingSpeed: "< 2.5s",
    metricProcessingSpeedSub: "Powered by Gemini 1.5 Flash",
    metricLanguagesCount: "3",
    metricLanguagesCountSub: "English, Tamil, and Hindi",

    dropzoneTitle: "Drop Medicine Image or Scan Label",
    dropzoneSubtitle: "Supports Medicine Strips, Syrup Bottles, Prescription Sheets, and QR / Barcodes (UPC, EAN, GTIN).",
    btnBrowseFiles: "Browse Device Files",
    btnLiveCamera: "Live Camera & Barcode Scan",
    btnPasteClipboard: "Paste Image from Clipboard",
    presetsTitle: "INSTANT DEMO SCAN PRESETS (CLICK TO TEST):",
    presetDolo: "Dolo 650 Strip Scan",
    presetAmox: "Amoxicillin 500mg Scan",
    presetAugmentin: "Augmentin 625 Duo",
    presetPantocid: "Pantocid 40 Scan",

    genericActiveSalt: "Generic Active Salt:",
    btnListenVoice: "Listen in Voice",
    btnReservePharmacy: "Reserve at Nearby Pharmacy",
    btnAddInventory: "Add to Smart Inventory",
    btnShareDoctor: "Share Report with Doctor",
    aiRationaleTitle: "AI IDENTIFICATION RATIONALE & EXPLANATION",
    aiRationaleText: "This tablet is most likely Dolo 650 because it matches 98% of known visual characteristics including diameter, score line, white coating, and imprint OCR.",

    cvExtractionTitle: "Computer Vision Feature Extraction",
    cvExtractionSubtitle: "High-resolution geometric, morphological, and OCR extraction matrix",
    aiVisionActive: "AI Vision Active",
    visualMatchConfidence: "VISUAL MATCH CONFIDENCE",
    featShape: "SHAPE & FORM",
    featDimensions: "EST. DIMENSIONS",
    featThickness: "Thickness",
    featColor: "COLOR & SPECTRUM",
    featImprint: "IMPRINT OCR",
    featSurface: "SURFACE TEXTURE",
    featScoreLine: "SCORE LINE / NOTCH",
    featMfrLogo: "MFR. LOGO CHECK",
    featPackaging: "PACKAGING FORMAT",

    safetyEngineTitle: "Prescription-to-Pill Safety Engine",
    safetyEngineSubtitle: "Verify if the medicine you are about to take matches your doctor's exact prescription.",
    step1Title: "1. Prescription Ingestion",
    step2Title: "2. AI Rx OCR Analysis",
    step3Title: "3. Scanned Medicine Strip",
    step4Title: "4. Safety Comparison Engine",
    mismatchAlert: "PRESCRIPTION MISMATCH DETECTED",
    mismatchExplanation: "The scanned medicine strength does not match your doctor's prescription. Verify with your pharmacist or healthcare professional before taking it.",
    paramMedicine: "Medicine",
    paramStrength: "Strength",
    paramActiveIngredient: "Active Ingredient",
    paramDosageForm: "Dosage Form",
    paramFrequency: "Frequency",
    paramStatus: "Status",
    statusMatch: "Match",
    statusMismatch: "Mismatch",
    statusWarning: "Verification Needed",
    duplicateDetectorTitle: "DUPLICATE ACTIVE INGREDIENT DETECTOR",
    duplicateAlert: "DUPLICATE ACTIVE INGREDIENT DETECTED",
    duplicateExplanation: "Both selected medicines contain Paracetamol (Acetaminophen). Combining these risks exceeding the maximum safe limit of 4000mg/day.",
    canTakeNowBtn: "Can I Take This Now?",
    canTakeNowTitle: "Real-Time Dosage Clearance Check",
    generateReportBtn: "Generate Medication Safety Report",
    verifyWithDoctorNotice: "Never alter dosages without consulting your prescribing doctor or pharmacist.",

    lostRxTitle: "Lost Rx Recovery",
    lostRxSubtitle: "Reconstruct your historical medication regimen from past scans and records.",
    lostRxReconstructBtn: "Reconstruct Prescription Details",
    lostRxHistory: "Historical Scan Timeline",

    rxScannerTitle: "Prescription OCR Scanner",
    rxScannerSubtitle: "Instant digital extraction of handwritten and printed prescriptions.",
    rxExtractDataBtn: "Scan Prescription Sheet",
    rxDoctorName: "Prescribing Doctor",
    rxPatientName: "Patient Name",
    rxDate: "Prescription Date",
    rxMedicationsList: "Extracted Medications",

    inventoryTitle: "Smart Medicine Inventory",
    inventorySubtitle: "Track medicine stock, refill reminders, and expiration dates in real-time.",
    filterAll: "All Medicines",
    filterInStock: "In Stock",
    filterLowStock: "Low Stock",
    filterExpiring: "Expiring Soon",
    filterExpired: "Expired",
    btnRefillReminder: "Refill Reminder",
    btnUpdateStock: "Update Stock",
    btnAddMedicine: "Scan & Add Medicine",

    interactionsTitle: "Drug-Drug Interaction Checker",
    interactionsSubtitle: "Analyze multi-drug combinations to detect harmful clinical interactions.",
    btnAnalyzeInteractions: "Analyze Drug Interactions",
    quickAddLabel: "Quick add common medications:",
    severityHigh: "High Risk",
    severityModerate: "Moderate Caution",
    severityLow: "Low / Monitor",

    pharmaciesTitle: "Nearby Pharmacies & Availability",
    pharmaciesSubtitle: "Find pharmacies stocking your prescribed medicines with live inventory verification.",
    btnCallPharmacy: "Call Pharmacy",
    btnReserveNow: "Reserve Medicine Now",
    verifiedPartnerTag: "Verified Partner",
    distanceKmText: "away",

    doctorsTitle: "Verified Doctors & Clinical Consultations",
    doctorsSubtitle: "Share your medication safety report with licensed doctors for digital review.",
    btnBookConsultation: "Book Consultation",
    btnShareMedReport: "Share Medication Report",

    emergencyAlertTitle: "Emergency Clinical Response & Toxicity",
    emergencyPhonePoison: "Poison Control Center: 1800-222-1222",
    emergencyPhoneAmbulance: "National Emergency Ambulance: 108 / 911",
    emergencyAllergiesTitle: "Known Patient Allergies",
    emergencyActiveMedsTitle: "Current Active Medication Regimen",
    emergencyFirstAidTitle: "Toxicity & First-Aid Protocol",

    alarmNotificationPill: "Alarm Beep Alert: CITIZEN",
    alarmModalTitle: "Smart Audio Dosage Alarms",
    alarmModalSubtitle: "Synthesized audio reminders and spoken dosage schedules.",
    alarmPlaySample: "Test Audio Chime",
    alarmSpokenMessage: "Time to check your scheduled medication: Dolo 650, 1 tablet after food.",

    footerMission: "Enterprise clinical intelligence platform powering instant OCR medicine recognition, AI explanation, drug interaction verification, and prescription scanning.",
    footerFeaturesTitle: "FEATURES",
    footerSecurityTitle: "SECURITY & PLATFORM",
    footerNoticeTitle: "MEDICAL NOTICE",
    footerMedicalNotice: "This application provides educational information only. It is NOT medical advice. Always consult a qualified healthcare professional before taking or changing medications.",
  },

  ta: {
    brandName: "மெட்ஸ்கேன் AI",
    tagline: "ஸ்மார்ட் மருந்து மேலாண்மை தளம்",
    
    navDashboard: "முகப்பு",
    navVisionScan: "AI பார்வை ஸ்கேன்",
    navLostRx: "இழந்த மருந்துச்சீட்டு மீட்பு",
    navRxScanner: "மருந்துச்சீட்டு ஸ்கேனர்",
    navInventory: "ஸ்மார்ட் சரக்கு",
    navInteractions: "மருந்து எதிர்வினைகள்",
    navPharmacies: "மருந்தகங்கள்",
    navDoctors: "மருத்துவர்கள்",
    navMoreModules: "கூடுதல் சேவைகள்",
    navSafetyEngine: "Rx-மாத்திரை பாதுகாப்பு",
    navEmergency: "அவசரம்",
    navAlarms: "அளவீட்டு நினைவூட்டல்",
    navAssistant: "மருத்துவ AI",

    rolePortalLabel: "பயனர் தளம்:",
    rolePatient: "நோயாளி தளம்",
    roleDoctor: "மருத்துவர் தளம்",
    rolePharmacy: "மருந்தக தளம்",
    roleAdmin: "நிர்வாக தளம்",

    heroBadge: "அடுத்த தலைமுறை மருத்துவ OCR & ஜெமினி AI மருந்தாளுனர்",
    heroTitle1: "எந்த மருந்தையும் ஸ்கேன் செய்யுங்கள்.",
    heroTitle2: "எளிய தமிழில் உடனே புரிந்து கொள்ளுங்கள்.",
    heroSubtitle: "மருந்து அட்டைகள், பாட்டில்கள் மற்றும் மருந்துச்சீட்டுகளிலிருந்து உடனடி உரை அறிதல். அளவு, பக்க விளைவுகள் மற்றும் எச்சரிக்கைகளை எளிதாக விளக்குகிறது.",
    heroScanDolo: "இப்போது ஸ்கேன் செய் (டோலோ 650)",
    heroSetAlarms: "தினசரி அலாரம் அமை",
    badgeTesseract: "சாதன நேரடி Tesseract OCR",
    badgeGemini: "ஜெமினி மருத்துவ நுண்ணறிவு",
    badgeHipaa: "100% பாதுகாப்பானது & தனிப்பட்டது",
    liveScanEngine: "நேரலை ஸ்கேன் இன்ஜின்",

    metricOcrAccuracy: "99.4%",
    metricOcrAccuracySub: "HTML5 கேன்வாஸ் உரை துல்லியம்",
    metricScansCount: "50,000+",
    metricScansCountSub: "பயனாளர்களால் நம்பப்படுகிறது",
    metricProcessingSpeed: "< 2.5 வினாடி",
    metricProcessingSpeedSub: "ஜெமினி 1.5 ஃபிளாஷ் வேகத்தில்",
    metricLanguagesCount: "3",
    metricLanguagesCountSub: "ஆங்கிலம், தமிழ், இந்தி",

    dropzoneTitle: "மருந்து படத்தை பதிவேற்றவும் அல்லது ஸ்கேன் செய்யவும்",
    dropzoneSubtitle: "மருந்து அட்டைகள், சிரப் பாட்டில்கள், மருந்துச்சீட்டுகள் மற்றும் பார்கோடுகளை ஆதரிக்கிறது.",
    btnBrowseFiles: "கோப்புகளைத் தேர்ந்தெடுக்கவும்",
    btnLiveCamera: "நேரலை கேமரா & பார்கோடு ஸ்கேன்",
    btnPasteClipboard: "கிளிப்போர்டிலிருந்து ஒட்டவும்",
    presetsTitle: "உடனடி மாதிரி ஸ்கேன்கள் (சோதிக்க கிளிக் செய்யவும்):",
    presetDolo: "டோலோ 650 அட்டை ஸ்கேன்",
    presetAmox: "அமாக்சிசிலின் 500mg ஸ்கேன்",
    presetAugmentin: "ஆக்மென்டின் 625 டியோ",
    presetPantocid: "பான்டோசிட் 40 ஸ்கேன்",

    genericActiveSalt: "பொதுவான மூலப்பொருள்:",
    btnListenVoice: "குரல் வடிவில் கேளுங்கள்",
    btnReservePharmacy: "அருகிலுள்ள மருந்தகத்தில் முன்பதிவு செய்",
    btnAddInventory: "மருந்து இருப்பில் சேர்",
    btnShareDoctor: "மருத்துவரிடம் பகிரவும்",
    aiRationaleTitle: "AI அடையாள அறிதல் காரணம் & விளக்கம்",
    aiRationaleText: "விட்டம், பள்ளக் கோடு, வெள்ளை பூச்சு மற்றும் OCR அச்சு ஆகியவற்றின் 98% பொருத்தத்தின் அடிப்படையில் இந்த மாத்திரை டோலோ 650 ஆகும்.",

    cvExtractionTitle: "கணினி பார்வை அம்ச பிரித்தெடுத்தல்",
    cvExtractionSubtitle: "உயர் தெளிவுத்திறன் வடிவியல், உருவவியல் மற்றும் OCR பிரித்தெடுத்தல் அணி",
    aiVisionActive: "AI பார்வை செயலில் உள்ளது",
    visualMatchConfidence: "பார்வை பொருத்த நம்பிக்கை",
    featShape: "வடிவம் & அமைப்பு",
    featDimensions: "மதிப்பிடப்பட்ட அளவு",
    featThickness: "தடிமன்",
    featColor: "நிறம் & நிறமாலை",
    featImprint: "அச்சு உரை OCR",
    featSurface: "மேற்பரப்பு அமைப்பு",
    featScoreLine: "பிரிப்பு கோடு",
    featMfrLogo: "உற்பத்தியாளர் லோகோ",
    featPackaging: "பேக்கேஜிங் வடிவம்",

    safetyEngineTitle: "மருந்துச்சீட்டு-மாத்திரை பாதுகாப்பு இன்ஜின்",
    safetyEngineSubtitle: "நீங்கள் உட்கொள்ளும் மருந்து மருத்துவர் பரிந்துரைத்த அதே மருந்துதானா என்பதை உடனடியாக சரிபார்க்கவும்.",
    step1Title: "1. மருந்துச்சீட்டு பதிவேற்றம்",
    step2Title: "2. AI OCR பகுப்பாய்வு",
    step3Title: "3. வாங்கிய மருந்து அட்டை ஸ்கேன்",
    step4Title: "4. பாதுகாப்பு ஒப்பீட்டு இன்ஜின்",
    mismatchAlert: "மருந்துச்சீட்டு முரண்பாடு கண்டறியப்பட்டது",
    mismatchExplanation: "ஸ்கேன் செய்யப்பட்ட மருந்தின் வீரியம் மருத்துவர் பரிந்துரைத்ததோடு பொருந்தவில்லை. எடுத்துக்கொள்வதற்கு முன் உங்கள் மருந்தாளுநரிடம் சரிபார்க்கவும்.",
    paramMedicine: "மருந்து",
    paramStrength: "வீரியம்",
    paramActiveIngredient: "செயலில் உள்ள மூலப்பொருள்",
    paramDosageForm: "மருந்து வடிவம்",
    paramFrequency: "அதிர்வெண்",
    paramStatus: "நிலை",
    statusMatch: "பொருந்துகிறது",
    statusMismatch: "முரண்பாடு",
    statusWarning: "சரிபார்ப்பு தேவை",
    duplicateDetectorTitle: "இரட்டை செயலில் உள்ள மூலப்பொருள் கண்டறிதல்",
    duplicateAlert: "இரட்டை மூலப்பொருள் கண்டறியப்பட்டது",
    duplicateExplanation: "தேர்ந்தெடுக்கப்பட்ட இரண்டு மருந்துகளிலும் பாராசிட்டமால் உள்ளது. இவற்றை ஒன்றாக உட்கொள்வது 4000mg/நாள் வரம்பை மீறும் அபாயத்தை ஏற்படுத்தும்.",
    canTakeNowBtn: "இதை இப்போது எடுத்துக்கொள்ளலாமா?",
    canTakeNowTitle: "உடனடி நேர மருந்தெடுப்பு சரிபார்ப்பு",
    generateReportBtn: "மருந்து பாதுகாப்பு அறிக்கையை உருவாக்கு",
    verifyWithDoctorNotice: "உங்கள் மருத்துவரை ஆலோசிக்காமல் மருந்தின் அளவை மாற்றாதீர்கள்.",

    lostRxTitle: "இழந்த மருந்துச்சீட்டு மீட்பு",
    lostRxSubtitle: "கடந்தகால ஸ்கேன்கள் மற்றும் பதிவுகளிலிருந்து உங்கள் மருத்துவ அட்டவணையை மீட்டெடுக்கவும்.",
    lostRxReconstructBtn: "விவரங்களை மீட்டெடு",
    lostRxHistory: "முந்தைய ஸ்கேன் வரலாறு",

    rxScannerTitle: "மருந்துச்சீட்டு OCR ஸ்கேனர்",
    rxScannerSubtitle: "கையெழுத்து மற்றும் அச்சிடப்பட்ட மருந்துச்சீட்டுகளிலிருந்து உடனடி டிஜிட்டல் மாற்றம்.",
    rxExtractDataBtn: "மருந்துச்சீட்டை ஸ்கேன் செய்",
    rxDoctorName: "மருத்துவர் பெயர்",
    rxPatientName: "நோயாளி பெயர்",
    rxDate: "தேதி",
    rxMedicationsList: "பிரித்தெடுக்கப்பட்ட மருந்துகள்",

    inventoryTitle: "ஸ்மார்ட் மருந்து சரக்கு",
    inventorySubtitle: "மருந்து இருப்பு, மறு நிரப்பல் நினைவூட்டல்கள் மற்றும் காலாவதி தேதிகளைக் கண்காணிக்கவும்.",
    filterAll: "அனைத்து மருந்துகள்",
    filterInStock: "இருப்பில் உள்ளது",
    filterLowStock: "குறைந்த இருப்பு",
    filterExpiring: "விரைவில் காலாவதி",
    filterExpired: "காலாவதியானது",
    btnRefillReminder: "மறு நிரப்பல் நினைவூட்டல்",
    btnUpdateStock: "இருப்பை புதுப்பி",
    btnAddMedicine: "ஸ்கேன் செய்து சேர்க்கவும்",

    interactionsTitle: "மருந்து எதிர்வினை சரிபார்ப்பு",
    interactionsSubtitle: "தீங்கு விளைவிக்கும் எதிர்வினைகளைக் கண்டறிய பல மருந்து சேர்க்கைகளை பகுப்பாய்வு செய்யவும்.",
    btnAnalyzeInteractions: "எதிர்வினைகளை பகுப்பாய்வு செய்",
    quickAddLabel: "பொதுவான மருந்துகளை விரைவாகச் சேர்க்கவும்:",
    severityHigh: "அதிக ஆபத்து",
    severityModerate: "மிதமான எச்சரிக்கை",
    severityLow: "குறைந்த ஆபத்து",

    pharmaciesTitle: "அருகிலுள்ள மருந்தகங்கள் & இருப்பு",
    pharmaciesSubtitle: "நேரலை இருப்பு சரிபார்ப்புடன் உங்கள் மருந்துகளைக் கொண்டுள்ள மருந்தகங்களைக் கண்டறியவும்.",
    btnCallPharmacy: "மருந்தகத்தை அழைக்கவும்",
    btnReserveNow: "இப்போதே முன்பதிவு செய்",
    verifiedPartnerTag: "சரிபார்க்கப்பட்ட பங்குதாரர்",
    distanceKmText: "தொலைவில்",

    doctorsTitle: "சரிபார்க்கப்பட்ட மருத்துவர்கள் & ஆலோசனைகள்",
    doctorsSubtitle: "உங்கள் மருந்து அறிக்கையை சரிபார்க்க மருத்துவர்களுடன் பாதுகாப்பாகப் பகிருங்கள்.",
    btnBookConsultation: "முன்பதிவு செய்ய",
    btnShareMedReport: "அறிக்கையைப் பகிரவும்",

    emergencyAlertTitle: "அவசர மருத்துவ உதவி & நச்சுக்கட்டுப்பாடு",
    emergencyPhonePoison: "நச்சுக்கட்டுப்பாட்டு மையம்: 1800-222-1222",
    emergencyPhoneAmbulance: "அவசர ஆம்புலன்ஸ்: 108 / 911",
    emergencyAllergiesTitle: "அறியப்பட்ட ஒவ்வாமைகள்",
    emergencyActiveMedsTitle: "தற்போது உட்கொள்ளும் மருந்துகள்",
    emergencyFirstAidTitle: "முதலுதவி நெறிமுறைகள்",

    alarmNotificationPill: "அலாரம் ஒலி எச்சரிக்கை: CITIZEN",
    alarmModalTitle: "ஸ்மார்ட் ஆடியோ மருந்து அலாரங்கள்",
    alarmModalSubtitle: "ஒலி நினைவூட்டல்கள் மற்றும் குரல் வழி மருந்து அட்டவணைகள்.",
    alarmPlaySample: "ஒலியை சோதிக்கவும்",
    alarmSpokenMessage: "உங்கள் மருந்தை உட்கொள்ள வேண்டிய நேரம்: டோலோ 650, உணவுக்குப் பின் 1 மாத்திரை.",

    footerMission: "நவீன OCR மருந்து அறிதல், AI விளக்கம், மருந்து எதிர்வினை சரிபார்ப்பு மற்றும் மருந்துச்சீட்டு ஸ்கேனிங் தளம்.",
    footerFeaturesTitle: "சேவைகள்",
    footerSecurityTitle: "பாதுகாப்பு & தளம்",
    footerNoticeTitle: "மருத்துவ அறிவிப்பு",
    footerMedicalNotice: "இந்த தளம் கல்வி சார்ந்த தகவல்களை மட்டுமே வழங்குகிறது. இது மருத்துவ ஆலோசனை அல்ல. மருந்துகளை எடுப்பதற்கு முன் மருத்துவரை அணுகவும்.",
  },

  hi: {
    brandName: "MEDSCAN AI",
    tagline: "स्मार्ट मेडिकेशन प्लेटफॉर्म",
    
    navDashboard: "डैशबोर्ड",
    navVisionScan: "AI विज़न स्कैन",
    navLostRx: "खोया पर्चा रिकवरी",
    navRxScanner: "पर्चा स्कैनर",
    navInventory: "स्मार्ट इन्वेंट्री",
    navInteractions: "दवा परस्पर क्रिया",
    navPharmacies: "फार्मेसी",
    navDoctors: "डॉक्टर",
    navMoreModules: "अधिक मॉड्यूल",
    navSafetyEngine: "पर्चा-गोली सुरक्षा",
    navEmergency: "आपातकालीन",
    navAlarms: "खुराक अलार्म",
    navAssistant: "क्लिनिकल AI",

    rolePortalLabel: "भूमिका पोर्टल:",
    rolePatient: "मरीज़ हब",
    roleDoctor: "डॉक्टर पोर्टल",
    rolePharmacy: "फार्मेसी डेस्क",
    roleAdmin: "व्यवस्थापक कंसोल",

    heroBadge: "नेक्स्ट-जेन मेडिकल OCR और जेमिनी AI फार्मासिस्ट",
    heroTitle1: "किसी भी दवा को स्कैन करें।",
    heroTitle2: "सरल और स्पष्ट भाषा में समझें।",
    heroSubtitle: "दवा की स्ट्रिप्स, बोतलों और पर्चे से तुरंत OCR टेक्स्ट निष्कर्षण। खुराक, साइड इफेक्ट्स और सावधानियों को समझने के लिए जेमिनी AI द्वारा संचालित।",
    heroScanDolo: "अभी दवा स्कैन करें (Dolo 650)",
    heroSetAlarms: "दैनिक अलार्म सेट करें",
    badgeTesseract: "क्लाइंट-साइड टेसरेक्ट OCR",
    badgeGemini: "जेमिनी क्लिनिकल इंटेलिजेंस",
    badgeHipaa: "100% HIPAA सुरक्षित एवं निजी",
    liveScanEngine: "लाइव स्कैन इंजन",

    metricOcrAccuracy: "99.4%",
    metricOcrAccuracySub: "प्रीप्रोसेस्ड HTML5 कैनवस इंजन",
    metricScansCount: "50,000+",
    metricScansCountSub: "मरीज़ों और देखभाल करने वालों द्वारा विश्वसनीय",
    metricProcessingSpeed: "< 2.5s",
    metricProcessingSpeedSub: "जेमिनी 1.5 फ़्लैश द्वारा संचालित",
    metricLanguagesCount: "3",
    metricLanguagesCountSub: "अंग्रेज़ी, तमिल और हिंदी",

    dropzoneTitle: "दवा की तस्वीर छोड़ें या लेबल स्कैन करें",
    dropzoneSubtitle: "दवा स्ट्रिप्स, सिरप की बोतलें, पर्चे और बारकोड (UPC, EAN) का समर्थन करता है।",
    btnBrowseFiles: "डिवाइस फ़ाइलें चुनें",
    btnLiveCamera: "लाइव कैमरा और बारकोड स्कैन",
    btnPasteClipboard: "क्लिपबोर्ड से छवि चिपकाएं",
    presetsTitle: "त्वरित डेमो स्कैन प्रीसेट (परीक्षण के लिए क्लिक करें):",
    presetDolo: "डोलो 650 स्ट्रिप स्कैन",
    presetAmox: "एमोक्सिसिलिन 500mg स्कैन",
    presetAugmentin: "ऑगमेंटिन 625 डुओ",
    presetPantocid: "पैंटोसिड 40 स्कैन",

    genericActiveSalt: "जेनेरिक सक्रिय सॉल्ट:",
    btnListenVoice: "आवाज़ में सुनें",
    btnReservePharmacy: "नज़दीकी फार्मेसी में आरक्षित करें",
    btnAddInventory: "स्मार्ट इन्वेंट्री में जोड़ें",
    btnShareDoctor: "डॉक्टर के साथ साझा करें",
    aiRationaleTitle: "AI पहचान तर्क और स्पष्टीकरण",
    aiRationaleText: "यह टैबलेट सबसे अधिक संभावना Dolo 650 है क्योंकि यह व्यास, स्कोर लाइन, सफेद कोटिंग और OCR से 98% मेल खाता है।",

    cvExtractionTitle: "कंप्यूटर विज़न फीचर निष्कर्षण",
    cvExtractionSubtitle: "उच्च-रिज़ॉल्यूशन ज्यामितीय और OCR निष्कर्षण मैट्रिक्स",
    aiVisionActive: "AI विज़न सक्रिय है",
    visualMatchConfidence: "दृश्य मिलान विश्वास",
    featShape: "आकार एवं रूप",
    featDimensions: "अनुमानित आयाम",
    featThickness: "मोटाई",
    featColor: "रंग और स्पेक्ट्रम",
    featImprint: "इम्प्रिंट OCR",
    featSurface: "सतह की बनावट",
    featScoreLine: "स्कोर लाइन / कट",
    featMfrLogo: "निर्माता लोगो जांच",
    featPackaging: "पैकेजिंग प्रारूप",

    safetyEngineTitle: "पर्चा-से-गोली सुरक्षा इंजन",
    safetyEngineSubtitle: "सत्यापित करें कि जो दवा आप लेने जा रहे हैं वह डॉक्टर द्वारा लिखी गई दवा से पूरी तरह मेल खाती है।",
    step1Title: "1. पर्चा अपलोड",
    step2Title: "2. AI OCR विश्लेषण",
    step3Title: "3. खरीदी गई दवा स्कैन",
    step4Title: "4. सुरक्षा मिलान इंजन",
    mismatchAlert: "पर्चे में विसंगति पाई गई",
    mismatchExplanation: "स्कैन की गई दवा की क्षमता (स्ट्रेंथ) डॉक्टर के पर्चे से मेल नहीं खाती है। इसे लेने से पहले अपने फार्मासिस्ट या डॉक्टर से पुष्टि करें।",
    paramMedicine: "दवा",
    paramStrength: "स्ट्रेंथ",
    paramActiveIngredient: "सक्रिय घटक",
    paramDosageForm: "खुराक रूप",
    paramFrequency: "आवृत्ति",
    paramStatus: "स्थिति",
    statusMatch: "सटीक मिलान",
    statusMismatch: "विसंगति",
    statusWarning: "सत्यापन आवश्यक",
    duplicateDetectorTitle: "डुप्लिकेट सक्रिय घटक डिटेक्टर",
    duplicateAlert: "डुप्लिकेट सक्रिय घटक पाया गया",
    duplicateExplanation: "दोनों चुनी गई दवाओं में पेरासिटामोल मौजूद है। इन्हें एक साथ लेने से 4000mg/दिन की सुरक्षित सीमा पार होने का जोखिम है।",
    canTakeNowBtn: "क्या मैं इसे अभी ले सकता हूँ?",
    canTakeNowTitle: "रीयल-टाइम खुराक सुरक्षा जांच",
    generateReportBtn: "दवा सुरक्षा रिपोर्ट बनाएं",
    verifyWithDoctorNotice: "डॉक्टर से परामर्श किए बिना कभी भी दवा की खुराक न बदलें।",

    lostRxTitle: "खोया पर्चा रिकवरी",
    lostRxSubtitle: "पिछले स्कैन और रिकॉर्ड से अपनी दवा योजना को दोबारा बनाएं।",
    lostRxReconstructBtn: "पर्चे का विवरण पुनर्प्राप्त करें",
    lostRxHistory: "स्कैन इतिहास टाइमलाइन",

    rxScannerTitle: "पर्चा OCR स्कैनर",
    rxScannerSubtitle: "हस्तलिखित और मुद्रित पर्चे से त्वरित डिजिटल डेटा निष्कर्षण।",
    rxExtractDataBtn: "पर्चा शीट स्कैन करें",
    rxDoctorName: "डॉक्टर का नाम",
    rxPatientName: "मरीज़ का नाम",
    rxDate: "पर्चे की तारीख",
    rxMedicationsList: "निकाली गई दवाएं",

    inventoryTitle: "स्मार्ट दवा इन्वेंट्री",
    inventorySubtitle: "दवा का स्टॉक, रीफिल रिमाइंडर और समाप्ति तिथियां ट्रैक करें।",
    filterAll: "सभी दवाएं",
    filterInStock: "स्टॉक में",
    filterLowStock: "कम स्टॉक",
    filterExpiring: "जल्द समाप्त",
    filterExpired: "समाप्त",
    btnRefillReminder: "रीफिल रिमाइंडर",
    btnUpdateStock: "स्टॉक अपडेट करें",
    btnAddMedicine: "स्कैन कर जोड़ें",

    interactionsTitle: "दवा परस्पर क्रिया परीक्षक",
    interactionsSubtitle: "हानिकारक प्रभावों का पता लगाने के लिए कई दवाओं के संयोजन का विश्लेषण करें।",
    btnAnalyzeInteractions: "परस्पर क्रिया का विश्लेषण करें",
    quickAddLabel: "सामान्य दवाएं तुरंत जोड़ें:",
    severityHigh: "उच्च जोखिम",
    severityModerate: "मध्यम सावधानी",
    severityLow: "कम जोखिम",

    pharmaciesTitle: "नज़दीकी फार्मेसी और उपलब्धता",
    pharmaciesSubtitle: "लाइव स्टॉक सत्यापन के साथ अपनी दवाएं उपलब्ध कराने वाली फार्मेसी खोजें।",
    btnCallPharmacy: "फार्मेसी को कॉल करें",
    btnReserveNow: "दवा आरक्षित करें",
    verifiedPartnerTag: "सत्यापित भागीदार",
    distanceKmText: "की दूरी पर",

    doctorsTitle: "सत्यापित डॉक्टर और परामर्श",
    doctorsSubtitle: "समीक्षा के लिए अपनी दवा सुरक्षा रिपोर्ट डॉक्टरों के साथ साझा करें।",
    btnBookConsultation: "परामर्श बुक करें",
    btnShareMedReport: "रिपोर्ट साझा करें",

    emergencyAlertTitle: "आपातकालीन प्रतिक्रिया और विषाक्तता",
    emergencyPhonePoison: "जहर नियंत्रण केंद्र: 1800-222-1222",
    emergencyPhoneAmbulance: "आपातकालीन एम्बुलेंस: 108 / 911",
    emergencyAllergiesTitle: "ज्ञात एलर्जी",
    emergencyActiveMedsTitle: "वर्तमान में ली जा रही दवाएं",
    emergencyFirstAidTitle: "प्राथमिक उपचार प्रोटोकॉल",

    alarmNotificationPill: "अलार्म बीप अलर्ट: CITIZEN",
    alarmModalTitle: "स्मार्ट ऑडियो खुराक अलार्म",
    alarmModalSubtitle: "सिंथेसाइज्ड ऑडियो रिमाइंडर और बोली जाने वाली खुराक अनुसूची।",
    alarmPlaySample: "ऑडियो टेस्ट करें",
    alarmSpokenMessage: "आपकी निर्धारित दवा लेने का समय: डोलो 650, भोजन के बाद 1 गोली।",

    footerMission: "उन्नत OCR दवा पहचान, AI व्याख्या, परस्पर क्रिया जांच और पर्चा स्कैनिंग प्लेटफॉर्म।",
    footerFeaturesTitle: "विशेषताएं",
    footerSecurityTitle: "सुरक्षा एवं प्लेटफ़ॉर्म",
    footerNoticeTitle: "चिकित्सा सूचना",
    footerMedicalNotice: "यह एप्लिकेशन केवल शैक्षिक जानकारी प्रदान करता है। यह चिकित्सीय सलाह नहीं है। दवाएं लेने या बदलने से पहले हमेशा डॉक्टर से परामर्श लें।",
  }
};

