import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Heart, Sparkles, Truck, Award } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { ProductQuickViewModal } from '../components/products/ProductQuickViewModal';
import { VegNonVegBadge } from '../components/common/Badge';
import type { Product } from '../types';

export const HomePage: React.FC = () => {
  const { products, vegProducts, nonVegProducts } = useProducts();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Handpick 4 popular veg and 4 popular non-veg for the featured section
  const featuredPickles = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pickle-cream/80 via-pickle-cream/40 to-pickle-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-pickle-cream-dark">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none pattern-border" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pickle-burgundy/10 text-pickle-burgundy border border-pickle-burgundy/20 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-pickle-mustard-dark" />
                <span>Authentic Grandma Recipes &bull; 43 Varieties</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-pickle-burgundy tracking-tight leading-[1.15]">
                Traditional Taste.{' '}
                <span className="text-pickle-red block mt-1">Homemade Goodness.</span>
              </h1>

              <p className="text-base sm:text-lg text-pickle-dark/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                "Feel the real taste, made by Grandma." Explore our delicious range of traditional vegetarian and non-vegetarian pickles, prepared in small batches and packed in standard 250 g tamper-evident jars.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-3.5 bg-pickle-red hover:bg-pickle-burgundy text-white font-bold rounded-xl shadow-pickle hover:shadow-pickle-lg transition-all flex items-center justify-center gap-2.5 text-base active:scale-98"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                </Link>

                <Link
                  to="/products/veg"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-pickle-cream border-2 border-pickle-green/40 hover:border-pickle-green text-pickle-green font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  <VegNonVegBadge category="Veg Pickles" size="sm" showLabel={false} />
                  <span>Explore Veg Pickles ({vegProducts.length})</span>
                </Link>
              </div>

              {/* Highlights strip */}
              <div className="pt-6 border-t border-pickle-cream-dark/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="font-serif font-bold text-2xl text-pickle-burgundy">43</span>
                  <p className="text-xs text-pickle-dark/60 font-medium">Unique Varieties</p>
                </div>
                <div>
                  <span className="font-serif font-bold text-2xl text-pickle-green">22</span>
                  <p className="text-xs text-pickle-dark/60 font-medium">Vegetarian Pickles</p>
                </div>
                <div>
                  <span className="font-serif font-bold text-2xl text-pickle-red">{nonVegProducts.length}</span>
                  <p className="text-xs text-pickle-dark/60 font-medium">Non-Veg Delicacies</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visuals */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                  alt="Traditional Indian pickle in ceramic bowl with red chillies and whole spices"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-pickle-cream-dark">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-pickle-mustard-dark uppercase tracking-wider block">
                        Signature Specialty
                      </span>
                      <span className="font-serif font-bold text-base text-pickle-dark">
                        Mango Avakaya Pickle
                      </span>
                    </div>
                    <span className="font-serif font-black text-xl text-pickle-red">
                      ₹150
                    </span>
                  </div>
                  <span className="text-[11px] text-pickle-dark/60 block mt-1">
                    Standard net wt: 250 grams &bull; Cold-pressed sesame oil
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
            Our Traditional Pickle Collections
          </h2>
          <p className="text-sm text-pickle-dark/70 mt-2">
            Every recipe is prepared with time-honored Indian spice blends and packaged in standard 250 g jars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Veg Category Card */}
          <Link
            to="/products/veg"
            className="group relative rounded-3xl overflow-hidden shadow-pickle hover:shadow-pickle-lg transition-all border-2 border-pickle-green/20 hover:border-pickle-green flex flex-col justify-between min-h-[320px] p-8 bg-gradient-to-br from-green-900/90 to-green-950 text-white"
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Vegetarian pickles assortment"
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                <VegNonVegBadge category="Veg Pickles" size="sm" showLabel={true} />
              </div>
              <h3 className="font-serif font-black text-3xl text-white">
                Vegetarian Pickles
              </h3>
              <p className="text-sm text-white/80 max-w-sm">
                From Andhra Mango Avakaya and Bellam Avakaya to Gongura, Lemon, Garlic, and Tomato. 22 authentic varieties.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/20">
              <span className="text-sm font-bold text-pickle-mustard">
                22 Handcrafted Varieties &bull; From ₹140
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-pickle-green font-bold text-xs group-hover:bg-pickle-mustard group-hover:text-pickle-burgundy transition-colors">
                <span>Browse Veg</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Non-Veg Category Card */}
          <Link
            to="/products/non-veg"
            className="group relative rounded-3xl overflow-hidden shadow-pickle hover:shadow-pickle-lg transition-all border-2 border-pickle-red/20 hover:border-pickle-red flex flex-col justify-between min-h-[320px] p-8 bg-gradient-to-br from-pickle-burgundy to-[#3A0D14] text-white"
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
                alt="Non-veg pickles assortment"
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                <VegNonVegBadge category="Non-Veg Pickles" size="sm" showLabel={true} />
              </div>
              <h3 className="font-serif font-black text-3xl text-white">
                Non-Vegetarian Pickles
              </h3>
              <p className="text-sm text-white/80 max-w-sm">
                Spicy chicken, natukodi, boneless mutton, prawns, crab, and authentic coastal fish pickles steeped in deep aromatics.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/20">
              <span className="text-sm font-bold text-pickle-mustard">
                21 Delicacies &bull; From ₹250
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-pickle-red font-bold text-xs group-hover:bg-pickle-mustard group-hover:text-pickle-burgundy transition-colors">
                <span>Browse Non-Veg</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-pickle-mustard-dark uppercase tracking-wider block">
              Handpicked Favorites
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-pickle-burgundy">
              Customer Favorites
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-pickle-red hover:text-pickle-burgundy flex items-center gap-1.5 underline"
          >
            <span>View All 43 Pickles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredPickles.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY SHOP WITH PICKLE MART (Neutral Shopping Features) */}
      <section className="bg-pickle-cream/60 py-16 border-y border-pickle-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif font-black text-3xl text-pickle-burgundy">
              Why Shop With Pickle Mart?
            </h2>
            <p className="text-sm text-pickle-dark/70 mt-2">
              Traditional recipes, transparent pricing, and careful packaging for every jar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-pickle-cream-dark text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-pickle-cream flex items-center justify-center text-pickle-red mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-pickle-burgundy">
                Grandma's Recipes
              </h3>
              <p className="text-xs text-pickle-dark/70 leading-relaxed">
                Made according to time-tested homemade culinary methods with traditional spices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-pickle-cream-dark text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-pickle-cream flex items-center justify-center text-pickle-green mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-pickle-burgundy">
                250 g Standard Jars
              </h3>
              <p className="text-xs text-pickle-dark/70 leading-relaxed">
                Every pickle variety comes in a convenient, vacuum-sealed 250-gram jar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-pickle-cream-dark text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-pickle-cream flex items-center justify-center text-pickle-mustard-dark mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-pickle-burgundy">
                43 Diverse Varieties
              </h3>
              <p className="text-xs text-pickle-dark/70 leading-relaxed">
                Comprehensive selection covering seasonal vegetables, gongura, chicken, and seafood.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-pickle-cream-dark text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-pickle-cream flex items-center justify-center text-pickle-red mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-pickle-burgundy">
                Demo Order Tracking
              </h3>
              <p className="text-xs text-pickle-dark/70 leading-relaxed">
                Simulated step-by-step order tracking from kitchen preparation to final delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIMPLE 3-STEP ORDERING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-pickle-mustard-dark uppercase tracking-wider block">
            Easy Online Experience
          </span>
          <h2 className="font-serif font-black text-3xl text-pickle-burgundy">
            How It Works in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl border border-pickle-cream-dark text-center space-y-4 shadow-xs relative">
            <div className="w-10 h-10 rounded-full bg-pickle-burgundy text-pickle-cream font-serif font-bold text-lg flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-serif font-bold text-lg text-pickle-dark">
              Choose Your Pickles
            </h3>
            <p className="text-xs text-pickle-dark/70 leading-relaxed">
              Explore our 43 vegetarian and non-vegetarian pickles. Filter by category, price, or search for your favorite flavor.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl border border-pickle-cream-dark text-center space-y-4 shadow-xs relative">
            <div className="w-10 h-10 rounded-full bg-pickle-burgundy text-pickle-cream font-serif font-bold text-lg flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-serif font-bold text-lg text-pickle-dark">
              Review & Quick Checkout
            </h3>
            <p className="text-xs text-pickle-dark/70 leading-relaxed">
              Adjust quantities in your cart, enter your delivery address, and choose a demonstration payment method.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl border border-pickle-cream-dark text-center space-y-4 shadow-xs relative">
            <div className="w-10 h-10 rounded-full bg-pickle-burgundy text-pickle-cream font-serif font-bold text-lg flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-serif font-bold text-lg text-pickle-dark">
              Track Your Demo Order
            </h3>
            <p className="text-xs text-pickle-dark/70 leading-relaxed">
              Receive your unique demo order reference and observe simulated live preparation and dispatch status updates.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BRAND INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pickle-cream to-pickle-white rounded-3xl border border-pickle-cream-dark p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-pickle-red uppercase tracking-wider block">
              About Pickle Mart
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-pickle-burgundy">
              "Feel the real taste, made by Grandma."
            </h2>
            <p className="text-sm text-pickle-dark/80 leading-relaxed font-sans">
              Indian pickles are an essential part of our dining tradition. At Pickle Mart, our mission is to make authentic homemade flavors accessible through a clean, intuitive modern storefront. We present 22 vegetarian varieties and 21 non-vegetarian specialties made in traditional 250 g sizes.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pickle-burgundy hover:text-pickle-red underline"
              >
                <span>Read more about our philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                alt="Traditional Indian spice bowl"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL SHOPPING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-pickle-burgundy rounded-3xl p-10 sm:p-14 text-pickle-cream space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pickle-red/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pickle-mustard/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pickle-cream">
              Ready to Taste the Authentic Flavor?
            </h2>
            <p className="text-sm text-pickle-cream/80">
              Browse our complete catalog of 43 vegetarian and non-vegetarian pickles.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="px-8 py-3.5 bg-pickle-mustard hover:bg-pickle-mustard-dark text-pickle-burgundy font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                Browse All 43 Pickles
              </Link>
              <Link
                to="/track-order"
                className="px-6 py-3.5 bg-pickle-cream/10 hover:bg-pickle-cream/20 text-pickle-cream font-semibold text-sm rounded-xl border border-pickle-cream/30 transition-all"
              >
                Track a Demo Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
};
