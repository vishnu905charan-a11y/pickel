/**
 * Converts a product name into a clean, URL-safe slug.
 * e.g. "Mango Avakaya Pickle" -> "mango-avakaya-pickle"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
