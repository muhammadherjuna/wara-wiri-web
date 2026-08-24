"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  CalendarDays,
  Bus,
  Users,
  Phone,
  School,
  User,
  Calculator,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/data/packages";

// ─── Constants & Pricing ─────────────────────────────────────────────────────

const ADMIN_WA = "6281234567890";

const BASE_PRICES: Record<string, number> = {
  Bali: 1_500_000,
  Jogja: 800_000,
  Bromo: 900_000,
  Bandung: 700_000,
  Dieng: 500_000,
  Jakarta: 1_200_000,
};

const DURATION_MULT: Record<string, number> = {
  "2D1N": 1.0,
  "3D2N": 1.4,
  "4D3N": 1.8,
  "5D4N": 2.2,
};

const BUS_MULT: Record<string, number> = {
  Standard: 1.0,
  Executive: 1.3,
  SHD: 1.6,
};

const BUS_LABELS: Record<string, string> = {
  Standard: "Standard Big Bus",
  Executive: "Executive",
  SHD: "SHD (Suit Hidrolik Double)",
};

// ─── Calculation ─────────────────────────────────────────────────────────────

interface EstimateInput {
  destination: string;
  duration: string;
  studentCount: number;
  busType: string;
  teacherCount: number;
}

interface EstimateResult {
  pricePerStudent: number;
  totalStudentsPrice: number;
  freeTeachersQuota: number;
  actualFreeTeachers: number;
  payingTeachers: number;
  totalTeachersPrice: number;
  grandTotal: number;
}

function calculateEstimate(data: EstimateInput): EstimateResult {
  const basePrice = BASE_PRICES[data.destination] ?? 0;
  const durationMult = DURATION_MULT[data.duration] ?? 1;
  const busMult = BUS_MULT[data.busType] ?? 1;

  const pricePerStudent = basePrice * durationMult * busMult;
  const totalStudentsPrice = data.studentCount * pricePerStudent;

  const freeTeachersQuota = Math.floor(data.studentCount / 20);
  const actualFreeTeachers = Math.min(data.teacherCount, freeTeachersQuota);
  const payingTeachers = Math.max(0, data.teacherCount - freeTeachersQuota);
  const totalTeachersPrice = payingTeachers * pricePerStudent;

  const grandTotal = totalStudentsPrice + totalTeachersPrice;

  return {
    pricePerStudent,
    totalStudentsPrice,
    freeTeachersQuota,
    actualFreeTeachers,
    payingTeachers,
    totalTeachersPrice,
    grandTotal,
  };
}

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const step1Schema = z.object({
  destination: z.string().min(1, "Pilih destinasi terlebih dahulu"),
  duration: z.string().min(1, "Pilih durasi perjalanan"),
});

const step2Schema = z.object({
  studentCount: z
    .number({ message: "Harus berupa angka" })
    .min(20, "Minimum 20 siswa")
    .max(500, "Maksimum 500 siswa"),
  busType: z.string().min(1, "Pilih tipe bus"),
  teacherCount: z
    .number({ message: "Harus berupa angka" })
    .min(1, "Minimum 1 guru")
    .max(50, "Maksimum 50 guru"),
});

