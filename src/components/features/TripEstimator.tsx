"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  Clock,
  Bus,
  Users,
  Phone,
  School,
  User,
  Calculator,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/data/packages";
import {
  DESTINATIONS,
  DURATIONS,
  BUS_TYPES,
  ADMIN_WA_NUMBER,
  calculateEstimation,
  buildWhatsAppMessage,
  getDestination,
  getDuration,
  getBusType,
} from "@/lib/pricing";
import type { EstimatorFormValues } from "@/types/estimator";

// --- Zod Schema ---

const schema = z.object({
  destination: z.string().min(1, "Pilih destinasi terlebih dahulu"),
  duration:    z.string().min(1, "Pilih durasi perjalanan"),
  studentCount: z
    .number()
    .min(20,  "Minimal 20 siswa")
    .max(500, "Maksimal 500 siswa"),
  teacherCount: z
    .number()
    .min(1,  "Minimal 1 guru pendamping")
    .max(50, "Maksimal 50 guru"),
  busType:   z.string().min(1, "Pilih tipe armada bus"),
  schoolName:  z.string().min(3,  "Nama sekolah minimal 3 karakter"),
  contactName: z.string().min(3,  "Nama perwakilan minimal 3 karakter"),
  whatsapp:    z
    .string()
    .min(9, "Nomor WhatsApp tidak valid")
    .regex(/^(\+62|62|0)[0-9]{8,13}$/, "Format: 081234567890 atau 6281234567890"),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { label: "Destinasi", icon: MapPin  },
  { label: "Peserta",   icon: Users   },
  { label: "Kontak",    icon: Phone   },
] as const;

const STEP_FIELDS: (keyof FormData)[][] = [
  ["destination", "duration"],
  ["studentCount", "teacherCount", "busType"],
  ["schoolName", "contactName", "whatsapp"],
];

// --- AnimatedNumber ---

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 14 });
  const display = useTransform(spring, (v) => formatRupiah(Math.round(v)));
  const [text, setText] = useState(formatRupiah(value));
  useEffect(() => { spring.set(value); }, [spring, value]);
  useEffect(() => { return display.on("change", (v) => setText(v)); }, [display]);
  return <span>{text}</span>;
}

// --- StepProgressBar ---

function StepProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" style={{ zIndex: 0 }} />
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary-500 origin-left"
          style={{ zIndex: 0 }}
          initial={false}
          animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {STEPS.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <div key={i} className="relative flex flex-col items-center gap-2" style={{ zIndex: 1 }}>
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold text-sm transition-all duration-300",
                done    ? "border-primary-500 bg-primary-500 text-white"
                : current ? "border-primary-500 bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-800 text-gray-400"
              )}>
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-xs font-medium",
                current  ? "text-primary-600 dark:text-primary-400"
                : done   ? "text-gray-500 dark:text-gray-400"
                : "text-gray-400 dark:text-gray-600"
              )}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Langkah {step + 1} dari {STEPS.length}
      </p>
    </div>
  );
}

// --- FieldError ---

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

// --- FormField wrapper ---

function FormField({ label, icon: Icon, error, children }: {
  label: string;
  icon?: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {Icon && <Icon className="h-4 w-4 text-primary-500" />}
        {label}
      </label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

// --- TextInput ---

function TextInput({ value, onChange, onBlur, placeholder, type = "text", error }: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      className={cn(
        "w-full appearance-none rounded-xl border bg-white dark:bg-dark-800 px-4 py-3",
        "text-sm font-medium text-dark-800 dark:text-light-100 placeholder:text-gray-400",
        "outline-none transition-colors duration-150",
        error
          ? "border-red-400"
          : "border-gray-200 dark:border-gray-700 focus:border-primary-400"
      )}
    />
  );
}

// --- NumberInput ---

function NumberInput({ value, onChange, onBlur, placeholder, min, max, error }: {
  value: number;
  onChange: (v: number) => void;
  onBlur?: () => void;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/^0+(?=\d)/, "");
    if (raw === "") { onChange(0); return; }
    const n = parseInt(raw, 10);
    if (!isNaN(n)) onChange(n);
  };
  return (
    <input
      type="number"
      value={value === 0 ? "" : value}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder ?? "0"}
      min={min}
      max={max}
      className={cn(
        "w-full appearance-none rounded-xl border bg-white dark:bg-dark-800 px-4 py-3",
        "text-sm font-semibold text-dark-800 dark:text-light-100 placeholder:text-gray-400",
        "outline-none transition-colors duration-150",
        "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
        error
          ? "border-red-400"
          : "border-gray-200 dark:border-gray-700 focus:border-primary-400"
      )}
    />
  );
}

