import { Star } from 'lucide-react';
import { cn } from '../../utils';

const sizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  showValue = false,
  showCount = false,
  count = 0,
  className,
  ...props
}) => {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(value);
    const partial = !filled && i < value;
    const percentage = partial ? (value - i) * 100 : 0;

    return { filled, partial, percentage };
  });

  return (
    <div className={cn('inline-flex items-center gap-1', className)} {...props}>
      <div className="flex items-center gap-0.5">
        {stars.map((star, index) => (
          <span key={index} className="relative">
            {/* Empty star (background) */}
            <Star
              className={cn(
                sizes[size],
                'text-charcoal-200 fill-charcoal-200'
              )}
            />
            {/* Filled star (overlay) */}
            {(star.filled || star.partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: star.filled ? '100%' : `${star.percentage}%` }}
              >
                <Star
                  className={cn(
                    sizes[size],
                    'text-gold-500 fill-gold-500'
                  )}
                />
              </span>
            )}
          </span>
        ))}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-charcoal-700 ml-1">
          {value.toFixed(1)}
        </span>
      )}

      {showCount && count > 0 && (
        <span className="text-sm text-charcoal-500 ml-1">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

// Interactive rating for reviews
export const RatingInput = ({
  value = 0,
  onChange,
  max = 5,
  size = 'lg',
  className,
  ...props
}) => {
  const handleClick = (rating) => {
    if (onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={cn('inline-flex items-center gap-1', className)} {...props}>
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => handleClick(rating)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
        >
          <Star
            className={cn(
              sizes[size],
              'transition-colors duration-200',
              rating <= value
                ? 'text-gold-500 fill-gold-500'
                : 'text-charcoal-200 fill-charcoal-200 hover:text-gold-400 hover:fill-gold-400'
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;
