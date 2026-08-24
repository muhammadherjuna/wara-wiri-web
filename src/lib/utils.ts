import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind CSS classes
 * using tailwind-merge to avoid style conflicts.
 *
 * @example
 * cn("px-4 py-2", condition && "bg-primary", "px-6")
 * // → "py-2 bg-primary px-6"  (px-4 is overridden by px-6)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
