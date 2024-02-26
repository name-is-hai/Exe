import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const numberCurrencyFormat = (value: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export const setLSData = (key, value) => {
  typeof value === 'string'
    ? window.localStorage.setItem(key, value)
    : window.localStorage.setItem(key, JSON.stringify(value));
}

export const getLSData = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch {
    return window.localStorage.getItem(key)
  }
}

export const removeLSData = (key) => {
  window.localStorage.removeItem(key)
}