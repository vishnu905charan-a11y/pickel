import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import { VegNonVegBadge } from '../common/Badge';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pickle-burgundy text-pickle-cream pt-16 pb-8 border-t border-pickle-mustard/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pickle-cream/10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pickle-mustard p-1.5 flex items-center justify-center text-pickle-burgundy font-serif font-black shadow">
                PM
              </div>
              <span className="font-serif font-black text-2xl text-pickle-cream tracking-tight">
                Pickle Mart
              </span>
            </div>
            
            <p className="text-pickle-mustard text-sm italic font-medium">
              "Feel the real taste, made by Grandma."
            </p>

            <p className="text-xs text-pickle-cream/80 leading-relaxed">
              Transforming traditional recipes into a delightful digital experience. Handcrafted authentic vegetarian and non-vegetarian Indian pickles in 250g tamper-evident jars.
            </p>

            <div className="flex items-center gap-2 text-xs text-pickle-cream/70 pt-2">
              <ShieldCheck className="w-4 h-4 text-pickle-mustard shrink-0" />
              <span>Standard 250 g net weight packaging</span>
            </div>
          </div>

          {/* Col 2: Categories & Catalog */}
          <div>
            <h4 className="font-serif text-lg font-bold text-pickle-mustard mb-4">
              Explore Pickles
            </h4>
            <ul className="space-y-2.5 text-sm text-pickle-cream/80">
              <li>
                <Link
                  to="/products"
                  className="hover:text-pickle-mustard transition-colors flex items-center gap-2"
                >
                  <span>All 43 Traditional Pickles</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/veg"
                  className="hover:text-pickle-mustard transition-colors flex items-center gap-2"
                >
                  <VegNonVegBadge category="Veg Pickles" size="sm" showLabel={false} />
                  <span>Veg Pickles (22 varieties)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/non-veg"
                  className="hover:text-pickle-mustard transition-colors flex items-center gap-2"
                >
                  <VegNonVegBadge category="Non-Veg Pickles" size="sm" showLabel={false} />
                  <span>Non-Veg Pickles (21 varieties)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="hover:text-pickle-mustard transition-colors flex items-center gap-2"
                >
                  <span>Track Demo Order</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg font-bold text-pickle-mustard mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-pickle-cream/80">
              <li>
                <Link to="/" className="hover:text-pickle-mustard transition-colors">
                  Home Storefront
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-pickle-mustard transition-colors">
                  About Our Kitchen
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pickle-mustard transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-pickle-mustard transition-colors">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-pickle-mustard hover:underline font-semibold text-xs mt-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Demo Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Placeholders */}
          <div>
            <h4 className="font-serif text-lg font-bold text-pickle-mustard mb-4">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-xs text-pickle-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pickle-mustard shrink-0 mt-0.5" />
                <span>Store Address: [Configurable Demo Address, Jubilee Hills, Hyderabad, India]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pickle-mustard shrink-0" />
                <span>Phone: +91 [Configurable Business Number]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-pickle-mustard shrink-0" />
                <span>Email: contact@[configurable-domain].demo</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-pickle-mustard shrink-0" />
                <span>Hours: Mon – Sun: 9:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-pickle-red/30 border border-pickle-mustard/20 text-xs text-pickle-cream/80 leading-relaxed">
          <p className="font-semibold text-pickle-mustard mb-1">
            ⚠️ Frontend Demonstration Notice:
          </p>
          <p>
            Pickle Mart is currently operating as a frontend-only demonstration storefront built with React, TypeScript, and Tailwind CSS.
            All cart items, orders, order statuses, and administrative modifications are saved within your browser’s local storage.
            No live payment processing occurs, and no real delivery order is transmitted.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pickle-cream/60">
          <p>
            &copy; {new Date().getFullYear()} Pickle Mart. "Feel the real taste, made by Grandma." All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-pickle-mustard fill-current" /> for traditional Indian culinary heritage
          </p>
        </div>
      </div>
    </footer>
  );
};
