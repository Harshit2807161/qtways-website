import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn, formatPrice } from '../../utils';
import { useCart } from '../../hooks';
import { Button } from '../ui';

export const CartDrawer = ({ isOpen, onClose }) => {
  const {
    items,
    itemCount,
    subtotal,
    total,
    shippingCost,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-elegant z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-charcoal-700" />
                <h2 className="font-display text-xl text-charcoal-900">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-gold-500 text-white rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream-100 rounded-md transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-charcoal-600" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {itemCount > 0 && (
              <div className="px-6 py-3 bg-cream-50 border-b border-cream-200">
                {hasFreeShipping ? (
                  <p className="text-sm text-sage-600 font-medium">
                    You've unlocked free shipping!
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-charcoal-600 mb-2">
                      Add {formatPrice(remainingForFreeShipping)} more for free shipping
                    </p>
                    <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {itemCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 py-12">
                  <ShoppingBag className="w-16 h-16 text-charcoal-200 mb-4" />
                  <h3 className="font-display text-lg text-charcoal-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-charcoal-500 text-center mb-6">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <Button as={Link} to="/shop" onClick={onClose}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-cream-200">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {itemCount > 0 && (
              <div className="border-t border-cream-200 px-6 py-4 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal-500">Shipping</span>
                  <span className={hasFreeShipping ? 'text-sage-600' : 'text-charcoal-500'}>
                    {hasFreeShipping ? 'Free' : formatPrice(shippingCost)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-2 border-t border-cream-200">
                  <span className="font-medium text-charcoal-900">Total</span>
                  <span className="font-semibold text-lg text-charcoal-900">{formatPrice(total)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <Button
                    as={Link}
                    to="/checkout"
                    onClick={onClose}
                    fullWidth
                    size="lg"
                    variant="gold"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Checkout
                  </Button>
                  <Button
                    as={Link}
                    to="/cart"
                    onClick={onClose}
                    fullWidth
                    variant="secondary"
                  >
                    View Cart
                  </Button>
                </div>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-charcoal-400 hover:text-coral-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Individual Cart Item
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const imageUrl = item.images?.[0] || '/images/placeholder-product.jpg';

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex gap-4 p-4"
    >
      {/* Image */}
      <Link to={`/product/${item.slug}`} className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80';
          }}
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/product/${item.slug}`}
          className="font-medium text-charcoal-900 hover:text-gold-600 transition-colors line-clamp-2"
        >
          {item.name}
        </Link>

        <p className="text-sm text-charcoal-500 mt-0.5">
          {item.categoryName}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              className={cn(
                'w-7 h-7 flex items-center justify-center rounded-md border border-cream-200',
                'hover:bg-cream-100 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-cream-200 hover:bg-cream-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Price */}
          <p className="font-medium text-charcoal-900">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-1.5 hover:bg-cream-100 rounded-md transition-colors text-charcoal-400 hover:text-coral-500"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.li>
  );
};

export default CartDrawer;
