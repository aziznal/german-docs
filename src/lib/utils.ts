import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns given array with no duplicate elements
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function isRootLink(pathname?: string): boolean {
  if (!pathname) return false;

  return pathname.startsWith("/");
}
