import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils';

export const CategoryCard = ({
  category,
  className,
  variant = 'default',
  ...props
}) => {
  const { name, slug, shortDescription, image, productCount } = category;
  const categoryUrl = `/category/${slug}`;
  const imageUrl = image || '/images/placeholder-category.jpg';

  if (variant === 'overlay') {
    return (
      <Link
        to={categoryUrl}
        className={cn(
          'group relative block aspect-[3/4] rounded-lg overflow-hidden',
          className
        )}
        {...props}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl text-white mb-1">{name}</h3>
          {shortDescription && (
            <p className="text-cream-100 text-sm opacity-90">{shortDescription}</p>
          )}
          <span className="inline-flex items-center gap-1 text-gold-400 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
            Shop Now <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <motion.article
      className={cn(
        'group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-elegant',
        'transition-all duration-300 hover:-translate-y-1',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      <Link to={categoryUrl} className="block">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl text-charcoal-900 group-hover:text-gold-600 transition-colors">
            {name}
          </h3>
          {shortDescription && (
            <p className="text-charcoal-600 text-sm mt-1 line-clamp-2">
              {shortDescription}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-charcoal-500">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </span>
            <span className="inline-flex items-center gap-1 text-gold-600 text-sm font-medium group-hover:gap-2 transition-all">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

// Minimal category pill for filters
export const CategoryPill = ({
  category,
  isActive = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-charcoal-900 text-white'
          : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200',
        className
      )}
      {...props}
    >
      {category.name}
    </button>
  );
};

export default CategoryCard;
