import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(length: number, hex?: boolean): string;
export function generateId(length: number, characters?: string): string;
export function generateId(length: number, hex: boolean | string = false) {
  const CHARS =
    typeof hex === "string"
      ? hex
      : hex
        ? "0123456789abcdef"
        : "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length })
    .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
    .join("");
}
