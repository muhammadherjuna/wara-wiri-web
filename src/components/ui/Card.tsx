"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Card Root ────────────────────────────────────────────────────────────────

export interface CardProps extends HTMLMotionProps<"div"> {
  /** Enable the hover lift + shadow animation (default: true) */
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverable
            ? { y: -4, boxShadow: "0 20px 40px -12px rgba(0,102,204,0.15)" }
            : undefined
        }
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={cn(
          "rounded-2xl bg-white dark:bg-dark-800",
          "border border-gray-100 dark:border-gray-800",
          "shadow-sm",
          "overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

// ─── CardHeader ───────────────────────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// ─── CardTitle ────────────────────────────────────────────────────────────────

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  CardTitleProps
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-dark dark:text-light",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ─── CardDescription ─────────────────────────────────────────────────────────

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─── CardContent ─────────────────────────────────────────────────────────────

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pb-6 pt-0", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

// ─── CardFooter ──────────────────────────────────────────────────────────────

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-6 py-4",
        "border-t border-gray-100 dark:border-gray-800",
        "bg-gray-50/50 dark:bg-dark-900/30",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
