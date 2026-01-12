import { motion } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';
import { cn } from '../../utils';
import { Rating } from './Rating';

export const TestimonialCard = ({
  testimonial,
  className,
  variant = 'default',
  ...props
}) => {
  const {
    name,
    location,
    avatar,
    rating,
    title,
    content,
    productName,
    verified,
    date,
  } = testimonial;

  const avatarUrl = avatar || '/images/placeholder-avatar.jpg';
  const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : null;

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'bg-white rounded-lg p-4 shadow-soft',
          className
        )}
        {...props}
      >
        <Rating value={rating} size="sm" />
        <p className="text-charcoal-700 text-sm mt-2 line-clamp-3">{content}</p>
        <div className="flex items-center gap-2 mt-3">
          <img
            src={avatarUrl}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-charcoal-900">{name}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.article
      className={cn(
        'bg-white rounded-lg p-6 shadow-soft',
        'transition-shadow duration-300 hover:shadow-elegant',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-gold-400 mb-4" />

      {/* Rating */}
      <Rating value={rating} size="md" />

      {/* Title */}
      {title && (
        <h3 className="font-display text-lg text-charcoal-900 mt-3">
          {title}
        </h3>
      )}

      {/* Content */}
      <p className="text-charcoal-600 mt-2 leading-relaxed">
        {content}
      </p>

      {/* Product */}
      {productName && (
        <p className="text-sm text-charcoal-500 mt-3 italic">
          Purchased: {productName}
        </p>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-cream-200">
        <img
          src={avatarUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-charcoal-900">{name}</span>
            {verified && (
              <span className="inline-flex items-center gap-1 text-sage-600 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-500">
            {location && <span>{location}</span>}
            {location && formattedDate && <span>•</span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Featured testimonial with larger layout
export const TestimonialFeatured = ({
  testimonial,
  className,
  ...props
}) => {
  const { name, location, avatar, rating, content, productName } = testimonial;
  const avatarUrl = avatar || '/images/placeholder-avatar.jpg';

  return (
    <div
      className={cn(
        'bg-cream-50 rounded-2xl p-8 md:p-12',
        className
      )}
      {...props}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Quote className="w-12 h-12 text-gold-400 mx-auto mb-6" />
        <Rating value={rating} size="lg" className="justify-center" />
        <blockquote className="font-display text-xl md:text-2xl text-charcoal-800 mt-6 leading-relaxed">
          "{content}"
        </blockquote>
        {productName && (
          <p className="text-charcoal-500 mt-4 italic">
            About: {productName}
          </p>
        )}
        <div className="flex items-center justify-center gap-3 mt-8">
          <img
            src={avatarUrl}
            alt={name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-medium text-charcoal-900">{name}</p>
            {location && (
              <p className="text-sm text-charcoal-500">{location}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
