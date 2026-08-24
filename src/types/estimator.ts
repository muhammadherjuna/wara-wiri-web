// ─── Estimator Types ──────────────────────────────────────────────────────────

export interface DestinationOption {
  value: string;
  label: string;
  basePrice: number;
}

export interface DurationOption {
  value: string;
  label: string;
  multiplier: number;
}

export interface BusTypeOption {
  value: string;
  label: string;
  sublabel: string;
  multiplier: number;
}

export interface EstimatorFormValues {
  destination: string;
  duration: string;
  studentCount: number;
  teacherCount: number;
  busType: string;
  schoolName: string;
  contactName: string;
  whatsapp: string;
}

export interface EstimationResult {
  pricePerStudent: number;
  freeTeachers: number;
  payingTeachers: number;
  totalStudentsPrice: number;
  totalTeachersPrice: number;
  grandTotal: number;
}
