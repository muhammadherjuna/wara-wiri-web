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
  freeTeachers: number;
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

  const freeTeachers = Math.floor(data.studentCount / 20);
  const payingTeachers = Math.max(0, data.teacherCount - freeTeachers);
  const totalTeachersPrice = payingTeachers * pricePerStudent;

  const grandTotal = totalStudentsPrice + totalTeachersPrice;

  return {
    pricePerStudent,
    totalStudentsPrice,
    freeTeachers,
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
    .number({ invalid_type_error: "Harus berupa angka" })
    .min(20, "Minimum 20 siswa")
    .max(500, "Maximum 500 siswa"),
  busType: z.string().min(1, "Pilih tipe bus"),
  teacherCount: z
    .number({ invalid_type_error: "Harus berupa angka" })
    .min(1, "Minimum 1 guru")
    .max(50, "Maximum 50 guru"),
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
  const display = useTransform(spring, (v) =>
    formatRupiah(Math.round(v))
  );
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

const STEPS = ["Destinasi", "Peserta", "Kontak"];

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
                  scale: active ? 1.15 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
              >
                {done ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-bold",
                      active ? "text-white" : "text-gray-400"
                    )}
                  >
                    {i + 1}
                  </span>
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  active
                    ? "text-primary-600 dark:text-primary-400"
                    : done
                    ? "text-gray-500"
                    : "text-gray-400"
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

// ─── Form Field Wrapper ───────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-dark-700 dark:text-light-200 mb-2">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

