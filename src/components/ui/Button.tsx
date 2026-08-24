"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── CVA Variants ────────────────────────────────────────────────────────────

const buttonVariants = cva(
  // Base styles applied to every variant
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold rounded-xl",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "select-none",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-primary-600 text-white shadow-sm shadow-primary-200",
          "hover:bg-primary-700 hover:shadow-md hover:shadow-primary-200",
          "active:scale-95",
        ],
        secondary: [
          "bg-secondary-500 text-white shadow-sm shadow-secondary-200",
          "hover:bg-secondary-600 hover:shadow-md hover:shadow-secondary-200",
          "active:scale-95",
        ],
        outline: [
          "border-2 border-primary-600 text-primary-600 bg-transparent",
          "hover:bg-primary-50 hover:shadow-sm",
          "active:scale-95",
        ],
        ghost: [
          "bg-transparent text-primary-600",
          "hover:bg-primary-50",
          "active:scale-95",
        ],
      },
      size: {
        sm:   "h-8  px-3 text-xs",
        md:   "h-10 px-5 text-sm",
        lg:   "h-12 px-7 text-base",
        icon: "h-10 w-10 p-0 rounded-xl",
      },
    },
    defaultVariants: {
      intent: "primary",
      size:   "md",
    },
  }
);

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type MotionButtonProps = HTMLMotionProps<"button">;
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps
  extends Omit<NativeButtonProps, keyof MotionButtonProps>,
    MotionButtonProps,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  /** Accessible label shown to screen readers when loading */
  loadingText?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      isLoading = false,
      loadingText = "Loading…",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const spinnerSize: Record<NonNullable<typeof size>, string> = {
      sm:   "h-3 w-3",
      md:   "h-4 w-4",
      lg:   "h-5 w-5",
      icon: "h-4 w-4",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(buttonVariants({ intent, size }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={isLoading ? loadingText : undefined}
        {...props}
      >
        {isLoading && (
          <Spinner className={spinnerSize[size ?? "md"]} aria-hidden />
        )}
        <span className={cn(isLoading && "opacity-70")}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