// --- SelectInput ---

function SelectInput({ value, onChange, onBlur, error, options, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={cn(
        "w-full appearance-none rounded-xl border bg-white dark:bg-dark-800 px-4 py-3",
        "text-sm font-medium text-dark-800 dark:text-light-100",
        "outline-none transition-colors duration-150 cursor-pointer",
        error
          ? "border-red-400"
          : "border-gray-200 dark:border-gray-700 focus:border-primary-400"
      )}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

// --- RadioCardGroup ---

function RadioCardGroup({ value, onChange, error, options, columns = 3 }: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  options: { value: string; label: string; sublabel?: string }[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <div className={cn(
      "grid gap-3",
      columns === 2 && "grid-cols-2",
      columns === 3 && "grid-cols-1 sm:grid-cols-3",
      columns === 4 && "grid-cols-2 sm:grid-cols-4",
      error && "ring-1 ring-red-400 rounded-xl p-1"
    )}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-xl border-2 p-3 text-left transition-colors duration-150",
              selected
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800 hover:border-primary-300"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={cn("text-sm font-semibold leading-snug",
                  selected ? "text-primary-700 dark:text-primary-300" : "text-gray-800 dark:text-gray-200"
                )}>{opt.label}</p>
                {opt.sublabel && <p className="mt-0.5 text-xs text-gray-400">{opt.sublabel}</p>}
              </div>
              <CheckCircle2 className={cn(
                "h-4 w-4 shrink-0 mt-0.5 transition-opacity duration-150",
                selected ? "opacity-100 text-primary-600 dark:text-primary-400" : "opacity-0 text-primary-600"
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

// --- Step1 ---

function Step1({ control, errors }: {
  control: ReturnType<typeof useForm<FormData>>["control"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
}) {
  return (
    <div className="space-y-6">
      <Controller name="destination" control={control} render={({ field }) => (
        <FormField label="Destinasi Wisata" icon={MapPin} error={errors.destination?.message}>
          <SelectInput
            value={field.value} onChange={field.onChange} onBlur={field.onBlur}
            error={!!errors.destination} placeholder="-- Pilih Destinasi --"
            options={DESTINATIONS}
          />
        </FormField>
      )} />
      <Controller name="duration" control={control} render={({ field }) => (
        <FormField label="Durasi Perjalanan" icon={Clock} error={errors.duration?.message}>
          <RadioCardGroup
            value={field.value} onChange={field.onChange} error={!!errors.duration} columns={2}
            options={DURATIONS.map((d) => ({ value: d.value, label: d.label, sublabel: d.value }))}
          />
        </FormField>
      )} />
    </div>
  );
}

// --- Step2 ---

function Step2({ control, errors }: {
  control: ReturnType<typeof useForm<FormData>>["control"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
}) {
  return (
    <div className="space-y-6">
      <Controller name="studentCount" control={control} render={({ field }) => (
        <FormField label="Jumlah Siswa" icon={Users} error={errors.studentCount?.message}>
          <NumberInput value={field.value} onChange={field.onChange} onBlur={field.onBlur}
            placeholder="Minimal 20 siswa" min={20} max={500} error={!!errors.studentCount} />
        </FormField>
      )} />
      <Controller name="teacherCount" control={control} render={({ field }) => (
        <FormField label="Jumlah Guru Pendamping" icon={User} error={errors.teacherCount?.message}>
          <NumberInput value={field.value} onChange={field.onChange} onBlur={field.onBlur}
            placeholder="Minimal 1 guru" min={1} max={50} error={!!errors.teacherCount} />
          <p className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 mt-1.5">
            <Info className="h-3.5 w-3.5 shrink-0" />
            Setiap 20 siswa mendapat 1 guru pendamping gratis.
          </p>
        </FormField>
      )} />
      <Controller name="busType" control={control} render={({ field }) => (
        <FormField label="Tipe Armada Bus" icon={Bus} error={errors.busType?.message}>
          <RadioCardGroup
            value={field.value} onChange={field.onChange} error={!!errors.busType} columns={3}
            options={BUS_TYPES.map((b) => ({ value: b.value, label: b.label, sublabel: b.sublabel }))}
          />
        </FormField>
      )} />
    </div>
  );
}

// --- Step3 ---

function Step3({ control, errors, isSubmitted }: {
  control: ReturnType<typeof useForm<FormData>>["control"];
  errors: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  isSubmitted: boolean;
}) {
  return (
    <div className="space-y-6">
      <Controller name="schoolName" control={control} render={({ field }) => (
        <FormField label="Nama Sekolah" icon={School} error={isSubmitted ? errors.schoolName?.message : undefined}>
          <TextInput value={field.value} onChange={field.onChange} onBlur={field.onBlur}
            placeholder="Contoh: SMA Negeri 1 Kebumen" error={!!(isSubmitted && errors.schoolName)} />
        </FormField>
      )} />
      <Controller name="contactName" control={control} render={({ field }) => (
        <FormField label="Nama Perwakilan" icon={User} error={isSubmitted ? errors.contactName?.message : undefined}>
          <TextInput value={field.value} onChange={field.onChange} onBlur={field.onBlur}
            placeholder="Contoh: Budi (Ketua OSIS)" error={!!(isSubmitted && errors.contactName)} />
        </FormField>
      )} />
      <Controller name="whatsapp" control={control} render={({ field }) => (
        <FormField label="Nomor WhatsApp" icon={Phone} error={isSubmitted ? errors.whatsapp?.message : undefined}>
          <TextInput value={field.value} onChange={field.onChange} onBlur={field.onBlur}
            placeholder="Contoh: 081234567890" type="tel" error={!!(isSubmitted && errors.whatsapp)} />
        </FormField>
      )} />
      <div className="flex gap-3 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-900/10 p-4">
        <MessageCircle className="h-5 w-5 shrink-0 text-blue-500 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Penawaran Resmi via WhatsApp</p>
          <p className="mt-0.5 text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
            Data ini akan kami siapkan dalam bentuk penawaran resmi berstempel beserta itinerary lengkap
            dan dikirim langsung via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- SummaryCard ---

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-2 py-2 text-sm">
      <span className="text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <span className={cn("text-right font-semibold",
        highlight ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-200"
      )}>{value}</span>
    </div>
  );
}

function SummaryCard({ values }: { values: EstimatorFormValues }) {
  const result = calculateEstimation(values);
  const dest   = getDestination(values.destination);
  const dur    = getDuration(values.duration);
  const bus    = getBusType(values.busType);

  return (
    <Card hoverable={false} className="overflow-visible">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
            <Calculator className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Ringkasan Estimasi</CardTitle>
            <CardDescription>Perkiraan biaya berdasarkan pilihan trip kamu.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-900/40 px-4">
          <SummaryRow label="Destinasi" value={dest.label} />
          <SummaryRow label="Durasi"    value={dur.label} />
          <SummaryRow label="Tipe Bus"  value={bus.label} />
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-900/40 px-4">
          <SummaryRow label="Jumlah Siswa" value={`${values.studentCount} orang`} />
          <SummaryRow label="Jumlah Guru"  value={`${values.teacherCount} orang`} />
          {result.freeTeachers > 0 && (
            <SummaryRow label="Guru Gratis" value={`${result.freeTeachers} orang`} highlight />
          )}
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-900/40 px-4">
          <SummaryRow label="Harga per Siswa" value={formatRupiah(result.pricePerStudent)} />
          {result.payingTeachers > 0 && (
            <SummaryRow label={`Guru Bayar (${result.payingTeachers})`} value={formatRupiah(result.totalTeachersPrice)} />
          )}
        </div>
        <div className="mt-2 rounded-xl bg-primary-600 px-5 py-4 text-white">
          <p className="text-xs font-medium opacity-80 mb-1">Estimasi Total Budget</p>
          <div className="text-2xl font-bold tracking-tight">
            <AnimatedNumber value={result.grandTotal} />
          </div>
          <p className="text-xs opacity-60 mt-1">*Belum termasuk akomodasi dan tiket masuk</p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          Estimasi DP 30%:{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-400">
            {formatRupiah(result.grandTotal * 0.3)}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

// --- Slide variants ---

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

// --- Main TripEstimator ---

export function TripEstimator() {
  const [step, setStep] = useState(0);
  const [dir, setDir]   = useState(1);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      destination:  "jogja",
      duration:     "3D2N",
      studentCount: 30,
      teacherCount: 3,
      busType:      "standard",
      schoolName:   "",
      contactName:  "",
      whatsapp:     "",
    },
    mode: "onSubmit",
  });

  const watched = watch();
  const estimatorValues: EstimatorFormValues = {
    destination:  watched.destination  ?? "jogja",
    duration:     watched.duration     ?? "3D2N",
    studentCount: watched.studentCount ?? 30,
    teacherCount: watched.teacherCount ?? 3,
    busType:      watched.busType      ?? "standard",
    schoolName:   watched.schoolName   ?? "",
    contactName:  watched.contactName  ?? "",
    whatsapp:     watched.whatsapp     ?? "",
  };

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) { setDir(1); setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  };

  const handleBack = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const result = calculateEstimation(data);
    const msg    = buildWhatsAppMessage(data, result);
    const url    = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Section
      id="estimator"
      heading="Estimasi Biaya Trip Sekolahmu"
      description="Hitung perkiraan biaya study tour kelasmu secara instan. Transparan, mudah, dan tanpa ribet."
      align="center"
      className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-900/60 dark:to-dark-900"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:items-start">

        {/* Left: Multi-step Form */}
        <Card hoverable={false} className="p-6 sm:p-8">
          <StepProgressBar step={step} />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`title-${step}`}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-dark-800 dark:text-light-100">
                {step === 0 && "Langkah 1: Destinasi & Durasi"}
                {step === 1 && "Langkah 2: Jumlah Peserta & Armada"}
                {step === 2 && "Langkah 3: Data Kontak Sekolah"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {step === 0 && "Tentukan destinasi dan durasi perjalanan study tour."}
                {step === 1 && "Masukkan jumlah peserta dan pilih armada bus."}
                {step === 2 && "Isi data kontak penanggung jawab sekolah."}
              </p>
            </motion.div>
          </AnimatePresence>

          <form
            onSubmit={(e) => {
              if (step < STEPS.length - 1) {
                e.preventDefault();
                handleNext();
              } else {
                handleSubmit(onSubmit)(e);
              }
            }}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`step-${step}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {step === 0 && <Step1 control={control} errors={errors} />}
                {step === 1 && <Step2 control={control} errors={errors} />}
                {step === 2 && <Step3 control={control} errors={errors} isSubmitted={isSubmitted} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-6">
              {step > 0 && (
                <Button type="button" intent="outline" className="flex-1 h-11 gap-2" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4" />
                  Kembali
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button type="button" intent="primary" className="flex-1 h-11 gap-2" onClick={handleNext}>
                  Lanjut
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" intent="secondary" className="flex-1 h-11 gap-2" isLoading={isSubmitting}>
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  Dapatkan Penawaran via WA
                </Button>
              )}
            </div>
            {step === STEPS.length - 1 && (
              <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                Setelah klik, kamu akan diarahkan ke WhatsApp admin untuk konfirmasi.
              </p>
            )}
          </form>
        </Card>

        {/* Right: Sticky Summary */}
        <div className="lg:sticky lg:top-24">
          <SummaryCard values={estimatorValues} />
        </div>
      </div>
    </Section>
  );
}
