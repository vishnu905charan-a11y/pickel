import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowRight, Heart, ShieldCheck, ShoppingBag } from 'lucide-react';
import { VegNonVegBadge } from '../components/common/Badge';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [{ label: 'About Us' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pickle-cream via-pickle-cream/60 to-pickle-white rounded-3xl p-8 sm:p-14 border border-pickle-cream-dark relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pickle-burgundy/10 text-pickle-burgundy text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-pickle-red" />
            <span>Traditional Indian Flavors</span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl text-pickle-burgundy leading-tight">
            "Feel the real taste, made by Grandma."
          </h1>

          <p className="text-base sm:text-lg text-pickle-dark/80 font-sans leading-relaxed">
            Pickle Mart is dedicated to celebrating the authentic flavors of traditional Indian pickle recipes. Our digital storefront is designed to provide seamless browsing across 43 classic vegetarian and non-vegetarian varieties.
          </p>

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pickle-red hover:bg-pickle-burgundy text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Our Pickles</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Philosophy & Traditional Inspiration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-pickle-mustard-dark uppercase tracking-wider block">
            Our Culinary Inspiration
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-pickle-dark">
            Rooted in Tradition, Crafted with Care
          </h2>
          <p className="text-sm text-pickle-dark/80 leading-relaxed font-sans">
            In traditional Indian homes, pickle preparation is an honored art form passed down across generations. Every variety requires the exact proportion of whole and ground spices, cold-pressed oils, and fresh produce.
          </p>
          <p className="text-sm text-pickle-dark/80 leading-relaxed font-sans">
            Pickle Mart brings this rich tradition into an intuitive digital catalog where each product is prepared in small batches and packed in standard 250 g jars to ensure freshness and flavor.
          </p>
        </div>

        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
            alt="Traditional Indian pickle and spice arrangement"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Category Overview: Veg vs Non-Veg */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-serif font-black text-3xl text-pickle-burgundy">
            Our Two Specialty Categories
          </h2>
          <p className="text-xs sm:text-sm text-pickle-dark/70 mt-1">
            Carefully curated to satisfy lovers of classic vegetarian delights and hearty spiced meat and seafood pickles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Veg Category Card */}
          <div className="bg-white rounded-3xl border-2 border-pickle-green/20 p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VegNonVegBadge category="Veg Pickles" size="md" />
                <h3 className="font-serif font-bold text-xl text-pickle-green">
                  Vegetarian Pickles
                </h3>
              </div>
              <span className="bg-green-100 text-pickle-green text-xs font-bold px-3 py-1 rounded-full">
                22 Varieties
              </span>
            </div>

            <p className="text-xs sm:text-sm text-pickle-dark/80 leading-relaxed">
              Featuring Andhra Mango Avakaya, Bellam Avakaya, Coriander, Red Chilli, Gongura, Ginger, Garlic, Lemon, Tomato, and seasonal vegetable specialties.
            </p>

            <div className="pt-2">
              <Link
                to="/products/veg"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pickle-green hover:underline"
              >
                <span>Browse 22 Veg Pickles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Non-Veg Category Card */}
          <div className="bg-white rounded-3xl border-2 border-pickle-red/20 p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VegNonVegBadge category="Non-Veg Pickles" size="md" />
                <h3 className="font-serif font-bold text-xl text-pickle-red">
                  Non-Vegetarian Pickles
                </h3>
              </div>
              <span className="bg-red-100 text-pickle-red text-xs font-bold px-3 py-1 rounded-full">
                21 Varieties
              </span>
            </div>

            <p className="text-xs sm:text-sm text-pickle-dark/80 leading-relaxed">
              Featuring Boneless Chicken Pickle, Natukodi Pickle, Korameenu Fish Pickle, Crab, Prawn varieties, Mutton Kheema, and traditional Gongura non-veg combinations.
            </p>

            <div className="pt-2">
              <Link
                to="/products/non-veg"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pickle-red hover:underline"
              >
                <span>Browse 21 Non-Veg Pickles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Packaging & Standards */}
      <div className="bg-pickle-cream/40 rounded-3xl p-8 border border-pickle-cream-dark text-center space-y-3 max-w-2xl mx-auto">
        <ShieldCheck className="w-8 h-8 text-pickle-green mx-auto" />
        <h3 className="font-serif font-bold text-xl text-pickle-burgundy">
          Standard 250 g Packaging
        </h3>
        <p className="text-xs text-pickle-dark/70 leading-relaxed">
          Every pickle on our menu comes standard in a 250 g net-weight jar, sealed to preserve aroma, oil balance, and shelf stability for your dining table.
        </p>
      </div>

    </div>
  );
};
