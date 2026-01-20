import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { formatPrice } from '../utils';
import { Button } from '../components/ui';
import { siteConfig } from '../data';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order || null);
  const [copied, setCopied] = useState(false);

  // Load order from localStorage if not in state
  useEffect(() => {
    if (!order && orderId) {
      const orders = JSON.parse(localStorage.getItem('qtways_orders') || '[]');
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate('/');
      }
    }
  }, [order, orderId, navigate]);

  // Copy order ID
  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order?.id || orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate WhatsApp message
  const getWhatsAppMessage = () => {
    if (!order) return '';

    const itemsList = order.items
      .map(item => `- ${item.name} (x${item.quantity}): ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = `Hi! I just placed an order on QTWAYS.\n\n` +
      `Order ID: ${order.id}\n\n` +
      `Items:\n${itemsList}\n\n` +
      `Total: ${formatPrice(order.total)}\n\n` +
      `Shipping to:\n${order.shippingAddress.fullName}\n` +
      `${order.shippingAddress.addressLine1}\n` +
      `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}\n\n` +
      `Please confirm my order. Thank you!`;

    return encodeURIComponent(message);
  };

  if (!order) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-custom section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-sage-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-charcoal-600">
              Thank you for your order. We'll send you a confirmation shortly.
            </p>
          </motion.div>

          {/* Order ID Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-soft p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-500 mb-1">Order ID</p>
                <p className="font-mono text-lg font-semibold text-charcoal-900">
                  {order.id}
                </p>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal-600 hover:text-gold-600 hover:bg-cream-50 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-sage-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-soft p-6 mb-6"
          >
            <h2 className="font-display text-lg text-charcoal-900 mb-4">
              What's Next?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 w-0.5 bg-sage-500 my-1" />
                </div>
                <div className="pb-4">
                  <p className="font-medium text-charcoal-900">Order Placed</p>
                  <p className="text-sm text-charcoal-500">
                    {new Date(order.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                    <Package className="w-4 h-4 text-charcoal-500" />
                  </div>
                  <div className="flex-1 w-0.5 bg-cream-200 my-1" />
                </div>
                <div className="pb-4">
                  <p className="font-medium text-charcoal-600">Processing</p>
                  <p className="text-sm text-charcoal-500">
                    We're preparing your order
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-charcoal-500" />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-charcoal-600">Delivery</p>
                  <p className="text-sm text-charcoal-500">
                    Estimated 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-soft p-6 mb-6"
          >
            <h2 className="font-display text-lg text-charcoal-900 mb-4">
              Order Details
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img
                    src={item.image || '/images/placeholder-product.jpg'}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80';
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-charcoal-900">{item.name}</p>
                    <p className="text-sm text-charcoal-500">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium text-charcoal-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-cream-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Subtotal</span>
                <span className="text-charcoal-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Shipping</span>
                <span className={order.shippingCost === 0 ? 'text-sage-600' : 'text-charcoal-900'}>
                  {order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-cream-200">
                <span className="text-charcoal-900">Total</span>
                <span className="text-charcoal-900">{formatPrice(order.total)}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-soft p-6 mb-6"
          >
            <h2 className="font-display text-lg text-charcoal-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sage-500" />
              Shipping Address
            </h2>
            <div className="text-charcoal-600">
              <p className="font-medium text-charcoal-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 {order.shippingAddress.phone}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            {/* WhatsApp Confirmation */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                fullWidth
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                Confirm on WhatsApp
              </Button>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/account/orders">
                <Button variant="secondary" fullWidth>
                  View Orders
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="gold" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center text-sm text-charcoal-500"
          >
            <p>
              Questions about your order? Contact us at{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-gold-600 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              {' '}or{' '}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-gold-600 hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
