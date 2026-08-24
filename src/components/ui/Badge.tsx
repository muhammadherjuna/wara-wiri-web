import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── CVA Variants ────────────────────────────────────────────────────────────

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full px-3 py-1",
    "text-xs font-semibold uppercase tracking-wide",
    "transition-colors duration-150",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary-100 text-primary-700",
          "dark:bg-primary-900/40 dark:text-primary-300",
        ],
        success: [
          "bg-emerald-100 text-emerald-700",
          "dark:bg-emerald-900/40 dark:text-emerald-300",
        ],
        warning: [
          "bg-accent-50 text-amber-700",
          "dark:bg-accent-900/30 dark:text-accent-300",
        ],
        danger: [
          "bg-red-100 text-red-700",
          "dark:bg-red-900/40 dark:text-red-300",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

// ─── Component ────────────────────────────────────────────────────────────────

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
