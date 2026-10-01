/** At least 10 digits; spaces, dashes, brackets and a leading + are allowed. */
export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
