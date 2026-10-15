/**
 * Generates a unique, human-readable demo order reference.
 * Example format: PM-2026-8374
 */
export function generateOrderReference(): string {
  const year = new Date().getFullYear();
  const randomAlphaNum = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `PM-${year}-${randomAlphaNum}${randomDigits}`;
}
