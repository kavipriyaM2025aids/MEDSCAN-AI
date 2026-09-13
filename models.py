from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    full_name = Column(String(200))
    role = Column(String(50), default="patient") # patient, doctor, pharmacist, admin
    created_at = Column(DateTime, default=datetime.utcnow)

    inventory_items = relationship("Inventory", back_populates="user")
    prescriptions = relationship("Prescription", back_populates="user")
    safety_checks = relationship("SafetyCheck", back_populates="user")

class Medication(Base):
    __tablename__ = "medications"

    id = Column(String(100), primary_key=True, index=True)
    name = Column(String(200), index=True)
    generic_name = Column(String(255), index=True)
    brand_name = Column(String(200))
    strength = Column(String(100))
    dosage_form = Column(String(100))
    active_ingredients = Column(Text) # JSON string or comma-separated
    manufacturer = Column(String(200))
    uses = Column(Text)
    precautions = Column(Text)
    common_side_effects = Column(Text)
    storage_info = Column(String(255))
    prescription_schedule = Column(String(100))
    category = Column(String(100))
    shape_form = Column(String(100))
    est_dimensions = Column(String(100))
    color_spectrum = Column(String(100))
    imprint_ocr = Column(String(100))
    surface_texture = Column(String(100))
    score_line = Column(String(100))
    packaging_format = Column(String(100))
    confidence = Column(Float, default=98.0)

class MedicineScan(Base):
    __tablename__ = "medicine_scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    image_url = Column(String(500), nullable=True)
    detected_medication_id = Column(String(100), ForeignKey("medications.id"), nullable=True)
    confidence_score = Column(Float, default=98.0)
    scanned_at = Column(DateTime, default=datetime.utcnow)
    extracted_features = Column(Text) # JSON of 8 morphological descriptors

class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    doctor_name = Column(String(200))
    specialty = Column(String(200))
    clinic = Column(String(255))
    patient_name = Column(String(200))
    prescription_date = Column(String(50))
    raw_ocr_text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="prescriptions")
    medicines = relationship("PrescriptionMedicine", back_populates="prescription")

class PrescriptionMedicine(Base):
    __tablename__ = "prescription_medicines"

    id = Column(Integer, primary_key=True, index=True)
    prescription_id = Column(String(100), ForeignKey("prescriptions.id"))
    medicine_name = Column(String(200))
    generic_name = Column(String(200))
    strength = Column(String(100))
    dosage_form = Column(String(100))
    frequency = Column(String(100))
    duration = Column(String(100))
    food_instruction = Column(String(100))
    instructions = Column(Text, nullable=True)

    prescription = relationship("Prescription", back_populates="medicines")

class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(200))
    strength = Column(String(100))
    dosage_form = Column(String(100))
    count_remaining = Column(Integer, default=10)
    total_pills = Column(Integer, default=15)
    min_threshold = Column(Integer, default=4)
    expiry_date = Column(String(50))
    batch_number = Column(String(100))
    last_scanned_date = Column(String(50))
    status = Column(String(50), default="IN_STOCK")
    active_salt = Column(String(200))

    user = relationship("User", back_populates="inventory_items")

class SafetyCheck(Base):
    __tablename__ = "safety_checks"

    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    prescription_id = Column(String(100), nullable=True)
    prescribed_name = Column(String(200))
    prescribed_strength = Column(String(100))
    scanned_name = Column(String(200))
    scanned_strength = Column(String(100))
    status = Column(String(50)) # MATCH, WARNING, CRITICAL_MISMATCH
    findings = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="safety_checks")

class Pharmacy(Base):
    __tablename__ = "pharmacies"

    id = Column(String(100), primary_key=True, index=True)
    name = Column(String(200))
    address = Column(String(255))
    distance_km = Column(Float)
    rating = Column(Float)
    verified_partner = Column(Boolean, default=True)
    phone = Column(String(50))
    open_now = Column(Boolean, default=True)

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(String(100), primary_key=True, index=True)
    name = Column(String(200))
    specialty = Column(String(200))
    qualification = Column(String(200))
    hospital = Column(String(255))
    experience_years = Column(Integer)
    rating = Column(Float)
    consultation_fee = Column(String(50))
    available_today = Column(Boolean, default=True)

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    medicine_name = Column(String(200))
    dose = Column(String(100))
    reminder_time = Column(String(50))
    meal_relation = Column(String(50))
    frequency = Column(String(100))
    active = Column(Boolean, default=True)

class MedicalReport(Base):
    __tablename__ = "medical_reports"

    id = Column(String(100), primary_key=True, index=True)
    patient_name = Column(String(200))
    generated_at = Column(String(100))
    doctor_id = Column(String(100), nullable=True)
    summary_status = Column(String(50))
    report_data = Column(Text) # JSON string of clinical audit

