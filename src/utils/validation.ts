import type { CustomerInfo, DemoPaymentMethod } from '../types';

export interface CheckoutValidationErrors {
  fullName?: string;
  mobileNumber?: string;
  deliveryAddress?: string;
  city?: string;
  postalCode?: string;
  paymentMethod?: string;
  cart?: string;
}

/**
 * Validates Indian 10-digit mobile number.
 * Can accept optional "+91" or "0" prefix, followed by [6-9] and 9 digits.
 */
export function isValidIndianMobile(mobile: string): boolean {
  const cleaned = mobile.trim().replace(/[\s-]/g, '');
  // Match standard 10 digit Indian mobile: ^(\+91|0)?[6-9]\d{9}$
  return /^(\+91|0)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validates 6-digit Indian PIN code.
 */
export function isValidPinCode(pincode: string): boolean {
  const cleaned = pincode.trim();
  return /^[1-9][0-9]{5}$/.test(cleaned);
}

/**
 * Validates the checkout form fields and cart contents.
 */
export function validateCheckoutForm(
  customer: CustomerInfo,
  paymentMethod: DemoPaymentMethod | '',
  cartItemCount: number
): { isValid: boolean; errors: CheckoutValidationErrors } {
  const errors: CheckoutValidationErrors = {};

  if (!customer.fullName || customer.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!customer.mobileNumber || !isValidIndianMobile(customer.mobileNumber)) {
    errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
  }

  if (!customer.deliveryAddress || customer.deliveryAddress.trim().length < 5) {
    errors.deliveryAddress = 'Please enter a complete delivery address (door no, street, area).';
  }

  if (!customer.city || customer.city.trim().length < 2) {
    errors.city = 'Please enter your city or town.';
  }

  if (!customer.postalCode || !isValidPinCode(customer.postalCode)) {
    errors.postalCode = 'Please enter a valid 6-digit Indian postal PIN code.';
  }

  if (!paymentMethod) {
    errors.paymentMethod = 'Please select a demonstration payment method.';
  }

  if (cartItemCount <= 0) {
    errors.cart = 'Your shopping cart is empty. Add products before checking out.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates contact form submission
 */
export function validateContactForm(data: { name: string; contact: string; message: string }): {
  isValid: boolean;
  errors: { name?: string; contact?: string; message?: string };
} {
  const errors: { name?: string; contact?: string; message?: string } = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!data.contact || data.contact.trim().length < 5) {
    errors.contact = 'Please enter a valid phone number or email address.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
