import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCw,
  Tag,
  X,
} from 'lucide-react';
import { cn, formatPrice } from '../utils';
import { useCart } from '../hooks';
import { Button } from '../components/ui';

export const CartPage = () => {
  const {
    items,
    itemCount,
    subtotal,
    total,
    totalSavings,
    shippingCost,
    freeShippingThreshold,
    isEmpty,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    // Placeholder promo code logic
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied({ code: 'WELCOME10', discount: 10, type: 'percent' });
      setPromoError('');
    } else if (promoCode.trim()) {
      setPromoError('Invalid promo code');
      setPromoApplied(null);
    }
  };

  const removePromo = () => {
    setPromoApplied(null);
    setPromoCode('');
    setPromoError('');
  };

  // Calculate discount from promo
  const promoDiscount = promoApplied
    ? promoApplied.type === 'percent'
      ? (subtotal * promoApplied.discount) / 100
      : promoApplied.discount
    : 0;

  const finalTotal = total - promoDiscount;

  // Empty cart state
  if (isEmpty) {
    return (
      <div className="bg-cream-50 min-h-screen">
        <div className="container-custom section-padding">
          <div className="max-w-md mx-auto text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 mx-auto mb-6 bg-cream-100 rounded-full flex items-center justify-center"
            >
              <ShoppingBag className="w-12 h-12 text-charcoal-300" />
            </motion.div>
            <h1 className="font-display text-3xl text-charcoal-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-charcoal-600 mb-8">
              Looks like you haven't added anything to your cart yet.
              Start exploring our collection!
            </p>
            <Button as={Link} to="/shop" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-charcoal-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Free Shipping Progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-white rounded-lg shadow-soft"
        >
          {hasFreeShipping ? (
            <div className="flex items-center gap-3 text-sage-600">
              <Truck className="w-5 h-5" />
              <span className="font-medium">You've unlocked free shipping!</span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-charcoal-600">
                  Add <span className="font-semibold text-charcoal-900">{formatPrice(remainingForFreeShipping)}</span> more for free shipping
                </span>
                <span className="text-sm text-charcoal-500">
                  {formatPrice(subtotal)} / {formatPrice(freeShippingThreshold)}
                </span>
              </div>
              <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full"
                />
              </div>
            </>
          )}
        </motion.div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 mb-8 lg:mb-0">
            {/* Header Row */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-charcoal-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items List */}
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </AnimatePresence>

            {/* Cart Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream-200">
              <Button
                as={Link}
                to="/shop"
                variant="link"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Continue Shopping
              </Button>
              <button
                onClick={clearCart}
                className="text-sm text-charcoal-500 hover:text-coral-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
              <h2 className="font-display text-xl text-charcoal-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <form onSubmit={handleApplyPromo} className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Promo Code
                </label>
                {promoApplied ? (
                  <div className="flex items-center justify-between p-3 bg-sage-50 rounded-lg border border-sage-200">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-sage-600" />
                      <span className="font-medium text-sage-700">{promoApplied.code}</span>
                      <span className="text-sm text-sage-600">(-{promoApplied.discount}%)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="p-1 hover:bg-sage-100 rounded transition-colors"
                      aria-label="Remove promo code"
                    >
                      <X className="w-4 h-4 text-sage-600" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Apply
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-sm text-coral-500 mt-1">{promoError}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-sage-600">
                    <span>Product Savings</span>
                    <span>-{formatPrice(totalSavings)}</span>
                  </div>
                )}

                {promoApplied && (
                  <div className="flex justify-between text-sage-600">
                    <span>Promo Discount</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className={cn(
                    'font-medium',
                    hasFreeShipping ? 'text-sage-600' : 'text-charcoal-900'
                  )}>
                    {hasFreeShipping ? 'Free' : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="pt-3 border-t border-cream-200 flex justify-between">
                  <span className="font-medium text-charcoal-900">Total</span>
                  <span className="text-xl font-bold text-charcoal-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                as={Link}
                to="/checkout"
                fullWidth
                size="lg"
                variant="gold"
                className="mt-6"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-cream-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-5 h-5 text-sage-500" />
                    <span className="text-xs text-charcoal-500">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-5 h-5 text-sage-500" />
                    <span className="text-xs text-charcoal-500">Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-5 h-5 text-sage-500" />
                    <span className="text-xs text-charcoal-500">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Row Component
const CartItemRow = ({ item, onUpdateQuantity, onRemove }) => {
  const imageUrl = item.images?.[0] || '/images/placeholder-product.jpg';
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const itemTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-lg shadow-soft p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
    >
      {/* Product Info */}
      <div className="flex gap-4 md:col-span-6">
        <Link to={`/product/${item.slug}`} className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80';
            }}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to={`/product/${item.slug}`}
            className="font-medium text-charcoal-900 hover:text-gold-600 transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          <p className="text-sm text-charcoal-500 mt-1">{item.categoryName}</p>

          {/* Mobile Price */}
          <div className="mt-2 md:hidden">
            <span className="font-semibold text-charcoal-900">{formatPrice(item.price)}</span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-charcoal-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Price */}
      <div className="hidden md:block md:col-span-2 text-center">
        <span className="font-medium text-charcoal-900">{formatPrice(item.price)}</span>
        {hasDiscount && (
          <p className="text-sm text-charcoal-400 line-through">
            {formatPrice(item.originalPrice)}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between mt-4 md:mt-0 md:col-span-2 md:justify-center">
        <div className="flex items-center gap-1 border border-cream-200 rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-l-lg',
              'hover:bg-cream-100 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-r-lg hover:bg-cream-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="md:hidden p-2 hover:bg-cream-100 rounded-md transition-colors text-charcoal-400 hover:text-coral-500"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Total & Remove */}
      <div className="hidden md:flex md:col-span-2 md:items-center md:justify-end md:gap-3">
        <span className="font-semibold text-charcoal-900">{formatPrice(itemTotal)}</span>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 hover:bg-cream-100 rounded-md transition-colors text-charcoal-400 hover:text-coral-500"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartPage;
