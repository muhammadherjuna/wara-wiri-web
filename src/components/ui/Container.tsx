import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls max-width. Defaults to "default" (max-w-7xl). */
  size?: "sm" | "md" | "default" | "full";
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

const containerSizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm:      "max-w-3xl",
  md:      "max-w-5xl",
  default: "max-w-7xl",
  full:    "max-w-full",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        containerSizes[size],
        "mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = "Container";
