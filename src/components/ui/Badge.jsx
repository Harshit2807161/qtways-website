import { cn } from '../../utils';

const variants = {
  sale: 'bg-coral-500 text-white',
  new: 'bg-gold-500 text-white',
  bestseller: 'bg-charcoal-900 text-white',
  soldout: 'bg-charcoal-400 text-white',
  default: 'bg-cream-200 text-charcoal-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full uppercase tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Convenience components for common badges
export const SaleBadge = ({ discount, className, ...props }) => (
  <Badge variant="sale" className={className} {...props}>
    {discount ? `${discount}% OFF` : 'SALE'}
  </Badge>
);

export const NewBadge = ({ className, ...props }) => (
  <Badge variant="new" className={className} {...props}>
    NEW
  </Badge>
);

export const BestsellerBadge = ({ className, ...props }) => (
  <Badge variant="bestseller" className={className} {...props}>
    BESTSELLER
  </Badge>
);

export const SoldOutBadge = ({ className, ...props }) => (
  <Badge variant="soldout" className={className} {...props}>
    SOLD OUT
  </Badge>
);

export default Badge;
