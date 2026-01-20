import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Check,
  ChevronRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { cn, formatPrice } from '../utils';
import { useCart } from '../hooks';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { siteConfig } from '../data';

// Checkout steps
const STEPS = [
  { id: 'login', label: 'Account', icon: Lock },
  { id: 'shipping', label: 'Shipping', icon: MapPin },
  { id: 'review', label: 'Review', icon: ShoppingBag },
];

// Indian states for dropdown
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const {
    items,
    itemCount,
    subtotal,
    total,
    shippingCost,
    freeShippingThreshold,
    isEmpty,
    clearCart,
  } = useCart();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    saveAddress: true,
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  // Determine current step based on auth status
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        // Skip login step if authenticated
        if (currentStep === 0) {
          setCurrentStep(1);
        }
        // Pre-fill phone from user
        if (user?.phone && !shippingAddress.phone) {
          setShippingAddress(prev => ({ ...prev, phone: user.phone }));
        }
      } else {
        setCurrentStep(0);
      }
    }
  }, [isAuthenticated, authLoading, user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!authLoading && isEmpty) {
      navigate('/cart');
    }
  }, [isEmpty, authLoading, navigate]);

  const hasFreeShipping = subtotal >= freeShippingThreshold;

  // Validate shipping form
  const validateShippingForm = () => {
    const errors = {};

    if (!shippingAddress.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!shippingAddress.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(shippingAddress.phone.replace(/\s/g, ''))) {
      errors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!shippingAddress.addressLine1.trim()) {
      errors.addressLine1 = 'Address is required';
    }

    if (!shippingAddress.city.trim()) {
      errors.city = 'City is required';
    }

    if (!shippingAddress.state) {
      errors.state = 'State is required';
    }

    if (!shippingAddress.pincode.trim()) {
      errors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      errors.pincode = 'Enter a valid 6-digit PIN code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep === 1) {
      // Validate shipping form before proceeding
      if (!validateShippingForm()) {
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  // Handle back
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, isAuthenticated ? 1 : 0));
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // Generate order ID (mock)
      const orderId = `QTW${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      // Create order object
      const order = {
        id: orderId,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0],
        })),
        shippingAddress,
        subtotal,
        shippingCost,
        total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Store order in localStorage (mock)
      const existingOrders = JSON.parse(localStorage.getItem('qtways_orders') || '[]');
      localStorage.setItem('qtways_orders', JSON.stringify([order, ...existingOrders]));

      // Clear cart
      clearCart();

      // Navigate to confirmation page
      navigate(`/order-confirmation/${orderId}`, { state: { order } });

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Order error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-custom section-padding">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-charcoal-600 hover:text-gold-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal-900">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center md:justify-start">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isDisabled = !isAuthenticated && index > 0;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                      isActive && 'bg-gold-500 text-white',
                      isCompleted && 'bg-sage-500 text-white',
                      !isActive && !isCompleted && 'bg-cream-200 text-charcoal-500',
                      isDisabled && 'opacity-50'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    <span className="hidden md:inline font-medium">{step.label}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <ChevronRight className="w-5 h-5 mx-2 text-charcoal-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <AnimatePresence mode="wait">
              {/* Step 0: Login */}
              {currentStep === 0 && !isAuthenticated && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-lg shadow-soft p-6"
                >
                  <h2 className="font-display text-xl text-charcoal-900 mb-4">
                    Login to Continue
                  </h2>
                  <p className="text-charcoal-600 mb-6">
                    Please login or create an account to complete your purchase.
                    This helps us keep track of your order and delivery.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        // Trigger login modal from App.jsx
                        const event = new CustomEvent('openLogin');
                        window.dispatchEvent(event);
                      }}
                      size="lg"
                      className="flex-1"
                    >
                      Login with Phone
                    </Button>
                    <Link to="/shop" className="flex-1">
                      <Button variant="secondary" size="lg" fullWidth>
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-cream-200">
                    <div className="flex items-center gap-3 text-charcoal-600">
                      <ShieldCheck className="w-5 h-5 text-sage-500" />
                      <span className="text-sm">
                        Your information is secure and never shared
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-lg shadow-soft p-6"
                >
                  <h2 className="font-display text-xl text-charcoal-900 mb-6">
                    Shipping Address
                  </h2>

                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingAddress.fullName}
                        onChange={handleInputChange}
                        className={cn(
                          'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
                          formErrors.fullName ? 'border-coral-500' : 'border-cream-200'
                        )}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullName && (
                        <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-cream-200 rounded-l-lg bg-cream-50 text-charcoal-500 text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleInputChange}
                          className={cn(
                            'flex-1 px-4 py-2.5 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
                            formErrors.phone ? 'border-coral-500' : 'border-cream-200'
                          )}
                          placeholder="10-digit phone number"
                          maxLength="10"
                        />
                      </div>
                      {formErrors.phone && (
                        <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleInputChange}
                        className={cn(
                          'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
                          formErrors.addressLine1 ? 'border-coral-500' : 'border-cream-200'
                        )}
                        placeholder="House/Flat No., Building Name, Street"
                      />
                      {formErrors.addressLine1 && (
                        <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.addressLine1}</p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Landmark, Area"
                      />
                    </div>

                    {/* City, State, Pincode */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleInputChange}
                          className={cn(
                            'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
                            formErrors.city ? 'border-coral-500' : 'border-cream-200'
                          )}
                          placeholder="City"
                        />
                        {formErrors.city && (
                          <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-1">
                          State *
                        </label>
                        <select
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleInputChange}
                          className={cn(
                            'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white',
                            formErrors.state ? 'border-coral-500' : 'border-cream-200'
                          )}
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {formErrors.state && (
                          <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={shippingAddress.pincode}
                          onChange={handleInputChange}
                          className={cn(
                            'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent',
                            formErrors.pincode ? 'border-coral-500' : 'border-cream-200'
                          )}
                          placeholder="6-digit PIN"
                          maxLength="6"
                        />
                        {formErrors.pincode && (
                          <p role="alert" className="text-sm text-coral-500 mt-1">{formErrors.pincode}</p>
                        )}
                      </div>
                    </div>

                    {/* Save Address */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="saveAddress"
                        name="saveAddress"
                        checked={shippingAddress.saveAddress}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-cream-300 text-gold-500 focus:ring-gold-500"
                      />
                      <label htmlFor="saveAddress" className="text-sm text-charcoal-600">
                        Save this address for future orders
                      </label>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-end pt-4">
                      <Button type="submit" size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
                        Continue to Review
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Review Order */}
              {currentStep === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Shipping Address Summary */}
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-xl text-charcoal-900">
                        Shipping Address
                      </h2>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-charcoal-600">
                      <p className="font-medium text-charcoal-900">{shippingAddress.fullName}</p>
                      <p>{shippingAddress.addressLine1}</p>
                      {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                      <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                      <p className="mt-1">Phone: +91 {shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white rounded-lg shadow-soft p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-xl text-charcoal-900">
                        Order Items ({itemCount})
                      </h2>
                      <Link
                        to="/cart"
                        className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                      >
                        Edit Cart
                      </Link>
                    </div>
                    <ul className="divide-y divide-cream-200">
                      {items.map(item => (
                        <li key={item.id} className="py-4 flex gap-4">
                          <img
                            src={item.images?.[0] || '/images/placeholder-product.jpg'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80';
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-charcoal-900">{item.name}</p>
                            <p className="text-sm text-charcoal-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-charcoal-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Payment Note */}
                  <div className="bg-cream-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-charcoal-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal-900">Cash on Delivery</p>
                        <p className="text-sm text-charcoal-600">
                          Pay when you receive your order. No advance payment required.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-coral-50 border border-coral-200 rounded-lg p-4 flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-coral-500" />
                      <p className="text-coral-700">{error}</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button variant="secondary" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      size="lg"
                      variant="gold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
              <h2 className="font-display text-xl text-charcoal-900 mb-6">
                Order Summary
              </h2>

              {/* Items Preview */}
              <div className="space-y-3 mb-6">
                {items.slice(0, 3).map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.images?.[0] || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-sm text-charcoal-500">
                    +{items.length - 3} more items
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-cream-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className={hasFreeShipping ? 'text-sage-600' : 'text-charcoal-900'}>
                    {hasFreeShipping ? 'Free' : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-cream-200">
                  <span className="font-medium text-charcoal-900">Total</span>
                  <span className="text-xl font-bold text-charcoal-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-cream-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-charcoal-600">
                  <Truck className="w-5 h-5 text-sage-500" />
                  <span>Free shipping on orders over {formatPrice(freeShippingThreshold)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal-600">
                  <ShieldCheck className="w-5 h-5 text-sage-500" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
