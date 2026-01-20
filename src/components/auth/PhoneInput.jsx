import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';

/**
 * Phone number input with Indian country code
 */
export function PhoneInput({
  value = '',
  onChange,
  onSubmit,
  disabled = false,
  error = null,
  autoFocus = false,
  className,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Format phone number for display (add spaces)
  const formatForDisplay = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  };

  // Handle input change
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange?.(rawValue);
  };

  // Handle key press for submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.length === 10) {
      e.preventDefault();
      onSubmit?.();
    }
  };

  const isValid = value.length === 10;

  return (
    <div className={cn('relative', className)}>
      <label className="block text-sm font-medium text-charcoal-700 mb-2">
        Phone Number
      </label>

      <div
        className={cn(
          'flex items-center border rounded-lg overflow-hidden transition-all',
          focused ? 'border-gold-500 ring-2 ring-gold-500/20' : 'border-charcoal-200',
          error ? 'border-coral-500 ring-2 ring-coral-500/20' : '',
          disabled ? 'bg-cream-100 opacity-60' : 'bg-white'
        )}
      >
        {/* Country Code */}
        <div className="flex items-center gap-1 px-3 py-3 bg-cream-50 border-r border-charcoal-200">
          <span className="text-lg">🇮🇳</span>
          <span className="text-charcoal-700 font-medium">+91</span>
        </div>

        {/* Phone Input */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formatForDisplay(value)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder="98765 43210"
          className={cn(
            'flex-1 px-3 py-3 text-lg text-charcoal-900 placeholder-charcoal-400',
            'focus:outline-none bg-transparent',
            'disabled:cursor-not-allowed'
          )}
          aria-label="Phone number"
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
          {...props}
        />

        {/* Validation indicator */}
        {value.length > 0 && (
          <div className="pr-3">
            {isValid ? (
              <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-sm text-charcoal-400">{value.length}/10</span>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p id="phone-error" className="mt-2 text-sm text-coral-500" role="alert">
          {error}
        </p>
      )}

      {/* Helper text */}
      {!error && (
        <p className="mt-2 text-sm text-charcoal-500">
          We'll send you a verification code via SMS
        </p>
      )}
    </div>
  );
}

export default PhoneInput;
