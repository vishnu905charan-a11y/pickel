import { describe, it, expect } from 'vitest';
import { validateCheckoutForm, isValidIndianMobile, isValidPinCode } from '../utils/validation';
import { generateOrderReference } from '../utils/reference';
import type { CustomerInfo } from '../types';

describe('Checkout Validation and Order Reference Generator', () => {
  const validCustomer: CustomerInfo = {
    fullName: 'Srinivasa Rao',
    mobileNumber: '9848022338',
    deliveryAddress: 'Flat 402, Sai Residency, Road No. 12',
    city: 'Hyderabad',
    postalCode: '500034',
    orderNotes: 'Deliver between 10am-2pm',
  };

  it('accepts valid 10-digit Indian mobile numbers', () => {
    expect(isValidIndianMobile('9848022338')).toBe(true);
    expect(isValidIndianMobile('8123456789')).toBe(true);
    expect(isValidIndianMobile('7012345678')).toBe(true);
    expect(isValidIndianMobile('6301234567')).toBe(true);
    expect(isValidIndianMobile('+919848022338')).toBe(true);
  });

  it('rejects invalid mobile numbers', () => {
    expect(isValidIndianMobile('12345')).toBe(false);
    expect(isValidIndianMobile('1234567890')).toBe(false); // starts with 1
    expect(isValidIndianMobile('abcdefghij')).toBe(false);
    expect(isValidIndianMobile('')).toBe(false);
  });

  it('validates 6-digit Indian PIN codes', () => {
    expect(isValidPinCode('500034')).toBe(true);
    expect(isValidPinCode('520002')).toBe(true);
    expect(isValidPinCode('110001')).toBe(true);

    expect(isValidPinCode('50003')).toBe(false); // 5 digits
    expect(isValidPinCode('5000345')).toBe(false); // 7 digits
    expect(isValidPinCode('012345')).toBe(false); // starts with 0
  });

  it('accepts valid customer info and non-empty cart', () => {
    const result = validateCheckoutForm(validCustomer, 'Cash on Delivery — Demo', 2);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('rejects submission when cart is empty', () => {
    const result = validateCheckoutForm(validCustomer, 'Cash on Delivery — Demo', 0);
    expect(result.isValid).toBe(false);
    expect(result.errors.cart).toBeDefined();
  });

  it('rejects submission with missing full name', () => {
    const customer = { ...validCustomer, fullName: '' };
    const result = validateCheckoutForm(customer, 'Cash on Delivery — Demo', 1);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
  });

  it('rejects submission with invalid mobile number', () => {
    const customer = { ...validCustomer, mobileNumber: '123' };
    const result = validateCheckoutForm(customer, 'Cash on Delivery — Demo', 1);
    expect(result.isValid).toBe(false);
    expect(result.errors.mobileNumber).toBeDefined();
  });

  it('rejects submission with missing address or city', () => {
    const customer = { ...validCustomer, deliveryAddress: '', city: '' };
    const result = validateCheckoutForm(customer, 'Cash on Delivery — Demo', 1);
    expect(result.isValid).toBe(false);
    expect(result.errors.deliveryAddress).toBeDefined();
    expect(result.errors.city).toBeDefined();
  });

  it('generates unique demo order references in the PM-YYYY-XXXX format', () => {
    const ref1 = generateOrderReference();
    const ref2 = generateOrderReference();

    expect(ref1).toMatch(/^PM-\d{4}-[A-Z0-9]+$/);
    expect(ref2).toMatch(/^PM-\d{4}-[A-Z0-9]+$/);
    expect(ref1).not.toBe(ref2);
  });
});
