/**
 * Format a number into Indian Rupee format (e.g. ₹150, ₹1,250)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate total price for a product line
 */
export function calculateLineTotal(unitPrice: number, quantity: number): number {
  return Math.max(0, unitPrice) * Math.max(1, quantity);
}
