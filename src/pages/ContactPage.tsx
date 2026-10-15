import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { validateContactForm } from '../utils/validation';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbs = [{ label: 'Contact Us' }];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="border-b border-pickle-cream-dark pb-6">
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
          Contact Pickle Mart
        </h1>
        <p className="text-sm text-pickle-dark/70 mt-2 font-sans max-w-2xl">
          Have an inquiry regarding our traditional pickles, packaging, or bulk demonstration orders? Reach out via our mock inquiry form or through our business contact channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Channels & Placeholders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-pickle-cream-dark p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-xl text-pickle-burgundy">
              Store &amp; Office Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-pickle-dark/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pickle-cream flex items-center justify-center text-pickle-red shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-pickle-dark">Outlet &amp; Kitchen Address</strong>
                  <span className="text-pickle-dark/70">
                    [Configurable Address: Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033]
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pickle-cream flex items-center justify-center text-pickle-red shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-pickle-dark">Customer Support Phone</strong>
                  <span className="text-pickle-dark/70">
                    +91 [Configurable Business Phone Number]
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pickle-cream flex items-center justify-center text-pickle-green shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-pickle-dark">WhatsApp Ordering (Demo)</strong>
                  <span className="text-pickle-dark/70">
                    +91 [Configurable Business WhatsApp]
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pickle-cream flex items-center justify-center text-pickle-red shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-pickle-dark">Email Inquiries</strong>
                  <span className="text-pickle-dark/70">
                    support@[configurable-domain].demo
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pickle-cream flex items-center justify-center text-pickle-mustard-dark shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-pickle-dark">Operating Hours</strong>
                  <span className="text-pickle-dark/70">
                    Monday &ndash; Sunday: 9:00 AM &ndash; 9:00 PM IST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Honest Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Demo Notice:</strong> All contact details above are configurable demonstration placeholders. The contact form simulates client-side validation and feedback without transmitting data to a real email server.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Demo Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-pickle-cream-dark p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif font-bold text-xl text-pickle-burgundy mb-2">
            Send an Inquiry (Frontend Demonstration)
          </h3>
          <p className="text-xs text-pickle-dark/60 mb-6">
            Feel free to test client-side validation and submission feedback.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-emerald-900">
                Inquiry Simulated Successfully
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>! Your demo message was validated locally.
                <br />
                <em>(Notice: In this frontend demo environment, no email was sent to Pickle Mart.)</em>
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', contact: '', message: '' });
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800"
                >
                  Send Another Demo Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1">
                <label htmlFor="contact-name" className="block text-xs font-semibold text-pickle-dark">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="e.g. Ananya Rao"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-500 ring-red-200' : 'border-pickle-cream-dark focus:ring-pickle-red/30'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-info" className="block text-xs font-semibold text-pickle-dark">
                  Phone Number or Email Address *
                </label>
                <input
                  type="text"
                  id="contact-info"
                  name="contact"
                  placeholder="e.g. 9876543210 or name@example.com"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.contact ? 'border-red-500 ring-red-200' : 'border-pickle-cream-dark focus:ring-pickle-red/30'
                  }`}
                />
                {errors.contact && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contact}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-pickle-dark">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us what you'd like to know about our pickle varieties or bulk packaging..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.message ? 'border-red-500 ring-red-200' : 'border-pickle-cream-dark focus:ring-pickle-red/30'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-pickle-red hover:bg-pickle-burgundy text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Validating Demo Message...' : 'Submit Demo Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
