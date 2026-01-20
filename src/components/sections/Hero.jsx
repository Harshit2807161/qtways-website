import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';

export const Hero = ({ className, ...props }) => {
  return (
    <section
      className={`relative min-h-[600px] md:min-h-[700px] flex items-center bg-cream-50 overflow-hidden ${className}`}
      {...props}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blush-100 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-gold-500 text-white text-sm font-medium rounded-full mb-6"
            >
              New Collection Available
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal-900 leading-tight mb-6"
            >
              Discover Your
              <span className="block text-gold-600">Natural Glow</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-charcoal-600 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Premium skincare crafted with natural ingredients.
              Transform your routine with products that truly care for your skin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                as={Link}
                to="/shop"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Shop Now
              </Button>
              <Button
                as={Link}
                to="/about"
                variant="secondary"
                size="lg"
              >
                Our Story
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-cream-200"
            >
              <div className="text-center">
                <p className="font-display text-3xl text-charcoal-900">10K+</p>
                <p className="text-sm text-charcoal-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl text-charcoal-900">50+</p>
                <p className="text-sm text-charcoal-600">Products</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl text-charcoal-900">4.9</p>
                <p className="text-sm text-charcoal-600">Avg Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:hidden mt-8"
          >
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-elegant mx-auto max-w-md">
              <img
                src="/images/hero-product.jpg"
                alt="QTWAYS Premium Skincare Collection"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </div>
          </motion.div>

          {/* Desktop Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
              <img
                src="/images/hero-product.jpg"
                alt="QTWAYS Premium Skincare Collection"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-6 top-1/4 bg-white rounded-lg shadow-elegant p-4"
            >
              <p className="text-sm font-medium text-charcoal-900">100% Natural</p>
              <p className="text-xs text-charcoal-600">Ingredients</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute -right-6 bottom-1/4 bg-white rounded-lg shadow-elegant p-4"
            >
              <p className="text-sm font-medium text-charcoal-900">Cruelty Free</p>
              <p className="text-xs text-charcoal-600">Never tested on animals</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
