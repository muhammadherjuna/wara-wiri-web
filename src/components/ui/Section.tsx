"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: string;
  align?: "left" | "center";
  /** Tag rendered for the root element (default: section) */
  as?: React.ElementType;
  containerSize?: "sm" | "md" | "default" | "full";
}

// ─── Animation variants ───────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      heading,
      description,
      align = "center",
      as: Tag = "section",
      containerSize = "default",
      children,
      ...props
    },
    ref
  ) => {
    const alignClass = align === "center" ? "text-center" : "text-left";

    return (
      <Tag
        ref={ref as React.Ref<HTMLElement>}
        className={cn("py-16 md:py-24", className)}
        {...props}
      >
        <Container size={containerSize}>
          {(heading || description) && (
            <div
              className={cn(
                "mb-12 space-y-4",
                align === "center" ? "mx-auto max-w-2xl" : ""
              )}
            >
              {heading && (
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={headerVariants}
                  className={cn(
                    "text-3xl md:text-4xl font-bold leading-tight tracking-tight",
                    "text-dark dark:text-light",
                    alignClass
                  )}
                >
                  {heading}
                </motion.h2>
              )}

              {description && (
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={descVariants}
                  className={cn(
                    "text-lg text-gray-500 dark:text-gray-400 leading-relaxed",
                    alignClass
                  )}
                >
                  {description}
                </motion.p>
              )}
            </div>
          )}

          {children}
        </Container>
      </Tag>
    );
  }
);

Section.displayName = "Section";
