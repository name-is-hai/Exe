import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const numberFormat = (value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export const setLSData = (key, value) => {
  typeof value === 'object'
    ? window.localStorage.setItem(key, JSON.stringify(value))
    : window.localStorage.setItem(key, value);
}

export const getLSData = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key) || '{}')
  } catch {
    return window.localStorage.getItem(key)
  }
}