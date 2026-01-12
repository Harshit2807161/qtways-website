import { forwardRef } from 'react';
import { cn } from '../../utils';

const variants = {
  primary: 'bg-charcoal-900 text-white hover:bg-charcoal-800 active:bg-charcoal-950 focus-visible:ring-charcoal-500',
  secondary: 'bg-transparent text-charcoal-900 border border-charcoal-900 hover:bg-charcoal-900 hover:text-white focus-visible:ring-charcoal-500',
  gold: 'bg-gold-500 text-white hover:bg-gold-600 active:bg-gold-700 focus-visible:ring-gold-400',
  sage: 'bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700 focus-visible:ring-sage-400',
  ghost: 'bg-transparent text-charcoal-700 hover:bg-cream-100 hover:text-charcoal-900 focus-visible:ring-charcoal-300',
  link: 'bg-transparent text-charcoal-700 underline underline-offset-4 hover:text-charcoal-900 hover:no-underline p-0',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  icon: 'p-2',
};

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  as: Component = 'button',
  ...props
}, ref) => {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-md',
    'transition-all duration-300 ease-elegant',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <Component
      ref={ref}
      className={baseStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
