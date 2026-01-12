import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui';

export const Newsletter = ({
  title = 'Join Our Newsletter',
  subtitle = 'Subscribe to receive exclusive offers, skincare tips, and early access to new products.',
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing! Check your inbox for a welcome surprise.');
      setEmail('');
    }, 1000);
  };

  return (
    <section
      className={`py-16 md:py-24 bg-charcoal-900 text-white ${className}`}
      id="newsletter"
      {...props}
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>

          {/* Content */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-cream-200 mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-4 py-3 bg-charcoal-800 border border-charcoal-700 rounded-md text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              variant="gold"
              disabled={status === 'loading' || status === 'success'}
              rightIcon={
                status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
            >
              {status === 'loading'
                ? 'Subscribing...'
                : status === 'success'
                ? 'Subscribed!'
                : 'Subscribe'}
            </Button>
          </motion.form>

          {/* Message */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-sm ${
                status === 'error' ? 'text-coral-400' : 'text-sage-400'
              }`}
            >
              {message}
            </motion.p>
          )}

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-cream-300"
          >
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold-400" />
              10% off first order
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold-400" />
              Exclusive deals
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold-400" />
              Skincare tips
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