const step3Schema = z.object({
  schoolName: z.string().min(3, "Nama sekolah terlalu pendek"),
  contactName: z.string().min(2, "Nama kontak terlalu pendek"),
  whatsapp: z
    .string()
    .regex(
      /^(08|628)\d{8,11}$/,
      "Nomor WA tidak valid (contoh: 08123456789 atau 6281234567890)"
    ),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof fullSchema>;

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(value);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (v) => formatRupiah(Math.round(v)));
  const [text, setText] = React.useState(formatRupiah(value));

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return unsub;
  }, [display]);

  return <span>{text}</span>;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const STEPS = ["Destinasi", "Peserta & Armada", "Kontak"];

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-700 z-0" />
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary-500 z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: currentStep / (STEPS.length - 1) }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ width: "100%" }}
        />

        {STEPS.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: done || active ? "#0066CC" : "#E5E7EB",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-md font-bold text-sm",
                  done || active
                    ? "text-white bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-900/40"
                    : "text-gray-400 bg-gray-200 dark:bg-dark-700"
                )}
              >
                {done ? (
                  <Check className="h-5 w-5 text-white stroke-[2.5]" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-semibold hidden sm:block",
                  active
                    ? "text-primary-600 dark:text-primary-400"
                    : done
                    ? "text-dark-700 dark:text-light-200"
                    : "text-gray-400 dark:text-gray-500"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Form Field Helpers ───────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-dark-800 dark:text-light-100 mb-2">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

// ─── Text Input ───────────────────────────────────────────────────────────────

function TextInput({
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  type = "text",
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  icon?: React.ElementType;
  type?: string;
}) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3 bg-white dark:bg-dark-700 transition-all duration-200 shadow-sm",
          error
            ? "border-red-400 ring-2 ring-red-100 dark:ring-red-950/40"
            : "border-gray-200 dark:border-gray-700 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30"
        )}
      >
        {Icon && (
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="flex-1 bg-transparent text-sm font-medium text-dark-800 dark:text-light-100 placeholder:text-gray-400 outline-none min-w-0"
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ─── Number Stepper Input ─────────────────────────────────────────────────────

function NumberStepperInput({
  value,
  onChange,
  min = 1,
  max = 500,
  step = 1,
  error,
  icon: Icon,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  icon?: React.ElementType;
}) {
  const handleDecrement = () => {
    onChange(Math.max(min, (Number(value) || min) - step));
  };

  const handleIncrement = () => {
    onChange(Math.min(max, (Number(value) || min) + step));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/^0+(?=\d)/, ""); // hapus leading zeros
    if (raw === "") {
      onChange(0);
      return;
    }
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center rounded-xl border bg-white dark:bg-dark-700 shadow-sm transition-all duration-200 overflow-hidden",
          error
            ? "border-red-400 ring-2 ring-red-100 dark:ring-red-950/40"
            : "border-gray-200 dark:border-gray-700 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30"
        )}
      >
        {Icon && (
          <div className="pl-4 pr-1 text-gray-400 dark:text-gray-500">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value === 0 ? "" : value}
          onChange={handleInputChange}
          placeholder="0"
          className="flex-1 bg-transparent px-3 py-3 text-sm font-bold text-dark-800 dark:text-light-100 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <div className="flex items-center pr-2 gap-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-dark-600 text-dark-700 dark:text-light-200 hover:bg-gray-200 dark:hover:bg-dark-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= max}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-dark-600 text-dark-700 dark:text-light-200 hover:bg-gray-200 dark:hover:bg-dark-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ─── Radio Card Group ─────────────────────────────────────────────────────────

function RadioCard({
  options,
  value,
  onChange,
  error,
  columns = 2,
}: {
  options: { value: string; label: string; sub?: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: number;
}) {
  return (
    <div>
      <div
        className={cn(
          "grid gap-3",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative rounded-xl border-2 p-3 text-left transition-all duration-200",
                selected
                  ? "border-primary-500 bg-primary-50/80 dark:bg-primary-900/30 shadow-sm"
                  : "border-gray-200 dark:border-gray-700 hover:border-primary-300 bg-white dark:bg-dark-700"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold leading-snug",
                      selected
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-dark-700 dark:text-light-200"
                    )}
                  >
                    {opt.label}
                  </p>
                  {opt.sub && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {opt.sub}
                    </p>
                  )}
                </div>
                {selected && (
                  <CheckCircle2 className="h-4 w-4 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({
  control,
  errors,
}: {
  control: ReturnType<typeof useForm<FormData>>["control"];
  errors: Partial<Record<keyof FormData, { message?: string }>>;
}) {
  const destinationOptions = Object.keys(BASE_PRICES).map((d) => ({
    value: d,
    label: d,
    sub: `Dari ${formatRupiah(BASE_PRICES[d])} / siswa`,
  }));

  const durationOptions = Object.keys(DURATION_MULT).map((d) => ({
    value: d,
    label: d,
    sub: `×${DURATION_MULT[d].toFixed(1)} paket`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>🗺️ Pilih Destinasi Wisata</FieldLabel>
        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <RadioCard
              options={destinationOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.destination?.message}
              columns={2}
            />
          )}
        />
      </div>

      <div>
        <FieldLabel>📅 Durasi Perjalanan</FieldLabel>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <RadioCard
              options={durationOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.duration?.message}
              columns={4}
            />
          )}
        />
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({
  control,
  errors,
}: {
  control: ReturnType<typeof useForm<FormData>>["control"];
  errors: Partial<Record<keyof FormData, { message?: string }>>;
}) {
  const busOptions = Object.entries(BUS_LABELS).map(([value, label]) => ({
    value,
    label,
    sub: `×${BUS_MULT[value].toFixed(1)} armada`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary-500" />
            Jumlah Siswa
          </span>
        </FieldLabel>
        <Controller
          name="studentCount"
          control={control}
          render={({ field }) => (
            <NumberStepperInput
              value={field.value ?? 0}
              onChange={field.onChange}
              min={20}
              max={500}
              step={10}
              error={errors.studentCount?.message}
              icon={Users}
            />
          )}
        />
        <p className="mt-2 text-xs text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1.5">
          <span>💡</span> Bonus Khusus: Setiap 20 siswa, 1 guru pendamping GRATIS!
        </p>
      </div>

      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <Bus className="h-4 w-4 text-primary-500" />
            Tipe Armada Bus
          </span>
        </FieldLabel>
        <Controller
          name="busType"
          control={control}
          render={({ field }) => (
            <RadioCard
              options={busOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.busType?.message}
              columns={3}
            />
          )}
        />
      </div>

      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary-500" />
            Jumlah Guru / Pendamping
          </span>
        </FieldLabel>
        <Controller
          name="teacherCount"
          control={control}
          render={({ field }) => (
            <NumberStepperInput
              value={field.value ?? 0}
              onChange={field.onChange}
              min={1}
              max={50}
              step={1}
              error={errors.teacherCount?.message}
              icon={User}
            />
          )}
        />
      </div>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({
  control,
  errors,
}: {
  control: ReturnType<typeof useForm<FormData>>["control"];
  errors: Partial<Record<keyof FormData, { message?: string }>>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <School className="h-4 w-4 text-primary-500" />
            Nama Sekolah
          </span>
        </FieldLabel>
        <Controller
          name="schoolName"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Contoh: SMA Negeri 1 Kebumen"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.schoolName?.message}
              icon={School}
            />
          )}
        />
      </div>

      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary-500" />
            Nama PIC / Penanggung Jawab
          </span>
        </FieldLabel>
        <Controller
          name="contactName"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Contoh: Budi Prasetyo (Ketua OSIS)"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.contactName?.message}
              icon={User}
            />
          )}
        />
      </div>

      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary-500" />
            Nomor WhatsApp
          </span>
        </FieldLabel>
        <Controller
          name="whatsapp"
          control={control}
          render={({ field }) => (
            <TextInput
              type="tel"
              placeholder="Contoh: 081234567890"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.whatsapp?.message}
              icon={Phone}
            />
          )}
        />
      </div>

      {/* WhatsApp Note */}
      <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 p-4 flex gap-3">
        <MessageCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-primary-800 dark:text-primary-200">
            Penawaran Resmi via WhatsApp
          </p>
          <p className="text-xs text-primary-700/80 dark:text-primary-300/80 mt-1 leading-relaxed">
            Data ini akan langsung kami buatkan draft penawaran resmi berstempel dan itinerary lengkap via WA. Gratis & tanpa komitmen!
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

interface SummaryCardProps {
  watchValues: Partial<FormData>;
  estimate: EstimateResult;
}

function SummaryCard({ watchValues, estimate }: SummaryCardProps) {
  const hasDestination = !!watchValues.destination;
  const studentCount = watchValues.studentCount ?? 0;
  const teacherCount = watchValues.teacherCount ?? 0;

  return (
    <div
      className={cn(
        "rounded-2xl border",
        "bg-white dark:bg-dark-800",
        "border-gray-100 dark:border-gray-800",
        "shadow-xl shadow-primary-900/5",
        "overflow-hidden",
        "lg:sticky lg:top-24"
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-6 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="h-5 w-5 text-accent-300" />
          <h4 className="text-base font-bold">Ringkasan Estimasi Biaya</h4>
        </div>
        <p className="text-xs text-primary-200">
          Kalkulasi real-time transparan sesuai pilihanmu
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Trip details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 text-primary-500" />
              Destinasi
            </span>
            <span className="font-bold text-dark-800 dark:text-light-100">
              {watchValues.destination || "—"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CalendarDays className="h-4 w-4 text-primary-500" />
              Durasi
            </span>
            <span className="font-bold text-dark-800 dark:text-light-100">
              {watchValues.duration || "—"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Bus className="h-4 w-4 text-primary-500" />
              Armada
            </span>
            <span className="font-bold text-dark-800 dark:text-light-100 text-right">
              {watchValues.busType
                ? BUS_LABELS[watchValues.busType] || watchValues.busType
                : "—"}
            </span>
          </div>
        </div>

        {/* Breakdown */}
        {hasDestination && studentCount >= 20 && (
          <div className="space-y-2.5 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Rincian Peserta
            </p>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                Siswa ({studentCount} orang)
              </span>
              <span className="font-semibold text-dark-800 dark:text-light-100">
                {formatRupiah(estimate.totalStudentsPrice)}
              </span>
            </div>

            {teacherCount > 0 && (
              <div className="flex justify-between text-sm items-center">
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-300">
                    Guru ({teacherCount} orang)
                  </span>
                  {estimate.actualFreeTeachers > 0 && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {estimate.actualFreeTeachers === teacherCount
                        ? `(Semua ${teacherCount} guru gratis)`
                        : `(${estimate.actualFreeTeachers} gratis, ${estimate.payingTeachers} bayar)`}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "font-bold",
                    estimate.totalTeachersPrice === 0
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded text-xs"
                      : "text-dark-800 dark:text-light-100"
                  )}
                >
                  {estimate.totalTeachersPrice === 0
                    ? "GRATIS"
                    : formatRupiah(estimate.totalTeachersPrice)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-xs text-gray-400 pt-1 border-t border-dashed border-gray-100 dark:border-gray-800">
              <span>Biaya per siswa</span>
              <span className="font-semibold">{formatRupiah(estimate.pricePerStudent)}</span>
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-900/10 border border-primary-200 dark:border-primary-800 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Estimasi Total Budget
          </p>
          <div className="text-2xl font-black text-primary-700 dark:text-primary-300">
            {hasDestination && studentCount >= 20 ? (
              <AnimatedNumber value={estimate.grandTotal} />
            ) : (
              "—"
            )}
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
            *Belum termasuk tiket wahana opsional
          </p>
        </div>

        {/* DP info */}
        {hasDestination && studentCount >= 20 && (
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 px-3 py-2 text-center">
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Estimasi DP 30%:{" "}
              <span className="font-bold">
                {formatRupiah(estimate.grandTotal * 0.3)}
              </span>
            </p>
          </div>
        )}

        {!hasDestination && (
          <div className="text-center py-6">
            <Sparkles className="h-8 w-8 text-primary-400/50 mx-auto mb-2" />
            <p className="text-sm text-gray-400">
              Pilih destinasi di form untuk melihat kalkulasi harga otomatis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  data,
  estimate,
  onReset,
}: {
  data: FormData;
  estimate: EstimateResult;
  onReset: () => void;
}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-8 px-4 space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center ring-8 ring-emerald-50 dark:ring-emerald-950/30"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </motion.div>

      <div>
        <h3 className="text-2xl font-extrabold text-dark-800 dark:text-light-100">
          Estimasi Berhasil Terkirim!
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
          Tim Wara Wiri akan segera menghubungi PIC <span className="font-semibold text-dark-800 dark:text-light-100">{data.contactName}</span> ({data.schoolName}) di WhatsApp <span className="font-semibold text-primary-600">{data.whatsapp}</span>.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-dark-700/60 border border-gray-100 dark:border-gray-700 rounded-xl p-5 w-full text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Destinasi & Durasi</span>
          <span className="font-bold">{data.destination} ({data.duration})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Peserta</span>
          <span className="font-bold">{data.studentCount} Siswa + {data.teacherCount} Guru</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
          <span className="text-gray-500 font-medium">Estimasi Grand Total</span>
          <span className="font-black text-lg text-primary-600 dark:text-primary-400">
            {formatRupiah(estimate.grandTotal)}
          </span>
        </div>
      </div>

      <Button intent="outline" size="lg" onClick={onReset} className="w-full">
        Hitung Estimasi Paket Lain
      </Button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TripEstimator() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    control,
    trigger,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: {
      destination: "Bali",
      duration: "3D2N",
      studentCount: 40,
      busType: "Standard",
      teacherCount: 2,
      schoolName: "",
      contactName: "",
      whatsapp: "",
    },
  });

  const watchValues = watch();

  const estimate = calculateEstimate({
    destination: watchValues.destination ?? "Bali",
    duration: watchValues.duration ?? "3D2N",
    studentCount: watchValues.studentCount ?? 40,
    busType: watchValues.busType ?? "Standard",
    teacherCount: watchValues.teacherCount ?? 2,
  });

  const stepFields: (keyof FormData)[][] = [
    ["destination", "duration"],
    ["studentCount", "busType", "teacherCount"],
    ["schoolName", "contactName", "whatsapp"],
  ];

  const handleNext = useCallback(async () => {
    const valid = await trigger(stepFields[step] as (keyof FormData)[]);
    if (valid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  }, [step, trigger]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);

    const quotaFree = Math.floor(data.studentCount / 20);
    const actualFree = Math.min(data.teacherCount, quotaFree);
    const payT = Math.max(0, data.teacherCount - quotaFree);

    const msg = [
      `🌟 *PERMINTAAN ESTIMASI TRIP - WARA WIRI* 🌟`,
      ``,
      `📚 *Data Sekolah*`,
      `Sekolah: ${data.schoolName}`,
      `PIC: ${data.contactName}`,
      `WA: ${data.whatsapp}`,
      ``,
      `🗺️ *Detail Perjalanan*`,
      `Destinasi: ${data.destination}`,
      `Durasi: ${data.duration}`,
      `Armada: ${BUS_LABELS[data.busType]}`,
      ``,
      `👥 *Peserta*`,
      `Siswa: ${data.studentCount} orang`,
      `Guru: ${data.teacherCount} orang (${actualFree} gratis, ${payT} berbayar)`,
      ``,
      `💰 *Estimasi Biaya*`,
      `Harga/Siswa: ${formatRupiah(estimate.pricePerStudent)}`,
      `Total Siswa: ${formatRupiah(estimate.totalStudentsPrice)}`,
      `Total Guru: ${estimate.totalTeachersPrice === 0 ? "GRATIS" : formatRupiah(estimate.totalTeachersPrice)}`,
      `*ESTIMASI TOTAL: ${formatRupiah(estimate.grandTotal)}*`,
      `DP 30%: ${formatRupiah(estimate.grandTotal * 0.3)}`,
      ``,
      `Mohon kirimkan penawaran resmi & itinerary detail. Terima kasih! 🙏`,
    ].join("\n");

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${ADMIN_WA}?text=${encoded}`, "_blank");

    setSubmitted(true);
  };

  const handleReset = () => {
    reset({
      destination: "Bali",
      duration: "3D2N",
      studentCount: 40,
      busType: "Standard",
      teacherCount: 2,
      schoolName: "",
      contactName: "",
      whatsapp: "",
    });
    setStep(0);
    setSubmitted(false);
    setSubmittedData(null);
    setDirection(1);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <Section
      id="estimator"
      heading="Estimasi Biaya Trip Sekolahmu"
      description="Hitung kasar budget study tour kelasmu secara instan. Transparan dan anti ribet!"
      align="center"
      className="relative overflow-hidden scroll-mt-20 pt-20 md:pt-24 pb-20 bg-gradient-to-br from-primary-50 via-light-100 to-accent-50/30 dark:from-dark-900 dark:via-dark-900 dark:to-primary-950/40"
    >
      {/* Decorative dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #0066CC22 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12 items-start">
        {/* ── LEFT: Form Panel ──────────────────────────────────────────── */}
        <div className="rounded-2xl bg-white dark:bg-dark-800 border border-gray-100 dark:border-gray-800 shadow-xl shadow-primary-900/5 p-6 md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {submitted && submittedData ? (
              <SuccessScreen
                key="success"
                data={submittedData}
                estimate={estimate}
                onReset={handleReset}
              />
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProgressBar currentStep={step} />

                {/* Step Title */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`title-${step}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="mb-6"
                  >
                    <h3 className="text-xl font-bold text-dark-800 dark:text-light-100">
                      {step === 0 && "Step 1: Pilih Destinasi & Durasi"}
                      {step === 1 && "Step 2: Jumlah Peserta & Armada"}
                      {step === 2 && "Step 3: Data Kontak Sekolah"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {step === 0 && "Tentukan destinasi impian dan durasi perjalanan sekolahmu."}
                      {step === 1 && "Berapa banyak siswa & guru yang ikut serta armada bus pilihanmu."}
                      {step === 2 && "Siapa yang dapat kami hubungi untuk pengiriman penawaran resmi."}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Step Content */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`step-${step}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      {step === 0 && <Step1 control={control} errors={errors} />}
                      {step === 1 && <Step2 control={control} errors={errors} />}
                      {step === 2 && <Step3 control={control} errors={errors} />}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-3 sm:gap-4 mt-8 pt-5 border-t border-gray-100 dark:border-gray-800">
                    {step > 0 && (
                      <Button
                        type="button"
                        intent="outline"
                        size="lg"
                        className="flex-1"
                        onClick={handleBack}
                      >
                        <ChevronLeft className="h-5 w-5" />
                        <span>Kembali</span>
                      </Button>
                    )}

                    {step < STEPS.length - 1 ? (
                      <Button
                        type="button"
                        intent="primary"
                        size="lg"
                        className="flex-1"
                        onClick={handleNext}
                      >
                        <span>Lanjut</span>
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        intent="secondary"
                        size="lg"
                        className="flex-1 shadow-lg shadow-secondary-500/25 font-bold"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>Dapatkan Penawaran via WA</span>
                      </Button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Summary Card ────────────────────────────────────────── */}
        <SummaryCard watchValues={watchValues} estimate={estimate} />
      </div>
    </Section>
  );
}
