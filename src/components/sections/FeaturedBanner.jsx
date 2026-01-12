import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '../../utils';

/**
 * Featured promotional banner section
 * Used for highlighting special offers, new collections, or brand messaging
 */
export const FeaturedBanner = ({
  title = 'Discover Our New Collection',
  subtitle = 'Premium skincare crafted with nature\'s finest ingredients',
  ctaText = 'Shop Now',
  ctaLink = '/shop',
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  overlayColor = 'charcoal',
  alignment = 'center',
  size = 'default',
  className,
  ...props
}) => {
  const overlayColors = {
    charcoal: 'from-charcoal-900/80 to-charcoal-900/40',
    gold: 'from-gold-700/80 to-gold-600/40',
    sage: 'from-sage-700/80 to-sage-600/40',
    cream: 'from-cream-200/90 to-cream-100/70',
  };

  const textColors = {
    charcoal: 'text-white',
    gold: 'text-white',
    sage: 'text-white',
    cream: 'text-charcoal-900',
  };

  const sizes = {
    small: 'py-16 md:py-20',
    default: 'py-20 md:py-28',
    large: 'py-28 md:py-40',
  };

  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const isLightOverlay = overlayColor === 'cream';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Background Image */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={cn(
            'absolute inset-0 bg-gradient-to-r',
            overlayColors[overlayColor]
          )} />
        </div>
      ) : (
        <div className={cn(
          'absolute inset-0',
          isLightOverlay ? 'bg-cream-100' : 'bg-charcoal-900'
        )}>
          {/* Decorative elements for non-image banners */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 bg-gold-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-40 w-60 h-60 bg-blush-200 rounded-full blur-3xl" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            'flex flex-col max-w-2xl mx-auto',
            alignment === 'left' && 'mx-0',
            alignment === 'right' && 'mx-0 ml-auto',
            alignments[alignment]
          )}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={cn(
              'font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-4',
              textColors[overlayColor]
            )}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={cn(
                'text-lg md:text-xl mb-8',
                isLightOverlay ? 'text-charcoal-600' : 'text-white/90'
              )}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              as={Link}
              to={ctaLink}
              variant={isLightOverlay ? 'primary' : 'gold'}
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {ctaText}
            </Button>

            {secondaryCtaText && secondaryCtaLink && (
              <Button
                as={Link}
                to={secondaryCtaLink}
                variant={isLightOverlay ? 'secondary' : 'ghost'}
                size="lg"
                className={!isLightOverlay && 'text-white border-white/30 hover:bg-white/10'}
              >
                {secondaryCtaText}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Sale Banner - Preconfigured for promotional sales
 */
export const SaleBanner = ({ discount = '20', className, ...props }) => (
  <FeaturedBanner
    title={`${discount}% Off Everything`}
    subtitle="Limited time offer on all premium skincare products. Don't miss out!"
    ctaText="Shop Sale"
    ctaLink="/shop?filter=sale"
    overlayColor="charcoal"
    className={className}
    {...props}
  />
);

/**
 * New Arrivals Banner
 */
export const NewArrivalsBanner = ({ className, ...props }) => (
  <FeaturedBanner
    title="New Arrivals"
    subtitle="Be the first to discover our latest skincare innovations"
    ctaText="Explore New Products"
    ctaLink="/shop?filter=new"
    secondaryCtaText="Learn More"
    secondaryCtaLink="/about"
    overlayColor="cream"
    className={className}
    {...props}
  />
);

export default FeaturedBanner;
