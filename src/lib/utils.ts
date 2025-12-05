import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR')
}

export function removeCommas(str: string): string {
  return str.replace(/,/g, '')
}
