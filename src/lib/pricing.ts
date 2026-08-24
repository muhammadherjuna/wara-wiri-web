import type {
  DestinationOption,
  DurationOption,
  BusTypeOption,
  EstimatorFormValues,
  EstimationResult,
} from "@/types/estimator";
import { formatRupiah } from "@/data/packages";

// ─── Destinations ─────────────────────────────────────────────────────────────

export const DESTINATIONS: DestinationOption[] = [
  { value: "bali",    label: "Bali",        basePrice: 1_500_000 },
  { value: "jogja",   label: "Yogyakarta",  basePrice:   800_000 },
  { value: "bromo",   label: "Bromo",       basePrice:   900_000 },
  { value: "bandung", label: "Bandung",     basePrice:   700_000 },
  { value: "dieng",   label: "Dieng",       basePrice:   500_000 },
  { value: "jakarta", label: "Jakarta",     basePrice: 1_200_000 },
];

// ─── Duration Options ─────────────────────────────────────────────────────────

export const DURATIONS: DurationOption[] = [
  { value: "2D1N", label: "2 Hari 1 Malam", multiplier: 1.0 },
  { value: "3D2N", label: "3 Hari 2 Malam", multiplier: 1.4 },
  { value: "4D3N", label: "4 Hari 3 Malam", multiplier: 1.8 },
  { value: "5D4N", label: "5 Hari 4 Malam", multiplier: 2.2 },
];

// ─── Bus Type Options ─────────────────────────────────────────────────────────

export const BUS_TYPES: BusTypeOption[] = [
  { value: "standard",  label: "Big Bus Standard", sublabel: "×1.0 tarif", multiplier: 1.0 },
  { value: "executive", label: "Big Bus Executive", sublabel: "×1.3 tarif", multiplier: 1.3 },
  { value: "shd",       label: "Bus SHD",           sublabel: "×1.6 tarif", multiplier: 1.6 },
];

// ─── Admin WhatsApp ───────────────────────────────────────────────────────────

export const ADMIN_WA_NUMBER = "6281234567890";

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getDestination(value: string): DestinationOption {
  return (
    DESTINATIONS.find((d) => d.value === value) ?? DESTINATIONS[1]
  );
}

export function getDuration(value: string): DurationOption {
  return DURATIONS.find((d) => d.value === value) ?? DURATIONS[1];
}

export function getBusType(value: string): BusTypeOption {
  return BUS_TYPES.find((b) => b.value === value) ?? BUS_TYPES[0];
}

// ─── Calculation ─────────────────────────────────────────────────────────────

export function calculateEstimation(
  values: EstimatorFormValues
): EstimationResult {
  const dest = getDestination(values.destination);
  const dur  = getDuration(values.duration);
  const bus  = getBusType(values.busType);

  const studentCount = Math.max(0, values.studentCount ?? 0);
  const teacherCount = Math.max(0, values.teacherCount ?? 0);

  const pricePerStudent =
    dest.basePrice * dur.multiplier * bus.multiplier;

  const freeTeachers    = Math.floor(studentCount / 20);
  const payingTeachers  = Math.max(0, teacherCount - freeTeachers);

  const totalStudentsPrice = studentCount * pricePerStudent;
  const totalTeachersPrice = payingTeachers * pricePerStudent;
  const grandTotal         = totalStudentsPrice + totalTeachersPrice;

  return {
    pricePerStudent,
    freeTeachers,
    payingTeachers,
    totalStudentsPrice,
    totalTeachersPrice,
    grandTotal,
  };
}

// ─── WhatsApp message builder ─────────────────────────────────────────────────

export function buildWhatsAppMessage(
  values: EstimatorFormValues,
  result: EstimationResult
): string {
  const dest = getDestination(values.destination);
  const dur  = getDuration(values.duration);
  const bus  = getBusType(values.busType);

  const lines = [
    "Halo Wara Wiri, saya ingin menanyakan penawaran resmi study tour:",
    "",
    `*Nama Sekolah:* ${values.schoolName}`,
    `*Nama Perwakilan:* ${values.contactName}`,
    `*Nomor WhatsApp:* ${values.whatsapp}`,
    "",
    "*Detail Trip:*",
    `• Destinasi: ${dest.label}`,
    `• Durasi: ${dur.label}`,
    `• Jumlah Siswa: ${values.studentCount} orang`,
    `• Jumlah Guru: ${values.teacherCount} orang`,
    `• Guru Gratis: ${result.freeTeachers} orang`,
    `• Tipe Bus: ${bus.label}`,
    "",
    "*Estimasi Biaya:*",
    `• Harga per Siswa: ${formatRupiah(result.pricePerStudent)}`,
    `• Total Estimasi: ${formatRupiah(result.grandTotal)}`,
    "",
    "Mohon diinfokan paket dan harga resminya. Terima kasih!",
  ];

  return lines.join("\n");
}
