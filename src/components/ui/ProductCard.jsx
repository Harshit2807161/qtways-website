import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatPrice, calculateDiscount } from '../../utils';
import { Badge, SaleBadge, NewBadge, BestsellerBadge } from './Badge';
import { Rating } from './Rating';

export const ProductCard = ({
  product,
  className,
  showRating = true,
  showQuickAdd = true,
  onQuickAdd,
  onWishlist,
  ...props
}) => {
  const {
    id,
    name,
    slug,
    price,
    originalPrice,
    images,
    rating,
    reviewCount,
    badge,
    inStock,
    categoryName,
  } = product;

  const discount = originalPrice ? calculateDiscount(originalPrice, price) : 0;
  const hasDiscount = discount > 0;
  const productUrl = `/product/${slug}`;
  const imageUrl = images?.[0] || '/images/placeholder-product.jpg';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlist) {
      onWishlist(product);
    }
  };

  return (
    <motion.article
      className={cn(
        'group relative bg-white rounded-lg overflow-hidden',
        'shadow-soft hover:shadow-elegant',
        'transition-all duration-300 ease-elegant',
        'hover:-translate-y-1',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {/* Image Container */}
      <Link to={productUrl} className="block relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            {badge === 'sale' && <SaleBadge discount={discount} />}
            {badge === 'new' && <NewBadge />}
            {badge === 'bestseller' && <BestsellerBadge />}
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-charcoal-900/50 flex items-center justify-center">
            <Badge variant="soldout" size="lg">Sold Out</Badge>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between gap-2">
            {showQuickAdd && inStock && (
              <button
                onClick={handleQuickAdd}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white text-charcoal-900 text-sm font-medium rounded-md hover:bg-cream-50 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Quick Add
              </button>
            )}
            <button
              onClick={handleWishlist}
              className="p-2 bg-white rounded-md hover:bg-cream-50 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4 text-charcoal-700" />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {categoryName && (
          <p className="text-xs text-charcoal-500 uppercase tracking-wide mb-1">
            {categoryName}
          </p>
        )}

        {/* Title */}
        <Link to={productUrl}>
          <h3 className="font-display text-lg text-charcoal-900 leading-tight hover:text-gold-600 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {showRating && rating > 0 && (
          <div className="mt-2">
            <Rating value={rating} showValue showCount count={reviewCount} size="sm" />
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-medium text-charcoal-900">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-charcoal-400 line-through">
                {formatPrice(originalPrice)}
              </span>
              <span className="text-sm font-medium text-coral-500">
                {discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// Compact variant for grids
export const ProductCardCompact = ({ product, className, ...props }) => {
  const { name, slug, price, originalPrice, images } = product;
  const imageUrl = images?.[0] || '/images/placeholder-product.jpg';
  const productUrl = `/product/${slug}`;

  return (
    <Link
      to={productUrl}
      className={cn(
        'group block bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300',
        className
      )}
      {...props}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-charcoal-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-charcoal-700 mt-1">
          {formatPrice(price)}
          {originalPrice && (
            <span className="text-charcoal-400 line-through ml-2">
              {formatPrice(originalPrice)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