function TextInput({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  prefix,
}: {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (v: string | number) => void;
  onBlur?: () => void;
  error?: string;
  icon?: React.ElementType;
  prefix?: string;
}) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-4 py-3",
          "bg-white dark:bg-dark-700",
          "transition-colors duration-200",
          error
            ? "border-red-400 focus-within:ring-2 focus-within:ring-red-300"
            : "border-gray-200 dark:border-gray-700 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30"
        )}
      >
        {Icon && (
          <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
        )}
        {prefix && (
          <span className="text-sm text-gray-400 font-medium shrink-0">
            {prefix}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            onChange(type === "number" ? Number(e.target.value) : e.target.value)
          }
          onBlur={onBlur}
          className="flex-1 bg-transparent text-sm text-dark-800 dark:text-light-100 placeholder:text-gray-400 outline-none min-w-0"
        />
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
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative rounded-xl border-2 px-3 py-3 text-left transition-all duration-200",
                selected
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-primary-300 bg-white dark:bg-dark-700"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold leading-tight",
                      selected
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-dark-700 dark:text-light-200"
                    )}
                  >
                    {opt.label}
                  </p>
                  {opt.sub && (
                    <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                  )}
                </div>
                {selected && (
                  <CheckCircle2 className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
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
    sub: `×${DURATION_MULT[d].toFixed(1)} harga`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>🗺️ Pilih Destinasi</FieldLabel>
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
    sub: `×${BUS_MULT[value].toFixed(1)} harga`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Jumlah Siswa
          </span>
        </FieldLabel>
        <Controller
          name="studentCount"
          control={control}
          render={({ field }) => (
            <TextInput
              type="number"
              placeholder="Contoh: 60"
              value={field.value ?? ""}
              onChange={(v) => field.onChange(Number(v))}
              onBlur={field.onBlur}
              error={errors.studentCount?.message}
              icon={Users}
            />
          )}
        />
        <p className="mt-1.5 text-xs text-gray-400">
          💡 Setiap 20 siswa, 1 guru gratis!
        </p>
      </div>

      <div>
        <FieldLabel>
          <span className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
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
            <User className="h-4 w-4" />
            Jumlah Guru / Pendamping
          </span>
        </FieldLabel>
        <Controller
          name="teacherCount"
          control={control}
          render={({ field }) => (
            <TextInput
              type="number"
              placeholder="Contoh: 4"
              value={field.value ?? ""}
              onChange={(v) => field.onChange(Number(v))}
              onBlur={field.onBlur}
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
            <School className="h-4 w-4" />
            Nama Sekolah
          </span>
        </FieldLabel>
        <Controller
          name="schoolName"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Contoh: SMA N 1 Kebumen"
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
            <User className="h-4 w-4" />
            Nama Penanggung Jawab
          </span>
        </FieldLabel>
        <Controller
          name="contactName"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Contoh: Budi (Ketua OSIS)"
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
            <Phone className="h-4 w-4" />
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

      {/* Privacy note */}
      <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 p-4 flex gap-3">
        <MessageCircle className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">
            Penawaran via WhatsApp
          </p>
          <p className="text-xs text-primary-600/70 dark:text-primary-400/70 mt-0.5">
            Tim kami akan menyiapkan penawaran resmi dan itinerary detail
            sesuai kebutuhan sekolahmu. Gratis & tanpa kewajiban!
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
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="h-5 w-5 text-primary-200" />
          <p className="text-sm font-semibold text-primary-100">Estimasi Harga</p>
        </div>
        <p className="text-xs text-primary-300">
          Harga perkiraan, dapat berubah sesuai negosiasi
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Trip details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              Destinasi
            </span>
            <span className="font-semibold text-dark-700 dark:text-light-200">
              {watchValues.destination || "—"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CalendarDays className="h-3.5 w-3.5" />
              Durasi
            </span>
            <span className="font-semibold text-dark-700 dark:text-light-200">
              {watchValues.duration || "—"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Bus className="h-3.5 w-3.5" />
              Armada
            </span>
            <span className="font-semibold text-dark-700 dark:text-light-200">
              {watchValues.busType ? BUS_LABELS[watchValues.busType] || watchValues.busType : "—"}
            </span>
          </div>
        </div>

        {/* Breakdown */}
        {hasDestination && (watchValues.studentCount ?? 0) >= 20 && (
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Rincian Peserta
            </p>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Siswa ({watchValues.studentCount ?? 0} orang)
              </span>
              <span className="font-medium text-dark-700 dark:text-light-200">
                {formatRupiah(estimate.totalStudentsPrice)}
              </span>
            </div>

            {(watchValues.teacherCount ?? 0) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Guru ({watchValues.teacherCount} orang
                  {estimate.freeTeachers > 0 && (
                    <span className="text-emerald-500 font-medium">
                      , {estimate.freeTeachers} gratis
                    </span>
                  )}
                  )
                </span>
                <span className="font-medium text-dark-700 dark:text-light-200">
                  {estimate.totalTeachersPrice === 0
                    ? "GRATIS"
                    : formatRupiah(estimate.totalTeachersPrice)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-xs text-gray-400 pt-1">
              <span>Harga per siswa</span>
              <span>{formatRupiah(estimate.pricePerStudent)}</span>
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-900/10 border border-primary-100 dark:border-primary-800 p-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Estimasi Total</p>
          <p className="text-2xl font-extrabold text-primary-700 dark:text-primary-400 leading-none">
            {hasDestination && (watchValues.studentCount ?? 0) >= 20 ? (
              <AnimatedNumber value={estimate.grandTotal} />
            ) : (
              "—"
            )}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Belum termasuk biaya masuk objek wisata
          </p>
        </div>

        {/* DP info */}
        {hasDestination && (watchValues.studentCount ?? 0) >= 20 && (
          <div className="text-center">
            <p className="text-xs text-gray-400">
              DP 30% ={" "}
              <span className="font-semibold text-secondary-500">
                {formatRupiah(estimate.grandTotal * 0.3)}
              </span>
            </p>
          </div>
        )}

        {!hasDestination && (
          <div className="text-center py-4">
            <Sparkles className="h-8 w-8 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
            <p className="text-sm text-gray-400">
              Isi form di samping untuk melihat estimasi harga
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
        className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </motion.div>

      <div>
        <h3 className="text-xl font-bold text-dark-800 dark:text-light-100">
          Estimasi Dikirim!
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
          Tim Wara Wiri akan menghubungi {data.contactName} di WA{" "}
          {data.whatsapp} dalam 1×24 jam.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 w-full text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Destinasi</span>
          <span className="font-semibold">{data.destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Peserta</span>
          <span className="font-semibold">{data.studentCount} siswa + {data.teacherCount} guru</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Estimasi Total</span>
          <span className="font-extrabold text-primary-600 dark:text-primary-400">
            {formatRupiah(estimate.grandTotal)}
          </span>
        </div>
      </div>

      <Button intent="outline" onClick={onReset} className="w-full">
        Hitung Estimasi Lain
      </Button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TripEstimator() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward
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
      destination: "",
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
    destination: watchValues.destination ?? "",
    duration: watchValues.duration ?? "3D2N",
    studentCount: watchValues.studentCount ?? 0,
    busType: watchValues.busType ?? "Standard",
    teacherCount: watchValues.teacherCount ?? 0,
  });

  // Step validation fields
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

    // Build WhatsApp message
    const freeT = Math.floor(data.studentCount / 20);
    const payT = Math.max(0, data.teacherCount - freeT);
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
      `Guru: ${data.teacherCount} orang (${freeT} gratis, ${payT} berbayar)`,
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
    reset();
    setStep(0);
    setSubmitted(false);
    setSubmittedData(null);
    setDirection(1);
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <Section
      id="estimator"
      heading="Estimasi Biaya Trip Sekolahmu"
      description="Hitung kasar budget study tour kelasmu secara instan. Transparan dan anti ribet!"
      align="center"
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-light-100 to-accent-50/30 dark:from-dark-900 dark:via-dark-900 dark:to-primary-950/40"
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
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-bold text-dark-800 dark:text-light-100">
                      {step === 0 && "Step 1: Pilih Destinasi & Durasi"}
                      {step === 1 && "Step 2: Jumlah Peserta & Armada"}
                      {step === 2 && "Step 3: Data Kontak Sekolah"}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                      {step === 0 && "Ke mana tujuan dan berapa lama tripnya?"}
                      {step === 1 && "Berapa peserta dan bus seperti apa yang diinginkan?"}
                      {step === 2 && "Siapa yang bisa kami hubungi untuk penawaran resmi?"}
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
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step === 0 && (
                        <Step1 control={control} errors={errors} />
                      )}
                      {step === 1 && (
                        <Step2 control={control} errors={errors} />
                      )}
                      {step === 2 && (
                        <Step3 control={control} errors={errors} />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-8">
                    {step > 0 && (
                      <Button
                        type="button"
                        intent="ghost"
                        className="flex-1"
                        onClick={handleBack}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Kembali
                      </Button>
                    )}

                    {step < STEPS.length - 1 ? (
                      <Button
                        type="button"
                        intent="primary"
                        className="flex-1"
                        onClick={handleNext}
                      >
                        Lanjut
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        intent="secondary"
                        className="flex-1 shadow-lg shadow-secondary-500/25"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Dapatkan Penawaran via WA
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
