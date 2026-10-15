import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VegNonVegBadge } from '../components/common/Badge';
import { QuantitySelector } from '../components/products/QuantitySelector';
import { ProductCard } from '../components/products/ProductCard';
import { ShoppingBag, Check, ShieldCheck, Heart, Sparkles, ArrowLeft } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, getProductBySlug } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif font-black text-3xl text-pickle-burgundy">
          Pickle Not Found
        </h1>
        <p className="text-pickle-dark/70 text-sm max-w-md mx-auto">
          We couldn't locate the pickle variety you requested. It might have been updated or removed.
        </p>
        <div className="pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pickle-red text-white hover:bg-pickle-burgundy text-sm font-semibold transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All 43 Pickles</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const isVeg = product.category === 'Veg Pickles';

  // Find 4 related products from the same category (excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryHref = isVeg ? '/products/veg' : '/products/non-veg';

  const breadcrumbs = [
    { label: isVeg ? 'Veg Pickles' : 'Non-Veg Pickles', href: categoryHref },
    { label: product.name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Product Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-pickle-cream/40 border-2 border-pickle-cream-dark shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Top Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs">
              <VegNonVegBadge category={product.category} size="md" showLabel={true} />
            </div>

            {/* Standard 250 g badge */}
            <div className="absolute bottom-4 right-4 bg-pickle-burgundy/90 text-pickle-cream text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Net Wt: {product.packageSize}
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-pickle-mustard-dark uppercase tracking-wider">
                {isVeg ? 'Traditional Veg Specialty' : 'Spiced Non-Veg Delicacy'}
              </span>
              <span className="text-pickle-dark/40">&bull;</span>
              <span className="text-xs text-pickle-dark/60 font-medium">Standard 250 g pack</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-dark leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-pickle-dark/60">
                per 250 g jar &bull; Inclusive of all taxes
              </span>
            </div>
          </div>

          {/* Availability Box */}
          <div className="py-2">
            {!product.isAvailable ? (
              <div className="inline-block p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase">
                Currently Out of Stock
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 border border-pickle-green/20 text-pickle-green text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-pickle-green animate-pulse" />
                <span>In Stock & Ready for Packaging</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm text-pickle-dark/80 space-y-2 border-t border-pickle-cream-dark/60 pt-4">
            <p className="text-sm leading-relaxed">
              Handcrafted in small batches inspired by Grandma's traditional cooking heritage. Prepared using cold-pressed oils, freshly roasted whole spices, and sealed immediately to lock in authentic flavor and crisp texture.
            </p>
          </div>

          {/* Package details bullet list */}
          <div className="bg-pickle-cream/40 rounded-2xl p-4 border border-pickle-cream-dark space-y-2 text-xs text-pickle-dark/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-pickle-green shrink-0" />
              <span><strong>Net Quantity:</strong> 250 grams per container</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pickle-mustard-dark shrink-0" />
              <span><strong>Category:</strong> {product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pickle-red shrink-0" />
              <span><strong>Recipe:</strong> Traditional Grandma's time-honored blend</span>
            </div>
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="space-y-4 pt-4 border-t border-pickle-cream-dark">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-pickle-dark uppercase tracking-wider">
                Select Quantity:
              </span>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                size="lg"
                ariaLabel={`Quantity of ${product.name}`}
              />
              <span className="text-xs text-pickle-dark/60 font-medium">
                Total: <strong className="text-pickle-burgundy font-serif text-sm">{formatINR(product.price * quantity)}</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.isAvailable || isAdded}
                className={`grow py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-98 cursor-pointer ${
                  !product.isAvailable
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-pickle-red hover:bg-pickle-burgundy text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added {quantity > 1 ? `${quantity} jars` : '1 jar'} to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Shopping Cart &bull; {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="py-4 px-6 rounded-xl font-bold text-sm bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy text-center transition-colors border border-pickle-cream-dark"
              >
                View Cart
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-pickle-cream-dark space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif font-black text-2xl text-pickle-burgundy">
              More in {product.category}
            </h2>
            <Link
              to={categoryHref}
              className="text-xs font-bold text-pickle-red hover:underline"
            >
              View all in {product.category} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
