import React, { useState } from 'react';
import type { CustomerInfo, DemoPaymentMethod } from '../../types';
import { validateCheckoutForm, type CheckoutValidationErrors } from '../../utils/validation';
import { Truck, Store, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface CheckoutFormProps {
  cartItemCount: number;
  onSubmit: (customer: CustomerInfo, paymentMethod: DemoPaymentMethod) => Promise<void> | void;
  isSubmitting?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItemCount,
  onSubmit,
  isSubmitting = false,
}) => {
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    mobileNumber: '',
    deliveryAddress: '',
    city: '',
    postalCode: '',
    orderNotes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<DemoPaymentMethod>('Cash on Delivery — Demo');
  const [errors, setErrors] = useState<CheckoutValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));

    // Real-time clearance of error if valid
    if (errors[name as keyof CheckoutValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(customer, paymentMethod, cartItemCount);

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Mark all fields as touched to display errors
      setTouched({
        fullName: true,
        mobileNumber: true,
        deliveryAddress: true,
        city: true,
        postalCode: true,
      });
      return;
    }

    setErrors({});
    onSubmit(customer, paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Section 1: Customer Contact & Delivery Info */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-5">
        <h3 className="font-serif font-bold text-xl text-pickle-burgundy pb-3 border-b border-pickle-cream-dark flex items-center justify-between">
          <span>Delivery Details</span>
          <span className="text-xs font-sans font-normal text-pickle-dark/50">All fields marked * are required</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="fullName" className="block text-xs font-semibold text-pickle-dark">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              autoComplete="name"
              placeholder="e.g. Ramesh Kumar"
              value={customer.fullName}
              onChange={handleChange}
              onBlur={() => handleBlur('fullName')}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.fullName && touched.fullName
                  ? 'border-red-500 focus:ring-red-200 bg-red-50/20'
                  : 'border-pickle-cream-dark focus:ring-pickle-red/30'
              }`}
            />
            {errors.fullName && touched.fullName && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label htmlFor="mobileNumber" className="block text-xs font-semibold text-pickle-dark">
              Mobile Number (10 Digits) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-pickle-dark/50">
                +91
              </span>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                autoComplete="tel"
                placeholder="9876543210"
                value={customer.mobileNumber}
                onChange={handleChange}
                onBlur={() => handleBlur('mobileNumber')}
                className={`w-full pl-12 pr-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.mobileNumber && touched.mobileNumber
                    ? 'border-red-500 focus:ring-red-200 bg-red-50/20'
                    : 'border-pickle-cream-dark focus:ring-pickle-red/30'
                }`}
              />
            </div>
            {errors.mobileNumber && touched.mobileNumber && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.mobileNumber}</span>
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-xs font-semibold text-pickle-dark">
              City / Locality *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              autoComplete="address-level2"
              placeholder="e.g. Hyderabad / Vijayawada"
              value={customer.city}
              onChange={handleChange}
              onBlur={() => handleBlur('city')}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.city && touched.city
                  ? 'border-red-500 focus:ring-red-200 bg-red-50/20'
                  : 'border-pickle-cream-dark focus:ring-pickle-red/30'
              }`}
            />
            {errors.city && touched.city && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* Complete Delivery Address */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="deliveryAddress" className="block text-xs font-semibold text-pickle-dark">
              Delivery Address (House/Flat No, Street, Landmark) *
            </label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              rows={2}
              autoComplete="street-address"
              placeholder="e.g. Flat 301, Sri Sai Residency, Street No 4, Banjara Hills"
              value={customer.deliveryAddress}
              onChange={handleChange}
              onBlur={() => handleBlur('deliveryAddress')}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.deliveryAddress && touched.deliveryAddress
                  ? 'border-red-500 focus:ring-red-200 bg-red-50/20'
                  : 'border-pickle-cream-dark focus:ring-pickle-red/30'
              }`}
            />
            {errors.deliveryAddress && touched.deliveryAddress && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.deliveryAddress}</span>
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-1.5">
            <label htmlFor="postalCode" className="block text-xs font-semibold text-pickle-dark">
              Postal PIN Code (6 Digits) *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              maxLength={6}
              autoComplete="postal-code"
              placeholder="500034"
              value={customer.postalCode}
              onChange={handleChange}
              onBlur={() => handleBlur('postalCode')}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.postalCode && touched.postalCode
                  ? 'border-red-500 focus:ring-red-200 bg-red-50/20'
                  : 'border-pickle-cream-dark focus:ring-pickle-red/30'
              }`}
            />
            {errors.postalCode && touched.postalCode && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.postalCode}</span>
              </p>
            )}
          </div>

          {/* Optional Order Notes */}
          <div className="space-y-1.5">
            <label htmlFor="orderNotes" className="block text-xs font-semibold text-pickle-dark">
              Order Notes (Optional)
            </label>
            <input
              type="text"
              id="orderNotes"
              name="orderNotes"
              placeholder="e.g. Leave with security, extra spicy requested"
              value={customer.orderNotes}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-pickle-cream-dark bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Demo Payment Method */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-xl text-pickle-burgundy pb-3 border-b border-pickle-cream-dark">
          Demonstration Payment Method
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Cash on Delivery - Demo */}
          <label
            className={`relative flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === 'Cash on Delivery — Demo'
                ? 'border-pickle-red bg-red-50/30 shadow-xs'
                : 'border-pickle-cream-dark hover:border-pickle-mustard/60 bg-white'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery — Demo"
              checked={paymentMethod === 'Cash on Delivery — Demo'}
              onChange={() => setPaymentMethod('Cash on Delivery — Demo')}
              className="mt-1 text-pickle-red focus:ring-pickle-red"
            />
            <div className="grow">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-pickle-red" />
                <span className="font-semibold text-sm text-pickle-dark">Cash on Delivery (Demo)</span>
              </div>
              <p className="text-xs text-pickle-dark/60 mt-1">
                Simulate standard door-step cash or UPI collection upon order arrival.
              </p>
            </div>
          </label>

          {/* Option 2: Pay at Store - Demo */}
          <label
            className={`relative flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === 'Pay at Store — Demo'
                ? 'border-pickle-red bg-red-50/30 shadow-xs'
                : 'border-pickle-cream-dark hover:border-pickle-mustard/60 bg-white'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="Pay at Store — Demo"
              checked={paymentMethod === 'Pay at Store — Demo'}
              onChange={() => setPaymentMethod('Pay at Store — Demo')}
              className="mt-1 text-pickle-red focus:ring-pickle-red"
            />
            <div className="grow">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-pickle-burgundy" />
                <span className="font-semibold text-sm text-pickle-dark">Pay at Store (Demo)</span>
              </div>
              <p className="text-xs text-pickle-dark/60 mt-1">
                Simulate self-pickup from Pickle Mart outlet with in-store payment.
              </p>
            </div>
          </label>
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      {/* Cart Validation Error if Empty */}
      {errors.cart && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.cart}</span>
        </div>
      )}

      {/* Submit Order Action */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || cartItemCount === 0}
          className="w-full py-4 px-6 bg-pickle-red hover:bg-pickle-burgundy disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Simulating Demo Order Submission...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Place Demonstration Order</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-pickle-dark/60 text-center mt-3 leading-normal">
          By placing this order, you acknowledge this is a <strong>frontend demonstration</strong>. No real payment is deducted, and no live order is sent to Pickle Mart.
        </p>
      </div>
    </form>
  );
};
